"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextEditorProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    multiline?: boolean;
    placeholder?: string;
}

export function TextEditor({ label, value, onChange, multiline = false, placeholder }: TextEditorProps) {
    if (multiline) {
        return (
            <div className="space-y-2">
                <Label className="text-current/60">{label}</Label>
                <textarea
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="bg-gray-800 border border-current/20 resize-none min-h-[100px] w-full rounded-md px-3 py-2"
                />
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <Label className="text-current/60">{label}</Label>
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="bg-gray-800 border-current/20"
            />
        </div>
    );
}
