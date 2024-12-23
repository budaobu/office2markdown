import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQ() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>What file types are supported?</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Microsoft Office: Word (.docx), Excel (.xlsx), PowerPoint (.pptx)</li>
              <li>PDF documents (.pdf)</li>
              <li>Images (with EXIF metadata and OCR support)</li>
              <li>Audio files (with EXIF metadata and speech transcription)</li>
              <li>HTML (with special handling for Wikipedia and other sites)</li>
              <li>Various text formats (CSV, JSON, XML, etc.)</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How long does the conversion take?</AccordionTrigger>
          <AccordionContent>
            The first conversion requires downloading and initializing the conversion engine in your browser.
            Subsequent conversions will be much faster.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Why is the first conversion slow?</AccordionTrigger>
          <AccordionContent>
            The first conversion requires downloading and initializing the conversion engine in your browser. Subsequent conversions will be much faster.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Is there a file size limit?</AccordionTrigger>
          <AccordionContent>
            For optimal performance and browser stability, we recommend files under 100MB. Larger files may still work but could affect browser performance.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

