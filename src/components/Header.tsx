import { Github, Zap } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import ThemeModeToggle from "@/components/ThemeModeToggle"
export default function Header() {
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Tools", href: "/#tools" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ]

    return (
        <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                            <Zap className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                DevTools Hub
                            </h1>
                            <p className="text-xs text-muted-foreground">CSS & Web Development Tools</p>
                        </div>
                    </div>
                    <nav className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Button key={link.name} variant="ghost" size="sm" asChild>
                                <Link href={link.href}>{link.name}</Link>
                            </Button>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="https://github.com/onesakib" className="flex items-center space-x-2">
                                <Github className="h-4 w-4" />
                                <span className="hidden sm:inline">GitHub</span>
                            </Link>
                        </Button>
                        <ThemeModeToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}