import {
    WhatsAppMessageRequest,
    WhatsAppResponse,
    WhatsAppContactRequest,
    TemplateVariable,
} from './types';

// Helper function to format date to long date string
export function dateToLongDate(date: Date): string {
    return date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

// Logging function using Next.js built-in logging
export function logContactRequest({
    customerPhone,
    customerName,
    date,
}: {
    customerPhone: string;
    customerName: string;
    date: Date;
}) {
    const logMessage = `[Solicitud de contacto] ${date.toLocaleDateString(
        'es-MX'
    )}
Cliente: ${customerName}
Telefono: ${customerPhone}
--------------------------`;

    console.log('WhatsApp Contact Request:', logMessage);
}

// WhatsApp Cloud API configuration
const getWhatsAppConfig = () => {
    const accessToken = process.env.WHATSAPP_CLOUD_API_ACCESS_TOKEN;
    const baseURL = process.env.WHATSAPP_CLOUD_API_BASE_URL;
    const phoneID = process.env.WHATSAPP_CLOUD_API_PHONE_ID;

    if (!accessToken || !baseURL || !phoneID) {
        throw new Error('Missing WhatsApp Cloud API configuration');
    }

    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        baseURL,
        phoneID,
    };
};

// Core WhatsApp API function
export async function postCloudAPIMessage({
    toPhoneNumber,
    type,
    message,
    templateData,
}: WhatsAppMessageRequest): Promise<WhatsAppResponse> {
    const { headers, baseURL, phoneID } = getWhatsAppConfig();

    const requestBody: any = {
        messaging_product: 'whatsapp',
        to: toPhoneNumber,
        type,
    };

    if (type === 'template') {
        if (!templateData) {
            throw new Error('Template data is required for template messages');
        }

        const templateComponents: any[] = [];

        if (templateData.bodyVariables) {
            templateComponents.push({
                type: 'body',
                parameters: templateData.bodyVariables,
            });
        }

        if (templateData.headerVariables) {
            templateComponents.push({
                type: 'header',
                parameters: templateData.headerVariables,
            });
        }

        requestBody.template = {
            name: templateData.name,
            components: templateComponents,
            language: {
                code: templateData.language?.code || 'es',
            },
        };
    } else {
        requestBody.message = message;
    }

    const response = await fetch(`${baseURL}/${phoneID}/messages`, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error(`WhatsApp API Error: ${JSON.stringify(errorData)}`);
        throw new Error(`WhatsApp API Error: ${JSON.stringify(errorData)}`);
    }

    return response.json();
}

// Main contact request function
export async function sendWhatsAppContactRequest({
    name,
    phone,
}: WhatsAppContactRequest) {
    const vDate: TemplateVariable = {
        type: 'text',
        text: dateToLongDate(new Date()),
    };
    const vName: TemplateVariable = {
        type: 'text',
        text: name,
    };
    const vPhone: TemplateVariable = {
        type: 'text',
        text: phone,
    };

    const templateData = {
        name: 'contact_request_nook',
        bodyVariables: [vName, vDate, vPhone],
    };

    const notificationsPhone = process.env.WHATSAPP_NOTIFICATIONS_PHONE;
    if (!notificationsPhone) {
        throw new Error('Missing WHATSAPP_NOTIFICATIONS_PHONE environment variable');
    }

    // Send notification to business
    let notificationResponse: WhatsAppResponse;
    try {
        notificationResponse = await postCloudAPIMessage({
            toPhoneNumber: notificationsPhone,
            type: 'template',
            templateData,
        });
    } catch (error) {
        console.error('[SEND_NOTIFICATION_ERROR]: ', error);
        throw new Error('Error al enviar la solicitud de contacto');
    }

    // Log request
    logContactRequest({
        customerPhone: phone,
        customerName: name,
        date: new Date(),
    });

    return {
        notificationResponse: notificationResponse,
    };
}

// Test function for development
export async function testWhatsAppMessage() {
    const pNumber = process.env.WHATSAPP_NOTIFICATIONS_PHONE;
    if (!pNumber) {
        throw new Error('WhatsApp Notifications Phone is not defined');
    }

    try {
        const response = await postCloudAPIMessage({
            type: 'template',
            toPhoneNumber: pNumber,
            templateData: {
                name: 'hello_world',
                language: {
                    code: 'en_US',
                },
            },
        });
        return response.messages;
    } catch (error) {
        throw {
            message: 'Ocurrio un error al enviar el mensaje',
            error: error,
        };
    }
}
