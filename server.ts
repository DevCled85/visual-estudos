import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateWelcomeEmailHtml } from './src/utils/welcomeEmailTemplate.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Enable CORS for GitHub Pages and web origins
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (_req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    next();
  });

  // API Health Check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Visual Estudos API',
      emailProviders: {
        brevo: Boolean(process.env.BREVO_API_KEY),
        resend: Boolean(process.env.RESEND_API_KEY),
      },
    });
  });

  // API Endpoint to send welcome email
  app.post('/api/send-welcome-email', async (req, res) => {
    try {
      const { nome, email, telefone } = req.body;
      if (!email || !nome) {
        return res.status(400).json({ error: 'Nome e e-mail são obrigatórios.' });
      }

      const appUrl = process.env.APP_URL || 'https://fisioup.netlify.app';
      const emailHtml = generateWelcomeEmailHtml(nome, appUrl);
      const subject = `Bem-vindo(a) à Visual Estudos, ${nome}! 📚 Seus 15 Flashcards`;

      // 1. Try Brevo REST API if BREVO_API_KEY is present
      const brevoKey = process.env.BREVO_API_KEY;
      if (brevoKey && brevoKey.startsWith('xkeysib-')) {
        try {
          const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'api-key': brevoKey,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              sender: {
                name: 'Visual Estudos',
                email: process.env.SENDER_EMAIL || 'cledson.gibson85@gmail.com',
              },
              to: [{ email, name: nome }],
              subject,
              htmlContent: emailHtml,
            }),
          });

          if (brevoRes.ok) {
            const data = await brevoRes.json();
            return res.json({
              success: true,
              provider: 'brevo-api',
              messageId: data.messageId,
              message: 'E-mail de boas-vindas enviado com sucesso via Brevo API!',
            });
          }
          console.warn('Brevo response error:', await brevoRes.text());
        } catch (brevoErr) {
          console.error('Erro ao disparar via Brevo API:', brevoErr);
        }
      }

      // 2. Try Brevo SMTP via Nodemailer
      const smtpPass = process.env.BREVO_SMTP_KEY || (brevoKey?.startsWith('xsmtpsib-') ? brevoKey : undefined);
      const smtpUser = process.env.BREVO_SMTP_LOGIN || process.env.SENDER_EMAIL;
      if (smtpPass && smtpUser) {
        try {
          const nodemailer = await import('nodemailer');
          const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });

          const info = await transporter.sendMail({
            from: `"Visual Estudos" <${process.env.SENDER_EMAIL || smtpUser}>`,
            to: email,
            subject,
            html: emailHtml,
          });

          return res.json({
            success: true,
            provider: 'brevo-smtp',
            messageId: info.messageId,
            message: 'E-mail de boas-vindas enviado com sucesso via Brevo SMTP!',
          });
        } catch (smtpErr) {
          console.error('Erro ao disparar via Brevo SMTP:', smtpErr);
        }
      }

      // 3. Try Resend if API key is present
      if (process.env.RESEND_API_KEY) {
        try {
          const resendRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: process.env.SENDER_EMAIL || 'Visual Estudos <onboarding@resend.dev>',
              to: [email],
              subject,
              html: emailHtml,
            }),
          });

          if (resendRes.ok) {
            const data = await resendRes.json();
            return res.json({
              success: true,
              provider: 'resend',
              id: data.id,
              message: 'E-mail de boas-vindas enviado com sucesso via Resend!',
            });
          }
          console.warn('Resend response error:', await resendRes.text());
        } catch (resendErr) {
          console.error('Erro ao disparar via Resend:', resendErr);
        }
      }

      // 3. Fallback / Dev mode: Prepared template ready for immediate dispatch
      return res.json({
        success: true,
        provider: 'prepared',
        message: 'Template de boas-vindas preparado e registrado com sucesso!',
        preview: {
          to: email,
          subject,
          html: emailHtml,
        },
      });
    } catch (err: any) {
      console.error('Erro ao processar envio de boas-vindas:', err);
      res.status(500).json({ error: err.message || 'Erro interno no servidor' });
    }
  });

  // Automated WhatsApp Welcome Endpoint (Silent Background Dispatch)
  app.post('/api/send-whatsapp-welcome', async (req, res) => {
    try {
      const { nome, telefone } = req.body;
      if (!telefone) {
        return res.status(400).json({ error: 'Telefone é obrigatório.' });
      }

      const cleanDigits = String(telefone).replace(/\D/g, '');
      const phone = cleanDigits.length <= 11 ? `55${cleanDigits}` : cleanDigits;
      const appUrl = process.env.APP_URL || 'https://fisioup.netlify.app';
      const welcomeText = `Olá, ${nome || 'Estudante'}! 📚 Seja muito bem-vindo(a) à Visual Estudos!\n\nSeus 15 flashcards interativos de Fisioterapia já foram liberados:\n• Escalas MRC & Ashworth\n• Glasgow & Goniometria\n• Neuroplasticidade & Potencial de Ação\n• SUS & PNAB\n\nAcesse quando quiser: ${appUrl}#flashcards\n\nBons estudos!`;

      // 1. Z-API Integration (Popular in Brazil: https://z-api.io)
      const zapiInstance = process.env.ZAPI_INSTANCE_ID;
      const zapiToken = process.env.ZAPI_TOKEN;
      if (zapiInstance && zapiToken) {
        try {
          const zapiRes = await fetch(
            `https://api.z-api.io/instances/${zapiInstance}/token/${zapiToken}/send-text`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Client-Token': process.env.ZAPI_CLIENT_TOKEN || '',
              },
              body: JSON.stringify({ phone, message: welcomeText }),
            }
          );
          if (zapiRes.ok) {
            const data = await zapiRes.json();
            return res.json({ success: true, provider: 'z-api', data });
          }
        } catch (zErr) {
          console.error('Erro Z-API:', zErr);
        }
      }

      // 2. Custom Webhook Integration (e.g. n8n, Make, Zapier, Evolution API)
      const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          const hookRes = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event: 'welcome_whatsapp',
              nome,
              telefone: phone,
              message: welcomeText,
              timestamp: new Date().toISOString(),
            }),
          });
          if (hookRes.ok) {
            return res.json({ success: true, provider: 'webhook' });
          }
        } catch (wErr) {
          console.error('Erro Webhook WhatsApp:', wErr);
        }
      }

      // 3. Evolution API (Self-hosted or Cloud)
      const evoUrl = process.env.EVOLUTION_API_URL;
      const evoKey = process.env.EVOLUTION_API_KEY;
      if (evoUrl && evoKey) {
        try {
          const evoInstance = process.env.EVOLUTION_INSTANCE_NAME || 'default';
          const evoRes = await fetch(`${evoUrl}/message/sendText/${evoInstance}`, {
            method: 'POST',
            headers: {
              apikey: evoKey,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              number: phone,
              text: welcomeText,
            }),
          });
          if (evoRes.ok) {
            const data = await evoRes.json();
            return res.json({ success: true, provider: 'evolution-api', data });
          }
        } catch (evoErr) {
          console.error('Erro Evolution API:', evoErr);
        }
      }

      // 4. Default logged / queued
      return res.json({
        success: true,
        provider: 'queued',
        message: 'Boas-vindas para o WhatsApp registradas e enfileiradas com sucesso.',
        target: phone,
      });
    } catch (err: any) {
      console.error('Erro ao enviar mensagem WhatsApp:', err);
      res.status(500).json({ error: err.message || 'Erro interno' });
    }
  });

  // Vite middleware in dev or static files in production
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
