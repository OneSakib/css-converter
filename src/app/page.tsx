import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code2, Palette, FileJson, Braces, Ruler, ArrowLeftRight, Type, Zap, Star } from "lucide-react"

const tools = [
  {
    title: "CSS Formatter",
    description: "Format and beautify your CSS code with proper indentation and structure",
    icon: Palette,
    href: "/css-formatter",
    category: "Formatter",
  },
  {
    title: "JSON Formatter",
    description: "Format, validate and beautify JSON data with syntax highlighting",
    icon: FileJson,
    href: "/json-formatter",
    category: "Formatter",
  },
  {
    title: "JavaScript Formatter",
    description: "Format and prettify JavaScript code with consistent styling",
    icon: Code2,
    href: "/js-formatter",
    category: "Formatter",
  },
  {
    title: "PX to VW Converter",
    description: "Convert pixel values to viewport width units for responsive design",
    icon: ArrowLeftRight,
    href: "/px-to-vw",
    category: "Converter",
  },
  {
    title: "VW to PX Converter",
    description: "Convert viewport width units back to pixel values",
    icon: ArrowLeftRight,
    href: "/vw-to-px",
    category: "Converter",
  },
  {
    title: "PX to REM Converter",
    description: "Convert pixels to rem units for scalable typography",
    icon: Type,
    href: "/px-to-rem",
    category: "Converter",
  },
  {
    title: "REM to PX Converter",
    description: "Convert rem units back to pixel values",
    icon: Type,
    href: "/rem-to-px",
    category: "Converter",
  },
  {
    title: "PX to EM Converter",
    description: "Convert pixels to em units for relative sizing",
    icon: Ruler,
    href: "/px-to-em",
    category: "Converter",
  },
  {
    title: "EM to PX Converter",
    description: "Convert em units back to pixel values",
    icon: Ruler,
    href: "/em-to-px",
    category: "Converter",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">


      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Badge variant="secondary" className="mb-4">
              <Star className="h-3 w-3 mr-1" />
              Free Developer Tools
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            Essential CSS & Web Development Tools
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A comprehensive collection of formatting, conversion, and utility tools to streamline your web development
            workflow. All tools are free and work directly in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="#tools">Explore Tools</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Available Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our collection of carefully crafted tools designed to make your development process faster and
              more efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon
              return (
                <Link key={index} href={tool.href} className="group">
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 border-0 bg-white/60 backdrop-blur-sm dark:bg-slate-800/60">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {tool.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {tool.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">{tool.description}</CardDescription>
                      <div className="mt-4 flex items-center text-sm text-blue-600 group-hover:text-blue-700 font-medium">
                        Try it now
                        <ArrowLeftRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/40 dark:bg-slate-800/40">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Tools?</h2>
            <p className="text-muted-foreground">Built with developers in mind</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                All tools work instantly in your browser without any server processing
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Braces className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Developer Friendly</h3>
              <p className="text-muted-foreground">
                Clean interfaces designed specifically for developers and designers
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Always Free</h3>
              <p className="text-muted-foreground">No registration required, no limits, completely free to use</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}







