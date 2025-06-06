import { Zap } from "lucide-react"
import Link from "next/link"
export default function Footer() {
    return (
        <footer className="border-t bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                                <Zap className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-lg font-bold">DevTools Hub</span>
                        </div>
                        <p className="text-muted-foreground mb-4 max-w-md">
                            Your go-to collection of essential web development tools. Format, convert, and optimize your code with
                            ease.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Tools</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/tools/css-formatter" className="hover:text-foreground">
                                    CSS Formatter
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/json-formatter" className="hover:text-foreground">
                                    JSON Formatter
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/js-formatter" className="hover:text-foreground">
                                    JS Formatter
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/px-to-rem" className="hover:text-foreground">
                                    Unit Converters
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/about" className="hover:text-foreground">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-foreground">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-foreground">
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-foreground">
                                    Terms
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} DevTools Hub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}