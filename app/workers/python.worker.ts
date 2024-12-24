/// <reference lib="webworker" />

declare const loadPyodide: (config: {
  indexURL: string;
  [key: string]: any;
}) => Promise<any>;

declare const globalThis: {
  pyodide: any;
} & typeof self;

console.log('Worker script started');

importScripts('https://testingcf.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js');

console.log('Pyodide script imported');

async function loadPyodideAndPackages() {
  try {
    console.log('Starting to load Pyodide');
    const pyodide = await loadPyodide({
      indexURL: "https://testingcf.jsdelivr.net/pyodide/v0.26.4/full/",
    });
    globalThis.pyodide = pyodide;
    console.log('Pyodide loaded successfully');

    console.log('Loading micropip...');
    await pyodide.loadPackage('micropip');
    console.log('Micropip loaded successfully');

    console.log('Installing markitdown...');
    const micropip = pyodide.pyimport('micropip');
    await micropip.install('markitdown==0.0.1a2');
    console.log('Markitdown installed successfully');

    return pyodide;
  } catch (err) {
    console.error('Error in loadPyodideAndPackages:', err);
    throw err;
  }
}

let pyodideReadyPromise = loadPyodideAndPackages();

const TIMEOUT_DURATION = 180000; // 3 minutes
let lastProgressUpdate = 0;
const PROGRESS_UPDATE_INTERVAL = 5000; // 5 seconds

const updateProgress = (message: string) => {
  const now = Date.now();
  if (now - lastProgressUpdate > PROGRESS_UPDATE_INTERVAL) {
    self.postMessage({ type: 'progress', message });
    lastProgressUpdate = now;
  }
};

globalThis.onmessage = async (event) => {
  console.log('Worker received message:', event.data);
  try {
    await pyodideReadyPromise;
    console.log('Pyodide is ready');
  } catch (err) {
    console.error('Failed to initialize Pyodide:', err);
    globalThis.postMessage({ 
      error: `Failed to initialize Pyodide: ${err instanceof Error ? err.message : String(err)}` 
    });
    return;
  }

  const file = event.data;
  try {
    console.log('Processing file:', file.filename);
    const startTime = Date.now();
    
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Conversion timed out')), TIMEOUT_DURATION);
    });

    const conversionPromise = (async () => {
      globalThis.pyodide.FS.writeFile(`/${file.filename}`, new Uint8Array(file.buffer));
      console.log('File written to Pyodide filesystem');

      updateProgress('Starting conversion...');

      const result = await globalThis.pyodide.runPythonAsync(`
        import sys
        import traceback
        try:
          from markitdown import MarkItDown
          
          def progress_callback(progress):
              js.self.postMessage({"type": "progress", "message": f"Converting... {progress:.0%}"})
          
          markitdown = MarkItDown()
          result = markitdown.convert("/${file.filename}", progress_callback=progress_callback)
          print("Conversion completed")
          
          with open("/${file.filename}.md", "w") as file:
            file.write(result.text_content)
          
          print("Markdown file written")
          print(f"Markdown content length: {len(result.text_content)}")
          result.text_content
        except Exception as e:
          print(f"Error during conversion: {str(e)}", file=sys.stderr)
          print(traceback.format_exc(), file=sys.stderr)
          raise e
      `);
      console.log('Python code executed successfully');

      updateProgress('Reading converted file...');

      const content = globalThis.pyodide.FS.readFile(`/${file.filename}.md`, { encoding: 'utf8' });
      console.log('Markdown file read, length:', content.length);
      return content;
    })();

    const content = await Promise.race([conversionPromise, timeoutPromise]);

    self.postMessage({
      filename: `${file.filename}.md`,
      content: content,
      time: Date.now() - startTime,
    });
  } catch (error) {
    console.error('Error in worker:', error);
    self.postMessage({ 
      error: error instanceof Error ? error.message : 'Unknown error during conversion',
      filename: file.filename 
    });
  }
};

export {};