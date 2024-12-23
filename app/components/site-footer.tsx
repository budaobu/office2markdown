export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          © 2024. Web is Awesome, Web is Best.
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Twitter</a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900">GitHub</a>
        </div>
      </div>
    </footer>
  )
}

