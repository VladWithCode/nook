'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
    name: z
        .string()
        .max(32, "Por seguridad, el nombre debe tener menos de 32 caracteres"),
    phone: z.
        string()
        .length(10, "El número de teléfono debe tener sólo 10 dígitos")
        .regex(/[0-9]{10}/, "El número de teléfono debe consistir solo de números"),
    agree: z.boolean().refine((v) => v, "Debes aceptar los términos y condiciones"),
})

export function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [requestSuccess, setRequestSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            agree: false,
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsLoading(true);

        try {
            const response = await fetch('/api/contacto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                setRequestSuccess(true);
                setShowFeedback(true);
                form.reset();
            } else {
                setErrorMsg("Hubo un error al enviar tu solicitud. Por favor, intenta nuevamente más tarde.");
            }
        } catch (error) {
            console.error('Contact form error:', error);
            setErrorMsg("Error de conexión. Por favor, verifica tu internet e intenta nuevamente.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel htmlFor="name">Nombre</FieldLabel>
                        <Input
                            {...field}
                            id="name"
                            name="name"
                            type="text"
                            aria-invalid={fieldState.invalid}
                            placeholder="Jorge López"
                            className="w-full rounded-md bg-stone-600/40 p-4 text-current font-secondary font-semibold placeholder:text-current/60"
                            required
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
                        <Input
                            {...field}
                            id="phone"
                            name="phone"
                            type="tel"
                            aria-invalid={fieldState.invalid}
                            placeholder="+526182919510"
                            className="w-full rounded-md bg-stone-600/40 p-4 text-current font-secondary font-semibold placeholder:text-current/60"
                            required
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Controller
                name="agree"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field orientation="horizontal">
                        <Checkbox
                            id="agree"
                            name="agree"
                            className="text-current/80"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            required
                        />
                        <FieldLabel htmlFor="agree">Acepto los términos y condiciones</FieldLabel>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <div className="pt-6">
                <Button className="w-full text-base capitalize bg-main" data-animate="button">
                    Enviar
                </Button>
            </div>
            <div className={cn(
                "absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 h-full w-full bg-neutral-900/60 rounded-md transition-[opacity,transform,scale] duration-600",
                isLoading ? "opacity-100 scale-100" : "opacity-0 scale-40"
            )}>
                <LoaderCircle className="size-16 stroke-current/80 animate-spin" />
                <p className="text-lg text-current/80">Enviando...</p>
            </div>
            <ContactFormFeedback
                isOpen={showFeedback}
                setIsOpen={setShowFeedback}
                success={requestSuccess}
                errorMsg={errorMsg}
            />
        </form>
    );
}

function ContactFormFeedback({ isOpen, setIsOpen, success, errorMsg }: {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    success: boolean;
    errorMsg: string | null;
}) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="bg-black/75 border-current/30 backdrop-blur-sm">
                <DialogHeader>
                    <DialogTitle className="">{success
                        ? "Se ha enviado tu solicitud"
                        : errorMsg || "Ocurrió un error"
                    }</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-center font-secondary font-medium">{success
                    ? "¡Gracias por contactarnos! Pronto te contactaremos."
                    : errorMsg || "Hubo un error al enviar tu solicitud. Por favor, intenta nuevamente."
                }</DialogDescription>
                <DialogFooter>
                    <Button
                        className="bg-main font-bold text-base"
                        onClick={() => setIsOpen(false)}
                    >
                        Continuar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
