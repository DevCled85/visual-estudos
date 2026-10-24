export function buildWhatsAppUrl(nome: string, telefone: string): string {
  const cleanDigits = telefone.replace(/\D/g, '');
  const phone = cleanDigits.length <= 11 ? `55${cleanDigits}` : cleanDigits;
  const appUrl = window.location.origin + window.location.pathname;
  const welcomeText = `Olá, ${nome}! 📚 Seja muito bem-vindo(a) à Visual Estudos!\n\nSeus 15 flashcards interativos de Fisioterapia já foram liberados:\n• Escalas MRC & Ashworth\n• Glasgow & Goniometria\n• Neuroplasticidade & Potencial de Ação\n• SUS & PNAB\n\nAcesse quando quiser: ${appUrl}#flashcards\n\nBons estudos!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(welcomeText)}`;
}

export async function sendWhatsAppWelcome(lead: { nome: string; telefone: string }): Promise<{ success: boolean; url: string }> {
  const whatsappUrl = buildWhatsAppUrl(lead.nome, lead.telefone);

  // Try background server endpoint if running with backend
  try {
    const endpoint = window.location.origin.includes('github.io')
      ? 'https://ais-pre-gelfiin2zaudiw67dzxerj-11902426249.us-west2.run.app/api/send-whatsapp-welcome'
      : '/api/send-whatsapp-welcome';

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    }).catch(() => {});
  } catch {
    // Ignore static host
  }

  return { success: true, url: whatsappUrl };
}
