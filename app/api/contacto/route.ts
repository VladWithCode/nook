import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendWhatsAppContactRequest } from './whatsapp-service';
import { ContactFormResponse } from './types';

// Validation schema using Zod (matching your form)
const contactSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido').max(32, 'Por seguridad, el nombre debe tener menos de 32 caracteres'),
    phone: z.string().min(1, 'El teléfono es requerido'),
    agree: z.boolean().refine(val => val === true, 'Debes aceptar los términos y condiciones'),
});

export async function POST(request: NextRequest) {
    try {
        // Parse and validate the request body
        const body = await request.json();
        const validationResult = contactSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Datos inválidos',
                    details: validationResult.error.issues,
                },
                { status: 400 }
            );
        }

        const { name, phone } = validationResult.data;

        // Send WhatsApp messages
        const result = await sendWhatsAppContactRequest({
            name,
            phone,
        });

        const response: ContactFormResponse = {
            success: true,
            data: result,
        };

        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        console.error('Error processing contact form:', error);

        const response: ContactFormResponse = {
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido al procesar la solicitud',
        };

        return NextResponse.json(response, { status: 500 });
    }
}

// Optional: Add a GET method for testing API health
export async function GET() {
    return NextResponse.json(
        {
            message: 'WhatsApp API endpoint is ready',
            status: 'OK',
            timestamp: new Date().toISOString(),
        },
        { status: 200 }
    );
}
