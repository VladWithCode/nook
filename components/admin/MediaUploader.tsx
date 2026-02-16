"use client";

import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Upload, X, Image as ImageIcon, Video } from "lucide-react";

interface MediaUploaderProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    accept?: string;
}

export function MediaUploader({ label, value, onChange, accept = "image/*,video/*" }: MediaUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);

    const isVideo = value?.endsWith('.webm') || value?.endsWith('.mp4') || value?.endsWith('.mov');
    const isImage = value?.endsWith('.webp') || value?.endsWith('.jpg') || value?.endsWith('.jpeg') || value?.endsWith('.png') || value?.endsWith('.gif');

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            onChange(url);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            onChange(url);
        }
    };

    const handleClear = () => {
        onChange("");
    };

    return (
        <div className="space-y-2">
            <Label className="text-white/80">{label}</Label>
            {value ? (
                <div className="relative rounded-lg border border-white/10 bg-white/5 p-4">
                    {isVideo ? (
                        <div className="flex items-center gap-3">
                            <Video className="h-8 w-8 text-blue-400" />
                            <span className="text-white/80 truncate flex-1">{value.split('/').pop()}</span>
                        </div>
                    ) : isImage ? (
                        <div className="flex items-center gap-3">
                            <ImageIcon className="h-8 w-8 text-green-400" />
                            <span className="text-white/80 truncate flex-1">{value.split('/').pop()}</span>
                        </div>
                    ) : (
                        <span className="text-white/80">{value}</span>
                    )}
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute top-2 right-2 p-1 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ) : (
                <div
                    className={`relative rounded-lg border-2 border-dashed p-6 text-center transition-colors ${isDragging
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-white/10 hover:border-white/20"
                        }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        accept={accept}
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="mx-auto h-8 w-8 text-white/40" />
                    <p className="mt-2 text-sm text-white/60">
                        Arrastra un archivo o haz clic para seleccionar
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                        {accept === "image/*" ? "PNG, JPG, WebP" : accept === "video/*" ? "WebM, MP4, MOV" : "Imágenes y videos"}
                    </p>
                </div>
            )}

            <div className="mt-2">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="O ingresa la URL del archivo..."
                    className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm"
                />
            </div>
        </div>
    );
}
