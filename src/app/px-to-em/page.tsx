"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Copy, ArrowRightLeft, Info } from "lucide-react"
import Toast, { ToastHandle } from "@/components/Toast"

export default function PxEMConverter() {
    const [pxValue, setPxValue] = useState<string>("16")
    const [viewportWidth, setViewportWidth] = useState<string>("1920")
    const [vwValue, setVwValue] = useState<string>("0.83")
    const [vwInput, setVwInput] = useState<string>("5")
    const [pxFromVw, setPxFromVw] = useState<string>("96")
    const toastRef = useRef<ToastHandle>(null);
    const showToastMessage = (message: string) => {
        toastRef.current?.showToastMessage(message);
    };

    // Convert PX to VW
    useEffect(() => {
        const px = Number.parseFloat(pxValue)
        const viewport = Number.parseFloat(viewportWidth)

        if (!isNaN(px) && !isNaN(viewport) && viewport > 0) {
            const vw = (px / viewport) * 100
            setVwValue(vw.toFixed(4))
        } else {
            setVwValue("0")
        }
    }, [pxValue, viewportWidth])

    // Convert VW to PX
    useEffect(() => {
        const vw = Number.parseFloat(vwInput)
        const viewport = Number.parseFloat(viewportWidth)

        if (!isNaN(vw) && !isNaN(viewport) && viewport > 0) {
            const px = (vw * viewport) / 100
            setPxFromVw(px.toFixed(2))
        } else {
            setPxFromVw("0")
        }
    }, [vwInput, viewportWidth])

    const copyToClipboard = (value: string, unit: string) => {
        navigator.clipboard.writeText(`${value}${unit}`)
        showToastMessage(`${value}${unit} copied to clipboard`)
    }

    const setCommonViewport = (width: number) => {
        setViewportWidth(width.toString())
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4 pt-8">
                    <h1 className="text-4xl font-bold text-gray-900">PX to VW Converter</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Convert pixels to viewport width units and vice versa. Perfect for responsive web design.
                    </p>
                </div>

                {/* Main Converter Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* PX to VW Converter */}
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ArrowRightLeft className="w-5 h-5" />
                                PX to VW
                            </CardTitle>
                            <CardDescription>Convert pixel values to viewport width units</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="px-input">Pixel Value (px)</Label>
                                <Input
                                    id="px-input"
                                    type="number"
                                    value={pxValue}
                                    onChange={(e) => setPxValue(e.target.value)}
                                    placeholder="Enter pixel value"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="viewport-width">Viewport Width (px)</Label>
                                <Input
                                    id="viewport-width"
                                    type="number"
                                    value={viewportWidth}
                                    onChange={(e) => setViewportWidth(e.target.value)}
                                    placeholder="Enter viewport width"
                                />
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                <Button variant="outline" size="sm" onClick={() => setCommonViewport(320)}>
                                    Mobile (320px)
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setCommonViewport(768)}>
                                    Tablet (768px)
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setCommonViewport(1920)}>
                                    Desktop (1920px)
                                </Button>
                            </div>

                            <Separator />

                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Result:</p>
                                        <p className="text-2xl font-bold text-green-700">{vwValue}vw</p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(vwValue, "vw")}>
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* VW to PX Converter */}
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ArrowRightLeft className="w-5 h-5 rotate-180" />
                                VW to PX
                            </CardTitle>
                            <CardDescription>Convert viewport width units to pixel values</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="vw-input">Viewport Width Value (vw)</Label>
                                <Input
                                    id="vw-input"
                                    type="number"
                                    step="0.01"
                                    value={vwInput}
                                    onChange={(e) => setVwInput(e.target.value)}
                                    placeholder="Enter vw value"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="viewport-width-2">Viewport Width (px)</Label>
                                <Input
                                    id="viewport-width-2"
                                    type="number"
                                    value={viewportWidth}
                                    onChange={(e) => setViewportWidth(e.target.value)}
                                    placeholder="Enter viewport width"
                                />
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                <Button variant="outline" size="sm" onClick={() => setCommonViewport(320)}>
                                    Mobile (320px)
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setCommonViewport(768)}>
                                    Tablet (768px)
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setCommonViewport(1920)}>
                                    Desktop (1920px)
                                </Button>
                            </div>

                            <Separator />

                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Result:</p>
                                        <p className="text-2xl font-bold text-blue-700">{pxFromVw}px</p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(pxFromVw, "px")}>
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Information Card */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Info className="w-5 h-5" />
                            About VW Units
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">What is VW?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    VW (Viewport Width) is a CSS unit that represents a percentage of the viewport&apos;s width. 1vw equals 1%
                                    of the viewport width. This makes it perfect for creating responsive designs that scale with the
                                    screen size.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Conversion Formula</h3>
                                <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
                                    <p>PX to VW: (px / viewport_width) × 100</p>
                                    <p>VW to PX: (vw × viewport_width) / 100</p>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="font-semibold text-lg mb-2">Common Use Cases</h3>
                            <ul className="text-gray-600 text-sm space-y-1">
                                <li>• Responsive typography that scales with screen size</li>
                                <li>• Fluid layouts that adapt to different devices</li>
                                <li>• Consistent spacing across various screen sizes</li>
                                <li>• Creating scalable UI components</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Toast ref={toastRef} />
        </div>
    )
}
