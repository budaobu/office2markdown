import { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileIcon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePyodide } from './pyodide-handler'

interface FileUploaderProps {
  onFileUpload: (markdown: string) => void
}

export function FileUploader({ onFileUpload }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { isLoading, error: pyodideError, convertToMarkdown } = usePyodide()
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState<string | null>(null);

  const processFile = useCallback(async (file: File) => {
    setIsConverting(true);
    setError(null);
    setProgress(null);
    try {
      if (!file) {
        throw new Error('No file selected');
      }
      console.log('Processing file:', file.name);
      const arrayBuffer = await file.arrayBuffer();
      console.log('File loaded as ArrayBuffer, size:', arrayBuffer.byteLength);
      const markdown = await convertToMarkdown(arrayBuffer, file.name, (progressMessage: string) => {
        setProgress(progressMessage);
        console.log('Progress:', progressMessage);
      });
      console.log('Conversion completed, markdown length:', markdown.length);
      onFileUpload(markdown);
    } catch (err) {
      console.error('Error processing file:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred while processing the file');
    } finally {
      setIsConverting(false);
      setProgress(null);
    }
  }, [convertToMarkdown, onFileUpload]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      processFile(acceptedFiles[0])
    }
  }, [processFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/pdf': ['.pdf'],
      'text/html': ['.html'],
      'text/plain': ['.txt', '.csv', '.json', '.xml'],
    }
  })

  const handlePickFile = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading Pyodide...</span>
      </div>
    )
  }

  if (pyodideError) {
    return <div className="text-red-500">Failed to initialize converter: {pyodideError}</div>
  }

  return (
    <div className="mb-8">
      <div
        {...getRootProps()}
        className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <FileIcon className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Click to Pick<br />
          Paste Office File or Drag and Drop
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Word (.docx), Excel (.xlsx), PowerPoint (.pptx), PDF (.pdf), HTML (.html),<br />
          Various text formats (CSV, JSON, XML, TXT)
        </p>
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          Error: {error}
        </div>
      )}
      {isConverting && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-600">
          {progress || 'Converting...'}
        </div>
      )}
      <div className="mt-4 text-center">
        <Button onClick={handlePickFile} disabled={isConverting}>
          {isConverting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Converting...
            </>
          ) : (
            'Pick file'
          )}
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".docx,.xlsx,.pptx,.pdf,.html,.csv,.json,.xml,.txt"
        />
      </div>
    </div>
  )
}

