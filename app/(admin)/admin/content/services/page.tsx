"use client";

import { useState, useEffect } from "react";
import { ServicesContent, ServicePlan } from "@/types/content";
import { getServicesContent } from "@/app/_lib/content";
import { TextEditor } from "@/components/admin/TextEditor";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { Button } from "@/components/ui/button";
import { Save, Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { saveServicesAction } from "./_actions";

export default function ServicesContentPage() {
    const [content, setContent] = useState<ServicesContent | null>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [expandedPlans, setExpandedPlans] = useState<Record<string, boolean>>({});

    useEffect(() => {
        getServicesContent().then(data => {
            setContent(data)
            const initialExpanded: Record<string, boolean> = {};
            data.plans.forEach(plan => {
                initialExpanded[plan.id] = true;
            });
            setExpandedPlans(initialExpanded);
        });
    }, []);

    const handleSave = async () => {
        if (!content) return;
        setSaving(true);
        await saveServicesAction(content);
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const addPlan = () => {
        if (!content) return;
        const newId = `plan-${Date.now()}`;
        const newPlan: ServicePlan = {
            id: newId,
            title: "Nuevo Plan",
            price: "$0 MXN/mes",
            features: ["Nueva característica"],
            image: "",
            ctaText: "Contratar ahora",
            theme: "default"
        };
        setContent({
            ...content,
            plans: [...content.plans, newPlan]
        });
        setExpandedPlans(prev => ({ ...prev, [newId]: true }));
    };

    const removePlan = (id: string) => {
        if (!content) return;
        setContent({
            ...content,
            plans: content.plans.filter(p => p.id !== id)
        });
        const newExpanded = { ...expandedPlans };
        delete newExpanded[id];
        setExpandedPlans(newExpanded);
    };

    const updatePlan = (id: string, updates: Partial<ServicePlan>) => {
        if (!content) return;
        setContent({
            ...content,
            plans: content.plans.map(p => p.id === id ? { ...p, ...updates } : p)
        });
    };

    const movePlan = (index: number, direction: 'up' | 'down') => {
        if (!content) return;
        const newPlans = [...content.plans];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= newPlans.length) return;
        [newPlans[index], newPlans[newIndex]] = [newPlans[newIndex], newPlans[index]];
        setContent({ ...content, plans: newPlans });
    };

    const togglePlanExpand = (id: string) => {
        setExpandedPlans(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const updateFeature = (planId: string, featureIndex: number, value: string) => {
        if (!content) return;
        const plan = content.plans.find(p => p.id === planId);
        if (!plan) return;
        const newFeatures = [...plan.features];
        newFeatures[featureIndex] = value;
        updatePlan(planId, { features: newFeatures });
    };

    const addFeature = (planId: string) => {
        if (!content) return;
        const plan = content.plans.find(p => p.id === planId);
        if (!plan) return;
        updatePlan(planId, { features: [...plan.features, "Nueva característica"] });
    };

    const removeFeature = (planId: string, featureIndex: number) => {
        if (!content) return;
        const plan = content.plans.find(p => p.id === planId);
        if (!plan) return;
        const newFeatures = plan.features.filter((_, i) => i !== featureIndex);
        updatePlan(planId, { features: newFeatures });
    };

    if (!content) {
        return <div className="p-6 text-white/60">Cargando...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Servicios</h1>
                    <p className="text-white/70 mt-2">
                        Administra los servicios que ofrece Nook en la página pública
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
                <h2 className="text-xl font-semibold text-white">Hero Section</h2>

                <MediaUploader
                    label="Video de fondo"
                    value={content.heroVideo}
                    onChange={(value) => setContent({ ...content, heroVideo: value })}
                    accept="video/*"
                />

                <TextEditor
                    label="Texto del marquee"
                    value={content.marqueeText}
                    onChange={(value) => setContent({ ...content, marqueeText: value })}
                />
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-6">
                <h2 className="text-xl font-semibold text-white">Textos de Introducción</h2>

                <TextEditor
                    label="Texto introductorio 1"
                    value={content.introText1}
                    onChange={(value) => setContent({ ...content, introText1: value })}
                    multiline
                />

                <TextEditor
                    label="Texto introductorio 2"
                    value={content.introText2}
                    onChange={(value) => setContent({ ...content, introText2: value })}
                    multiline
                />
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Planes</h2>
                    <Button onClick={addPlan} className="border-white/20 text-white hover:bg-white/10">
                        <Plus className="mr-2 h-4 w-4" />
                        Añadir Plan
                    </Button>
                </div>

                {content.plans.map((plan, index) => (
                    <div key={plan.id} className="rounded-lg border border-white/10 bg-black/20">
                        <div
                            className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5"
                            onClick={() => togglePlanExpand(plan.id)}
                        >
                            <div className="flex items-center gap-3">
                                <GripVertical className="h-5 w-5 text-white/40 cursor-grab" />
                                <div className="flex flex-col">
                                    <span className="text-white font-medium">{plan.title}</span>
                                    <span className="text-white/60 text-sm">{plan.price}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); movePlan(index, 'up'); }}
                                    disabled={index === 0}
                                    className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                                >
                                    <ChevronUp className="h-4 w-4 text-white/60" />
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); movePlan(index, 'down'); }}
                                    disabled={index === content.plans.length - 1}
                                    className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                                >
                                    <ChevronDown className="h-4 w-4 text-white/60" />
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); removePlan(plan.id); }}
                                    className="p-1 hover:bg-red-500/20 rounded"
                                >
                                    <Trash2 className="h-4 w-4 text-red-400" />
                                </button>
                                {expandedPlans[plan.id] ? (
                                    <ChevronUp className="h-4 w-4 text-white/60" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-white/60" />
                                )}
                            </div>
                        </div>

                        {expandedPlans[plan.id] && (
                            <div className="p-4 pt-0 space-y-4 border-t border-white/10">
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <TextEditor
                                        label="Título del plan"
                                        value={plan.title}
                                        onChange={(value) => updatePlan(plan.id, { title: value })}
                                    />
                                    <TextEditor
                                        label="Precio"
                                        value={plan.price}
                                        onChange={(value) => updatePlan(plan.id, { price: value })}
                                    />
                                </div>

                                <MediaUploader
                                    label="Imagen del plan"
                                    value={plan.image}
                                    onChange={(value) => updatePlan(plan.id, { image: value })}
                                    accept="image/*"
                                />

                                <div className="space-y-2">
                                    <label className="text-white/80">Características</label>
                                    {plan.features.map((feature, fIndex) => (
                                        <div key={fIndex} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => updateFeature(plan.id, fIndex, e.target.value)}
                                                className="flex-1 bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeFeature(plan.id, fIndex)}
                                                className="p-2 hover:bg-red-500/20 rounded"
                                            >
                                                <Trash2 className="h-4 w-4 text-red-400" />
                                            </button>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        onClick={() => addFeature(plan.id)}
                                        className="border-white/20 text-white hover:bg-white/10 text-sm"
                                    >
                                        <Plus className="mr-1 h-3 w-3" />
                                        Añadir característica
                                    </Button>
                                </div>

                                <TextEditor
                                    label="Texto del botón CTA"
                                    value={plan.ctaText}
                                    onChange={(value) => updatePlan(plan.id, { ctaText: value })}
                                />

                                <div className="space-y-2">
                                    <label className="text-white/80">Tema visual</label>
                                    <div className="flex gap-2">
                                        {(['default', 'dark', 'special'] as const).map((theme) => (
                                            <button
                                                key={theme}
                                                type="button"
                                                onClick={() => updatePlan(plan.id, { theme })}
                                                className={`px-4 py-2 rounded-md text-sm capitalize ${plan.theme === theme
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                                                    }`}
                                            >
                                                {theme === 'default' ? 'Claro' : theme === 'dark' ? 'Oscuro' : 'Especial'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
