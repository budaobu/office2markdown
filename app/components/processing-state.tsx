import { Loader2 } from 'lucide-react'

export function ProcessingState() {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <Loader2 className="h-16 w-16 animate-spin text-gray-400" />
      <p className="mt-4 text-sm text-gray-600">
        Processing. The first time loading the converter is somewhat time-consuming, please be patient.
      </p>
    </div>
  )
}

