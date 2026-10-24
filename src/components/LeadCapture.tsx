import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { STORAGE_KEY_ACCESS } from '../data/flashcards';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface LeadCaptureProps {
  onUnlocked: () => void;
  onOpenPrivacy: () => void;
}

export const LeadCapture: React.FC<LeadCaptureProps> = ({ onUnlocked, onOpenPrivacy }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [marketing, setMarketing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (!digits) return '';
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim()) return;

    setSubmitting(true);
    setFeedback(null);

    const leadPayload = {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      telefone: telefone.trim(),
      marketing,
      createdAt: new Date().toISOString(),
    };

    // 1. Save to Cloud Firestore
    try {
      await addDoc(collection(db, 'leads'), leadPayload);
    } catch (err) {
      console.warn('Erro ao salvar no Firestore:', err);
      try {
        handleFirestoreError(err, OperationType.CREATE, 'leads');
      } catch {
        // proceed
      }
    }

    // 2. Persist access in browser
    try {
      localStorage.setItem(STORAGE_KEY_ACCESS, '1');
      localStorage.setItem('visual-estudos-lead', JSON.stringify(leadPayload));
    } catch {
      // ignore
    }

    // 3. Dispatch automated Welcome Email in background via Brevo
    fetch('/api/send-welcome-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadPayload),
    }).catch((err) => console.warn('Disparo de e-mail em segundo plano:', err));

    // 4. Dispatch automated Welcome WhatsApp in background
    if (telefone.trim()) {
      fetch('/api/send-whatsapp-welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome.trim(), telefone: telefone.trim() }),
      }).catch((err) => console.warn('Disparo de WhatsApp em segundo plano:', err));
    }

    setFeedback('Cadastro recebido! Seus flashcards foram liberados e as boas-vindas enviadas.');

    // Transition smoothly to Flashcards without requiring manual steps
    setTimeout(() => {
      setSubmitting(false);
      onUnlocked();
    }, 700);
  };

  const handleOpenExisting = () => {
    try {
      localStorage.setItem(STORAGE_KEY_ACCESS, '1');
    } catch {
      // ignore
    }
    onUnlocked();
  };

  return (
    <section
      id="cadastro"
      aria-labelledby="lead-title"
      className="max-w-xl mx-auto my-8 px-6 py-8 sm:p-10 rounded-3xl border border-[#6A6FA7]/60 bg-gradient-to-br from-[#1B2853] to-[#121A35] shadow-[0_20px_50px_rgba(2,6,20,0.5)]"
    >
      <div className="text-xs font-black tracking-[0.14em] text-[#A5DFE8] uppercase">
        PRESENTE PARA VOCÊ • 100% GRATUITO
      </div>

      <h2 id="lead-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 text-white">
        Desbloqueie seus <span className="text-[#C5B0F3]">15 flashcards interativos</span>
      </h2>

      <p className="text-[#D0D7F0] text-sm sm:text-base mt-2.5 leading-relaxed">
        Primeiro, acompanhe as novidades no Instagram. Depois, faça seu cadastro gratuito para começar a estudar.
      </p>

      <div className="my-5">
        <a
          href="https://www.instagram.com/fisionataliamendes/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-[#A5DFE8] text-[#A5DFE8] hover:bg-[#A5DFE8]/10 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors"
        >
          <span>↗</span> Seguir @fisionataliamendes
        </a>
        <p className="text-[#BBC8E6] text-xs mt-2 italic">
          Seguir o perfil é um convite, não uma condição verificada automaticamente.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="lead-name" className="block text-sm font-bold text-[#FAF9FF] mb-1.5">
            Seu nome
          </label>
          <input
            id="lead-name"
            type="text"
            required
            maxLength={100}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Como podemos chamar você?"
            className="w-full px-4 py-3 bg-[#0B132D] border border-[#6475A4] focus:border-[#C5B0F3] rounded-xl text-white placeholder-slate-400 outline-none transition-colors text-sm"
          />
        </div>

        <div>
          <label htmlFor="lead-email" className="block text-sm font-bold text-[#FAF9FF] mb-1.5">
            Seu e-mail
          </label>
          <input
            id="lead-email"
            type="email"
            required
            maxLength={254}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@exemplo.com"
            className="w-full px-4 py-3 bg-[#0B132D] border border-[#6475A4] focus:border-[#C5B0F3] rounded-xl text-white placeholder-slate-400 outline-none transition-colors text-sm"
          />
        </div>

        <div>
          <label htmlFor="lead-phone" className="block text-sm font-bold text-[#FAF9FF] mb-1.5">
            Seu telefone / WhatsApp
          </label>
          <input
            id="lead-phone"
            type="tel"
            maxLength={16}
            value={telefone}
            onChange={(e) => setTelefone(formatPhoneNumber(e.target.value))}
            placeholder="(00) 90000-0000"
            className="w-full px-4 py-3 bg-[#0B132D] border border-[#6475A4] focus:border-[#C5B0F3] rounded-xl text-white placeholder-slate-400 outline-none transition-colors text-sm"
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer pt-1 text-xs sm:text-sm text-[#D0D7F0]">
          <input
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-[#6475A4] bg-[#0B132D] text-[#C5B0F3] focus:ring-0"
          />
          <span>Quero receber conteúdos, novidades e ofertas da Visual Estudos por e-mail. (Opcional)</span>
        </label>

        <p className="text-xs text-[#BBC8E6] leading-relaxed pt-1">
          Usaremos seus dados para entregar os flashcards e administrar seu acesso. Leia nossa{' '}
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="text-[#A5DFE8] underline hover:text-[#c4f2f9] cursor-pointer"
          >
            Política de Privacidade
          </button>
          .
        </p>

        {feedback && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-[#172c63] border border-[#8FE4DA]/50 text-[#8FE4DA] text-sm font-semibold animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#C5B0F3] hover:bg-[#b8a0ec] disabled:opacity-50 text-[#0A1025] font-black text-sm py-3.5 px-6 rounded-xl shadow-[0_8px_25px_rgba(197,176,243,0.3)] hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-[#0A1025] border-t-transparent rounded-full animate-spin" />
              PROCESSANDO E LIBERANDO FLASHCARDS...
            </>
          ) : (
            'LIBERAR MEUS 15 FLASHCARDS ↗'
          )}
        </button>
      </form>

      <p className="text-xs text-[#BBC8E6] text-center mt-6">
        Se você já se cadastrou neste navegador,{' '}
        <button
          type="button"
          onClick={handleOpenExisting}
          className="text-[#A5DFE8] underline hover:text-white font-medium cursor-pointer"
        >
          abrir meus flashcards
        </button>
        .
      </p>
    </section>
  );
};
