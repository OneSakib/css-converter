import { Monitor } from "lucide-react"
export default function Header() {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <Monitor className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">PX to VW Converter</h1>
                            <p className="text-sm text-gray-600">Convert pixels to viewport width units</p>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <span className="text-sm text-gray-500">Responsive Design Tool</span>
                    </div>
                </div>
            </div>
        </header>
    )
}