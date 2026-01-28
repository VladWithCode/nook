import { NextResponse } from 'next/server';
import { testWhatsAppMessage } from '../whatsapp-service';

export async function POST() {
    try {
        // Test the WhatsApp functionality
        const result = await testWhatsAppMessage();

        return NextResponse.json(
            {
                success: true,
                message: 'Test message sent successfully',
                data: result,
            },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido al probar WhatsApp',
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        {
            message: 'WhatsApp test endpoint - use POST to send a test message',
            usage: 'POST /api/contacto/test',
        },
        { status: 200 }
    );
}
