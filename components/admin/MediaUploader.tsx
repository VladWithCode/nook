"use client";

import { Label } from "@/components/ui/label";
import { useState } from "react";
import { UploadThingDropzone, useUploadThing } from "@/lib/uploadthing";
import { X, Image as ImageIcon, Video, Upload } from "lucide-react";

interface MediaUploaderProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    accept?: "image" | "video" | "all" | "image/*" | "video/*";
}

export function MediaUploader({ label, value, onChange, accept = "all" }: MediaUploaderProps) {
    const [showDropzone, setShowDropzone] = useState(false);

    const endpoint = accept === "image" ? "imageUploader" : accept === "video" ? "videoUploader" : "imageUploader";

    const { startUpload, isUploading } = useUploadThing(endpoint, {
        onClientUploadComplete: (res: { url: string }[]) => {
            if (res?.[0]?.url) {
                onChange(res[0].url);
            }
        },
        onUploadError: (error: Error) => {
            console.error("Upload error:", error);
        },
    });

    const isVideo = value?.endsWith(".webm") || value?.endsWith(".mp4") || value?.endsWith(".mov");
    const isImage =
        value?.endsWith(".webp") ||
        value?.endsWith(".jpg") ||
        value?.endsWith(".jpeg") ||
        value?.endsWith(".png") ||
        value?.endsWith(".gif");

    const handleClear = () => {
        onChange("");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            startUpload(files);
        }
    };

    return (
        <div className="space-y-2">
            <Label className="text-white/80">{label}</Label>

            {value ? (
                <div className="relative rounded-lg border border-white/10 bg-white/5 p-4">
                    {isVideo ? (
                        <div className="flex items-center gap-3">
                            <Video className="h-8 w-8 text-blue-400" />
                            <span className="text-white/80 truncate flex-1">{value.split("/").pop()}</span>
                        </div>
                    ) : isImage ? (
                        <div className="flex items-center gap-3">
                            <ImageIcon className="h-8 w-8 text-green-400" />
                            <span className="text-white/80 truncate flex-1">{value.split("/").pop()}</span>
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
                <>
                    {showDropzone ? (
                        <div className="relative">
                            <UploadThingDropzone
                                endpoint={endpoint}
                                onClientUploadComplete={(res: { url: string }[]) => {
                                    if (res?.[0]?.url) {
                                        onChange(res[0].url);
                                        setShowDropzone(false);
                                    }
                                }}
                                onUploadError={(error: Error) => {
                                    console.error("Upload error:", error);
                                }}
                                className="ut-allowed-content:text-white/60"
                            />
                            <button
                                type="button"
                                onClick={() => setShowDropzone(false)}
                                className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <label className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium cursor-pointer flex items-center">
                                {isUploading ? (
                                    <span className="flex items-center">
                                        <Upload className="mr-2 h-4 w-4 animate-pulse" />
                                        Subiendo...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Subir archivo
                                    </span>
                                )}
                                <input
                                    type="file"
                                    accept={
                                        accept === "image"
                                            ? "image/png,image/jpeg,image/webp,image/gif"
                                            : accept === "video"
                                                ? "video/mp4,video/webm,video/quicktime"
                                                : "image/png,image/jpeg,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
                                    }
                                    onChange={handleFileChange}
                                    disabled={isUploading}
                                    className="hidden"
                                />
                            </label>

                            <button
                                type="button"
                                onClick={() => setShowDropzone(true)}
                                className="px-4 py-2 rounded-md border border-white/20 text-white hover:bg-white/10"
                            >
                                <Upload className="mr-2 h-4 w-4 inline" />
                                Arrastrar
                            </button>
                        </div>
                    )}
                </>
            )}

            {value && (
                <button
                    type="button"
                    onClick={() => setShowDropzone(true)}
                    className="text-sm text-blue-400 hover:text-blue-300"
                >
                    Cambiar archivo
                </button>
            )}

            <div className="mt-2">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="O ingresa la URL directamente..."
                    className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm"
                />
            </div>
        </div>
    );
}
