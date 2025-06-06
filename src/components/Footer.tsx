import { Monitor } from "lucide-react"
export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                <Monitor className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold">PX to VW Converter</h3>
                        </div>
                        <p className="text-gray-400 text-sm">
                            A simple and efficient tool for converting pixel values to viewport width units for responsive web
                            design.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Features</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>• Real-time conversion</li>
                            <li>• Preset screen sizes</li>
                            <li>• Copy to clipboard</li>
                            <li>• Mobile responsive</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">About VW Units</h4>
                        <p className="text-sm text-gray-400">
                            Viewport Width (vw) is a CSS unit where 1vw equals 1% of the viewport width. It&apos;s perfect for creating
                            responsive designs that scale with screen size.
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-sm text-gray-400">© 2024 PX to VW Converter. Built for responsive web design.</p>
                </div>
            </div>
        </footer>

    )
}