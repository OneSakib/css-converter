"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Monitor, Smartphone, Tablet } from "lucide-react"
import { toast } from "@/lib/toast"


export default function PXToVW() {
    const [pxValue, setPxValue] = useState<string>("")
    const [screenSize, setScreenSize] = useState<string>("")
    const [vwResult, setVwResult] = useState<string>("")


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



    const copyToClipboard = async () => {
        if (vwResult) {
            try {
                await navigator.clipboard.writeText(`${vwResult}vw`)
                toast({ title: "Copied", description: "VW value copied to clipboard!", variant: "success" })
            } catch (err) {
                console.log("Failed to copy: ", err)
                toast({ title: "Copied", description: "Failed to copy!", variant: "error" })
            }
        }
    }

    const setPresetScreenSize = (size: number) => {
        setScreenSize(size.toString())
        toast({ title: "Copied", description: `Screen size set to ${size}px`, variant: "success" })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
                                            className="text-lg p-4 border-2 border-gray-200 focus:border-blue-500 rounded-lg h-15 font-medium"
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
                                                    className="absolute top-2 right-2 p-2 cursor-pointer"
                                                    size="lg"
                                                    variant="ghost"
                                                >
                                                    <Copy className="w-7 h-7" />
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
        </div>
    )
}
