'use client'

import { useState } from 'react'
import { FileUploader } from './components/file-uploader'
import { MarkdownOutput } from './components/markdown-output'
import { ProcessingState } from './components/processing-state'
import { HowToUse } from './components/how-to-use'
import { FAQ } from './components/faq'
import { SiteHeader } from './components/site-header'
import { SiteFooter } from './components/site-footer'

export default function Home() {
  const [state, setState] = useState<'home' | 'processing' | 'output'>('home')
  const [markdown, setMarkdown] = useState<string | null>(null)

  const handleFileUpload = (convertedMarkdown: string) => {
    setMarkdown(convertedMarkdown)
    setState('output')
  }

  const handleReset = () => {
    setState('home')
    setMarkdown(null)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Turn Office File to Markdown</h1>
          {state === 'home' && <FileUploader onFileUpload={handleFileUpload} />}
          {state === 'processing' && <ProcessingState />}
          {state === 'output' && markdown && (
            <MarkdownOutput markdown={markdown} onReset={handleReset} />
          )}
          <HowToUse />
          <FAQ />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

