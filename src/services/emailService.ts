export const BACKEND_API_URL = 'https://ais-pre-gelfiin2zaudiw67dzxerj-11902426249.us-west2.run.app';

export async function sendWelcomeEmail(lead: {
  nome: string;
  email: string;
  telefone?: string;
}): Promise<{ success: boolean; provider: string; messageId?: string; error?: string }> {
  try {
    const endpoint =
      window.location.origin.includes('github.io')
        ? `${BACKEND_API_URL}/api/send-welcome-email`
        : '/api/send-welcome-email';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lead),
    });

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        provider: data.provider || 'brevo',
        messageId: data.messageId,
      };
    } else {
      const errText = await response.text();
      console.warn('Erro na resposta do servidor de e-mail:', errText);
      return { success: false, provider: 'brevo', error: errText };
    }
  } catch (err: any) {
    console.error('Falha de rede ao disparar e-mail:', err);
    return { success: false, provider: 'network', error: err.message };
  }
}
