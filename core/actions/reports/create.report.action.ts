import { projectApi } from '@/core/api/project.api';

interface CreateReportParams {
    reason: string;
    description: string;
}

export const createReportAction = async ({ reason, description }: CreateReportParams) => {
    try {
        // Cómo al momento de desarrolo de consumo de la API no estaba implementada la logica para obtener usuarios reales ni el ID de la persona logueada
        // se implemento un usuario hardcodeado para el reporte
        // TODO: IDs hardcodeados temporalmente
        // Reportero: Usuario actual (simulado)
        // Reportado: Usuario al que se reporta (simulado)

        const payload = {
            ReportedUserId: 'd1418225-083a-44f0-98b6-98deef58d6b0',
            Reason: reason,
            Description: description,
        };

        const { data } = await projectApi.post('/feedback/report', payload);
        return data;
    } catch (error) {
        console.error('Error creating report:', error);
        throw error;
    }
};
