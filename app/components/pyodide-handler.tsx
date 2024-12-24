import { useState, useEffect, useCallback } from 'react';

interface ConversionResult {
  content: string;
  time: number;
  filename: string;
}

export function usePyodide() {
  const [worker, setWorker] = useState<Worker | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const worker = new Worker(new URL('../workers/python.worker.ts', import.meta.url));
        
        worker.onerror = (err) => {
          console.error('Worker error:', err);
          setError(`Worker error: ${err.message}`);
        };

        setWorker(worker);
        setIsLoading(false);

        return () => {
          worker.terminate();
        };
      } catch (err) {
        console.error('Failed to initialize worker:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize worker');
        setIsLoading(false);
      }
    }
  }, []);

  const convertToMarkdown = useCallback(async (fileContent: ArrayBuffer, fileName: string, onProgress: (message: string) => void): Promise<string> => {
    if (!worker) {
      throw new Error("Worker is not initialized");
    }

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Conversion timed out after 3 minutes'));
      }, 180000);

      worker.onmessage = (event) => {
        const data = event.data;
        if (data.type === 'progress') {
          onProgress(data.message);
        } else {
          clearTimeout(timeoutId);
          if ('error' in data) {
            console.error('Conversion error:', data.error);
            reject(new Error(data.error));
          } else {
            console.log('Conversion successful, content length:', data.content.length);
            resolve(data.content);
          }
        }
      };

      worker.onerror = (err) => {
        clearTimeout(timeoutId);
        console.error('Worker error during conversion:', err);
        reject(new Error(`Worker error: ${err.message}`));
      };

      try {
        console.log('Sending file to worker, size:', fileContent.byteLength);
        worker.postMessage({
          filename: fileName,
          buffer: fileContent
        });
      } catch (err) {
        clearTimeout(timeoutId);
        console.error('Error posting message to worker:', err);
        reject(err instanceof Error ? err : new Error('Failed to send file to worker'));
      }
    });
  }, [worker]);

  return { isLoading, error, convertToMarkdown };
}

