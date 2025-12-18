'use client';

import React, { useEffect, useRef, useState } from 'react';

interface MemeCanvasProps {
    imageUrl: string;
    topText: string;
    bottomText: string;
    className?: string;
}

export function MemeCanvas({ imageUrl, topText, bottomText, className }: MemeCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!imageUrl || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        setLoading(true);
        const img = new Image();
        img.crossOrigin = 'anonymous';
        // Use proxy to avoid CORS issues
        img.src = `/api/proxy?url=${encodeURIComponent(imageUrl)}`;

        img.onload = () => {
            // Config
            const maxWidth = 800; // High resolution
            const scale = maxWidth / img.width;
            const imgHeight = img.height * scale;

            const padding = 50;
            const fontSize = 32;
            const lineHeight = 42;

            // Font settings
            ctx.font = `bold ${fontSize}px sans-serif`; // Standard generic
            // Try to load a nicer font via CSS but context needs it loaded. Standard sans-serif is safe.

            // Helper: Wrap Text Calculation
            const wrapTextLines = (text: string, maxWidth: number) => {
                const words = text.split(' ');
                let line = '';
                const lines: string[] = [];

                if (text.trim() === '') return [];

                for (let n = 0; n < words.length; n++) {
                    const testLine = line + words[n] + ' ';
                    const metrics = ctx.measureText(testLine);
                    const testWidth = metrics.width;
                    if (testWidth > maxWidth && n > 0) {
                        lines.push(line);
                        line = words[n] + ' ';
                    }
                    else {
                        line = testLine;
                    }
                }
                lines.push(line);
                return lines;
            }

            // Calculate Heights
            const topLines = wrapTextLines(topText, maxWidth - (padding * 2));
            const bottomLines = wrapTextLines(bottomText, maxWidth - (padding * 2));

            const topBarHeight = Math.max(120, (topLines.length * lineHeight) + (padding * 2));
            const bottomBarHeight = Math.max(120, (bottomLines.length * lineHeight) + (padding * 2));

            const totalHeight = topBarHeight + imgHeight + bottomBarHeight;

            // Resize Canvas
            canvas.width = maxWidth;
            canvas.height = totalHeight;

            // --- Draw Cycle ---

            // 1. Top Bar (Yellow)
            ctx.fillStyle = '#FFE900'; // Bright Yellow
            ctx.fillRect(0, 0, maxWidth, topBarHeight);

            // 2. Image
            ctx.drawImage(img, 0, topBarHeight, maxWidth, imgHeight);

            // 3. Bottom Bar (Black)
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, topBarHeight + imgHeight, maxWidth, bottomBarHeight);

            // 4. Draw Top Text
            ctx.fillStyle = '#000000';
            ctx.font = `bold ${fontSize}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Center Y for top block
            let currentY = (topBarHeight - (topLines.length * lineHeight)) / 2 + (lineHeight / 2);

            topLines.forEach(line => {
                ctx.fillText(line.trim(), maxWidth / 2, currentY);
                currentY += lineHeight;
            });

            // 5. Draw Bottom Text
            // Split bottom text into two colors if possible? 
            // User example has "white" then "cyan" highlights. 
            // For now, let's stick to full Yellow or White.
            ctx.fillStyle = '#FFE900';

            // Center Y for bottom block
            currentY = topBarHeight + imgHeight + (bottomBarHeight - (bottomLines.length * lineHeight)) / 2 + (lineHeight / 2);

            bottomLines.forEach(line => {
                ctx.fillText(line.trim(), maxWidth / 2, currentY);
                currentY += lineHeight;
            });

            setLoading(false);
        };

        img.onerror = () => {
            setLoading(false);
            // Could draw an error placeholder
        };

    }, [imageUrl, topText, bottomText]);

    const handleDownload = () => {
        if (!canvasRef.current) return;
        const link = document.createElement('a');
        link.download = `meme-${Date.now()}.png`;
        link.href = canvasRef.current.toDataURL('image/png');
        link.click();
    };

    return (
        <div className={`flex flex-col items-center gap-6 ${className}`}>
            <div className="relative shadow-2xl rounded-sm overflow-hidden border-4 border-gray-900 bg-gray-800">
                <canvas ref={canvasRef} className="max-w-full h-auto max-h-[70vh]" />
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
                        <div className="text-yellow-400 font-bold text-xl animate-pulse">Rendering Meme...</div>
                    </div>
                )}
            </div>
            <button
                onClick={handleDownload}
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-extrabold text-lg uppercase tracking-wide rounded hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-yellow-400/50"
            >
                Download Auto-Meme
            </button>
        </div>
    );
}
