import React from 'react';
import { generateWelcomeEmailHtml } from '../utils/welcomeEmailTemplate';
import { Mail, X, ExternalLink, Send } from 'lucide-react';

interface EmailPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadName?: string;
  leadEmail?: string;
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  isOpen,
  onClose,
  leadName = 'Estudante',
  leadEmail = 'seuemail@exemplo.com',
}) => {
  if (!isOpen) return null;

  const emailHtml = generateWelcomeEmailHtml(leadName);
  const subject = `Bem-vindo(a) à Visual Estudos, ${leadName}! 📚 Seus 15 Flashcards`;
  const mailtoUrl = `mailto:${leadEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(
    `Olá, ${leadName}!\n\nSeu cadastro na Visual Estudos foi confirmado com sucesso!\nSeus 15 flashcards interativos de Fisioterapia já estão liberados.\n\nAcesse: https://fisioup.netlify.app#flashcards\n\nBons estudos!\nVisual Estudos`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0D1735] border border-[#3B4D78] rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col text-[#FAF9FF] shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-[#3B4D78]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#1B2853] text-[#C5B0F3]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Prévia do E-mail de Boas-Vindas</h3>
              <p className="text-xs text-[#A9C7F8]">
                Destinatário: <span className="text-white font-mono">{leadEmail}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Meta Info */}
        <div className="bg-[#0B132D] px-5 py-3 border-b border-[#3B4D78]/60 text-xs space-y-1">
          <p className="text-slate-300">
            <strong className="text-[#A5DFE8]">Assunto:</strong> {subject}
          </p>
          <p className="text-slate-300">
            <strong className="text-[#A5DFE8]">Remetente:</strong> Visual Estudos &lt;contato@visualestudos.com&gt;
          </p>
        </div>

        {/* Email HTML Preview Frame */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#090E21]">
          <div className="rounded-2xl border border-[#3B4D78] overflow-hidden bg-[#090E21] shadow-inner">
            <iframe
              srcDoc={emailHtml}
              title="Prévia do E-mail de Boas-Vindas"
              className="w-full h-[380px] sm:h-[450px] border-0 bg-[#090E21]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#3B4D78] flex flex-wrap justify-between items-center gap-3 text-xs">
          <a
            href={mailtoUrl}
            className="inline-flex items-center gap-1.5 bg-[#24345D] hover:bg-[#2d4174] text-[#A5DFE8] border border-[#52618A] px-3.5 py-2.5 rounded-xl font-bold transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir no app de e-mail (Mailto)</span>
          </a>

          <button
            onClick={onClose}
            className="bg-[#C5B0F3] hover:bg-[#b8a0ec] text-[#0A1025] font-black px-5 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            Fechar Prévia
          </button>
        </div>
      </div>
    </div>
  );
};
