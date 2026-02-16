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
        <Label className="text-white/80">{label}</Label>
        <textarea
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-white/5 border border-white/10 text-white resize-none min-h-[100px] w-full rounded-md px-3 py-2"
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label className="text-white/80">{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-white/5 border-white/10 text-white"
      />
    </div>
  );
}
