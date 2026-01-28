export interface WhatsAppMessageRequest {
    toPhoneNumber: string;
    type: 'template' | 'text';
    message?: string;
    templateData?: {
        name: string;
        bodyVariables?: Record<string, any>[];
        headerVariables?: Record<string, any>[];
        language?: {
            code: string;
        };
    };
}

export interface WhatsAppContactRequest {
    name: string;
    phone: string;
}

export interface WhatsAppResponse {
    messaging_product: 'whatsapp';
    contacts?: Array<{
        input: string;
        wa_id: string;
    }>;
    messages?: Array<{
        id: string;
    }>;
}

export interface TemplateVariable {
    type: 'text';
    text: string;
}

export interface ContactFormResponse {
    success: boolean;
    data?: {
        notificationResponse?: WhatsAppResponse;
        sendDataResponse?: WhatsAppResponse;
    };
    error?: string;
}
