"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Monitor, Smartphone, Tablet } from "lucide-react"

export default function Home() {
  const [pxValue, setPxValue] = useState<string>("")
  const [screenSize, setScreenSize] = useState<string>("")
  const [vwResult, setVwResult] = useState<string>("")
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  // Get browser screen size on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenSize(window.innerWidth.toString())
    }
  }, [])

  // Calculate VW whenever px or screen size changes
  useEffect(() => {
    if (pxValue && screenSize) {
      const px = Number.parseFloat(pxValue)
      const screen = Number.parseFloat(screenSize)
      if (!isNaN(px) && !isNaN(screen) && screen > 0) {
        const vw = (px / screen) * 100
        setVwResult(vw.toFixed(4))
      } else {
        setVwResult("")
      }
    } else {
      setVwResult("")
    }
  }, [pxValue, screenSize])

  const showToastMessage = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const copyToClipboard = async () => {
    if (vwResult) {
      try {
        await navigator.clipboard.writeText(`${vwResult}vw`)
        showToastMessage("VW value copied to clipboard!")
      } catch (err) {
        console.log("Failed to copy: ", err)
        showToastMessage("Failed to copy to clipboard")
      }
    }
  }

  const setPresetScreenSize = (size: number) => {
    setScreenSize(size.toString())
    showToastMessage(`Screen size set to ${size}px`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Convert Pixels to Viewport Width</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Easily convert pixel values to viewport width (vw) units for responsive web design. Perfect for creating
              fluid layouts that scale with screen size.
            </p>
          </div>

          {/* Converter Card */}
          <Card className="mb-8 shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-semibold text-center">PX to VW Converter</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="px-input" className="text-lg font-medium text-gray-700">
                      Pixel Value (px)
                    </Label>
                    <Input
                      id="px-input"
                      type="number"
                      placeholder="Enter pixel value"
                      value={pxValue}
                      onChange={(e) => setPxValue(e.target.value)}
                      className="text-lg p-4 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="screen-input" className="text-lg font-medium text-gray-700">
                      Screen Width (px)
                    </Label>
                    <Input
                      id="screen-input"
                      type="number"
                      placeholder="Enter screen width"
                      value={screenSize}
                      onChange={(e) => setScreenSize(e.target.value)}
                      className="text-lg p-4 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                    />

                    {/* Preset Screen Sizes */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPresetScreenSize(320)}
                        className="flex items-center gap-1"
                      >
                        <Smartphone className="w-4 h-4" />
                        Mobile (320px)
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPresetScreenSize(768)}
                        className="flex items-center gap-1"
                      >
                        <Tablet className="w-4 h-4" />
                        Tablet (768px)
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPresetScreenSize(1920)}
                        className="flex items-center gap-1"
                      >
                        <Monitor className="w-4 h-4" />
                        Desktop (1920px)
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Result Section */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-lg font-medium text-gray-700">Viewport Width Result</Label>
                    <div className="relative">
                      <div className="text-4xl font-bold text-center p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg">
                        {vwResult ? (
                          <span className="text-green-600">{vwResult}vw</span>
                        ) : (
                          <span className="text-gray-400">0.0000vw</span>
                        )}
                      </div>
                      {vwResult && (
                        <Button
                          onClick={copyToClipboard}
                          className="absolute top-2 right-2 p-2"
                          size="sm"
                          variant="ghost"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Formula Display */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Formula:</h4>
                    <code className="text-blue-800 text-sm">vw = (px ÷ screen_width) × 100</code>
                    {pxValue && screenSize && (
                      <div className="mt-2 text-sm text-blue-700">
                        <code>
                          {vwResult}vw = ({pxValue} ÷ {screenSize}) × 100
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center p-6 border-0 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Responsive Design</h3>
              <p className="text-sm text-gray-600">
                VW units scale with viewport width, making your designs truly responsive
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mobile First</h3>
              <p className="text-sm text-gray-600">Perfect for mobile-first design approaches and fluid layouts</p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Copy className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Copy</h3>
              <p className="text-sm text-gray-600">Click to copy the converted VW value directly to your clipboard</p>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
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

      {/* Animated Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}
