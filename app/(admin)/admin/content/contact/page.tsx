"use client";

import { useState, useEffect } from "react";
import { ContactContent } from "@/types/content";
import { getContactContent } from "@/app/_lib/content";
import { TextEditor } from "@/components/admin/TextEditor";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { saveContactAction } from "./_actions";

export default function ContactContentPage() {
    const [content, setContent] = useState<ContactContent | null>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const data = getContactContent();
        setContent(data);
    }, []);

    const handleSave = async () => {
        if (!content) return;
        setSaving(true);
        await saveContactAction(content);
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    if (!content) {
        return <div className="p-6 text-white/60">Cargando...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Página de Contacto</h1>
                    <p className="text-white/70 mt-2">
                        Administra la configuración de la página de contacto
                    </p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700"
                >
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? "Guardando..." : saved ? "¡Guardado!" : "Guardar cambios"}
                </Button>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-6">
                <h2 className="text-xl font-semibold text-white">Información de Contacto</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextEditor
                        label="Teléfono"
                        value={content.phone}
                        onChange={(value) => setContent({ ...content, phone: value })}
                    />
                    <TextEditor
                        label="Correo electrónico"
                        value={content.email}
                        onChange={(value) => setContent({ ...content, email: value })}
                    />
                </div>

                <TextEditor
                    label="Dirección"
                    value={content.address}
                    onChange={(value) => setContent({ ...content, address: value })}
                    multiline
                />

                <TextEditor
                    label="Horario de atención"
                    value={content.hours}
                    onChange={(value) => setContent({ ...content, hours: value })}
                />
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-6">
                <h2 className="text-xl font-semibold text-white">Hero</h2>

                <MediaUploader
                    label="Imagen de fondo"
                    value={content.heroImage}
                    onChange={(value) => setContent({ ...content, heroImage: value })}
                    accept="image/*"
                />
            </div>
        </div>
    );
}
