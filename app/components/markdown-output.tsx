import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface MarkdownOutputProps {
  markdown: string
  onReset: () => void
}

export function MarkdownOutput({ markdown, onReset }: MarkdownOutputProps) {
  const [activeTab, setActiveTab] = useState('markdown')

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown)
    // You might want to add a toast notification here
  }

  const handleSave = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'converted.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mb-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="markdown">Markdown</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="markdown">
          <div className="bg-gray-100 p-4 rounded-md">
            <pre className="whitespace-pre-wrap">{markdown}</pre>
          </div>
        </TabsContent>
        <TabsContent value="preview">
          <div
            className="prose max-w-none p-4 bg-white rounded-md"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(markdown) }}
          />
        </TabsContent>
      </Tabs>
      <div className="flex justify-between mt-4">
        <div className="text-sm text-gray-600">
          Total Time: 0.581 ms, Model Time: 0.578 ms
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={onReset}>Reset</Button>
          <Button variant="outline" onClick={handleCopy}>Copy</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  )
}

// This is a placeholder function. You'll need to implement actual markdown to HTML conversion.
function markdownToHtml(markdown: string): string {
  return markdown.replace(/\n/g, '<br>')
}

