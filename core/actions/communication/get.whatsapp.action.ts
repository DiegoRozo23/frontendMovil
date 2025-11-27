import { projectApi } from '@/core/api/project.api';

export const getWhatsappAction = async (userId: string): Promise<string> => {
    try {
        const { data } = await projectApi.get(`/communication/whatsapp/${userId}`);
        return data.data;
    } catch (error) {
        console.error('Error getting WhatsApp URL:', error);
        throw error;
    }
};
