/* /// <reference lib="webworker" />

declare const loadPyodide: (config: {
  indexURL: string;
  [key: string]: any;
}) => Promise<any>;

declare const globalThis: {
  pyodide: any;
} & typeof self;

importScripts('https://testingcf.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js');

async function loadPyodideAndPackages() {
  try {
    const pyodide = await loadPyodide({
      indexURL: "https://testingcf.jsdelivr.net/pyodide/v0.26.4/full/",
    });
    globalThis.pyodide = pyodide;

    console.log('Loading micropip...');
    await pyodide.loadPackage('micropip');

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

self.onmessage = async (event) => {
  try {
    await pyodideReadyPromise;
  } catch (err) {
    console.error('Failed to initialize Pyodide:', err);
    self.postMessage({ 
      error: `Failed to initialize Pyodide: ${err instanceof Error ? err.message : String(err)}` 
    });
    return;
  }

  const file = event.data;
  try {
    console.log('Processing file:', file.filename);
    const startTime = Date.now();
    
    globalThis.pyodide.FS.writeFile(`/${file.filename}`, new Uint8Array(file.buffer));
    console.log('File written to Pyodide filesystem');

    const result = await globalThis.pyodide.runPythonAsync(`
import sys
try:
    from markitdown import MarkItDown
    
    markitdown = MarkItDown()
    result = markitdown.convert("/${file.filename}")
    print("Conversion completed")
    
    with open("/${file.filename}.md", "w") as file:
        file.write(result.text_content)
    
    print("Markdown file written")
    print(f"Markdown content length: {len(result.text_content)}")
except Exception as e:
    print(f"Error during conversion: {str(e)}", file=sys.stderr)
    raise e
`);
    console.log('Python code executed successfully');

    const content = globalThis.pyodide.FS.readFile(`/${file.filename}.md`, { encoding: 'utf8' });
    console.log('Markdown file read, length:', content.length);
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
} */



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

self.onmessage = async (event) => {
  console.log('Message received in worker');
  try {
    await pyodideReadyPromise;
    console.log('Pyodide is ready');
  } catch (err) {
    console.error('Failed to initialize Pyodide:', err);
    self.postMessage({ 
      error: `Failed to initialize Pyodide: ${err instanceof Error ? err.message : String(err)}` 
    });
    return;
  }

  const file = event.data;
  try {
    console.log('Processing file:', file.filename);
    const startTime = Date.now();
    
    globalThis.pyodide.FS.writeFile(`/${file.filename}`, new Uint8Array(file.buffer));
    console.log('File written to Pyodide filesystem');

    const result = await globalThis.pyodide.runPythonAsync(`
import sys
try:
    from markitdown import MarkItDown
    
    markitdown = MarkItDown()
    result = markitdown.convert("/${file.filename}")
    print("Conversion completed")
    
    with open("/${file.filename}.md", "w") as file:
        file.write(result.text_content)
    
    print("Markdown file written")
    print(f"Markdown content length: {len(result.text_content)}")
except Exception as e:
    print(f"Error during conversion: {str(e)}", file=sys.stderr)
    raise e
`);
    console.log('Python code executed successfully');

    const content = globalThis.pyodide.FS.readFile(`/${file.filename}.md`, { encoding: 'utf8' });
    console.log('Markdown file read, length:', content.length);
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
}

export {};