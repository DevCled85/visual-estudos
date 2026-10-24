export function generateWelcomeEmailHtml(nome: string, appUrl: string = 'https://fisioup.netlify.app'): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bem-vindo(a) à Visual Estudos</title>
</head>
<body style="margin: 0; padding: 0; background-color: #090E21; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FAF9FF;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #090E21; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" style="max-width: 600px; background: linear-gradient(145deg, #1B2853, #121A35); border: 1px solid #596898; border-radius: 24px; padding: 36px 28px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
          
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <div style="font-size: 28px; font-weight: 900; color: #FAF9FF; letter-spacing: -0.5px;">
                visual<span style="color: #C5B0F3;">estudos.</span><span style="color: #A5DFE8; margin-left: 4px;">↗</span>
              </div>
              <div style="font-size: 11px; font-weight: 800; color: #8FE4DA; letter-spacing: 2px; text-transform: uppercase; margin-top: 8px;">
                Uma nova experiência em aprender fisioterapia
              </div>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td align="center">
              <div style="width: 80px; height: 3px; background-color: #8FE4DA; border-radius: 2px; margin-bottom: 24px;"></div>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td>
              <h1 style="font-size: 22px; font-weight: 800; color: #FFFFFF; margin: 0 0 16px 0; line-height: 1.3;">
                Olá, <span style="color: #C5B0F3;">${nome}</span>! 📚
              </h1>
              <p style="font-size: 15px; line-height: 1.6; color: #D0D7F0; margin: 0 0 20px 0;">
                Seu cadastro na <strong>Visual Estudos</strong> foi confirmado com sucesso. O conteúdo que você precisa revisar para provas, residências e prática clínica agora está ao seu alcance de forma dinâmica e interativa.
              </p>
            </td>
          </tr>

          <!-- Flashcards Unlocked Box -->
          <tr>
            <td style="padding: 20px; background-color: #0B132D; border: 1px solid #3B4D78; border-radius: 16px; margin: 16px 0;">
              <div style="font-size: 12px; font-weight: 800; color: #A5DFE8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                ✦ Seus 15 Flashcards Gratuitos Liberados
              </div>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #E0E5F4;">
                <li><strong>Escala MRC de Força</strong> & MRC Sum Score em UTI</li>
                <li><strong>Escala de Ashworth Modificada</strong> & Espasticidade</li>
                <li><strong>Glasgow</strong> & Classificação da gravidade do TCE</li>
                <li><strong>Goniometria</strong> & Valores normais de ADM</li>
                <li><strong>Neuroplasticidade</strong> & Princípios na Reabilitação</li>
                <li><strong>Potencial de Ação</strong> & Bomba Na⁺/K⁺-ATPase</li>
                <li><strong>SUS</strong> (Princípios Doutrinários) & <strong>PNAB</strong></li>
              </ul>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding: 30px 0 20px 0;">
              <a href="${appUrl}#flashcards" target="_blank" style="display: inline-block; background-color: #C5B0F3; color: #0A1025; font-size: 15px; font-weight: 900; text-decoration: none; padding: 16px 32px; border-radius: 14px; box-shadow: 0 8px 25px rgba(197, 176, 243, 0.4); text-transform: uppercase; letter-spacing: 0.5px;">
                ACESSAR MEUS FLASHCARDS AGORA ↗
              </a>
            </td>
          </tr>

          <!-- Extra note -->
          <tr>
            <td align="center" style="padding-top: 10px;">
              <p style="font-size: 13px; color: #A9C7F8; margin: 0; line-height: 1.5;">
                Dica: Você também pode importar seus próprios decks do Anki diretamente na plataforma!
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 32px; border-top: 1px solid #3B4D78; margin-top: 24px;">
              <p style="font-size: 12px; color: #8C99BA; margin: 0 0 8px 0;">
                Visual Estudos • Aprender pode ser mais visual.
              </p>
              <p style="font-size: 11px; color: #6D7B9D; margin: 0;">
                Instagram: <a href="https://www.instagram.com/fisionataliamendes/" style="color: #A5DFE8; text-decoration: none;">@fisionataliamendes</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
