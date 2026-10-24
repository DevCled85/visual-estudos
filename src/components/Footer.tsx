import React from 'react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenLeadsAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenLeadsAdmin }) => {
  return (
    <footer className="w-full max-w-5xl mx-auto py-10 px-4 text-center text-xs sm:text-sm text-[#A9C7F8] border-t border-[#324370]/40 mt-16">
      <p className="font-medium text-[#FAF9FF]/90">
        Visual Estudos • Aprender pode ser mais visual.
      </p>

      <div className="flex items-center justify-center gap-3 mt-4 text-xs flex-wrap">
        <a
          href="https://www.instagram.com/fisionataliamendes/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#A5DFE8] hover:text-white transition-colors"
        >
          Instagram
        </a>
        <span className="text-[#596898]">•</span>
        <a
          href="https://wa.me/5569993279636"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contato pelo WhatsApp"
          className="text-[#A5DFE8] hover:text-white transition-colors"
        >
          Contato
        </a>
        <span className="text-[#596898]">•</span>
        <button
          onClick={onOpenPrivacy}
          className="text-[#A5DFE8] hover:text-white transition-colors underline cursor-pointer"
        >
          Privacidade
        </button>
        {onOpenLeadsAdmin && (
          <>
            <span className="text-[#596898]">•</span>
            <button
              onClick={onOpenLeadsAdmin}
              className="text-[#C5B0F3] hover:text-white transition-colors underline cursor-pointer font-semibold"
            >
              📊 Ver Leads (Banco de Dados)
            </button>
          </>
        )}
      </div>
    </footer>
  );
};
