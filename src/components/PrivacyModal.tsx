import React from 'react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0D1735] border border-[#3B4D78] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-[#FAF9FF] shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-4 border-b border-[#3B4D78]">
          <h2 className="text-xl sm:text-2xl font-bold text-[#C5B0F3]">
            Política de Privacidade — Visual Estudos
          </h2>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="text-slate-400 hover:text-white text-2xl p-1 rounded-lg transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-[#D0D7F0]">
          <p>
            Esta é uma política inicial para o formulário de flashcards gratuitos e deve ser revisada antes da publicação definitiva, com os dados de identificação e contato do responsável.
          </p>

          <h3 className="text-lg font-bold text-[#C5B0F3] pt-2">Dados coletados e finalidades</h3>
          <p>
            Coletamos nome, e-mail e telefone/WhatsApp para registrar a solicitação e liberar o acesso aos 15 flashcards. O consentimento opcional permite o envio de conteúdos, novidades e ofertas por e-mail ou mensagens.
          </p>

          <h3 className="text-lg font-bold text-[#C5B0F3] pt-2">Armazenamento e fornecedores</h3>
          <p>
            Os dados enviados pelo formulário são processados e armazenados por serviços da Netlify, conforme a configuração da hospedagem. Poderemos utilizar outros fornecedores de envio de e-mail após informá-los nesta política.
          </p>

          <h3 className="text-lg font-bold text-[#C5B0F3] pt-2">Direitos do titular</h3>
          <p>
            Você pode solicitar informações, correção ou exclusão de dados, bem como retirar o consentimento para mensagens promocionais. O canal de atendimento será informado aqui antes da publicação definitiva.
          </p>

          <h3 className="text-lg font-bold text-[#C5B0F3] pt-2">Segurança e acesso</h3>
          <p>
            O acesso inicial aos flashcards é liberado no navegador após o cadastro, sem autenticação individual. Não se trata de uma área protegida por senha.
          </p>

          <p className="text-xs text-[#A9C7F8] pt-4 border-t border-[#3B4D78]/60">
            Última atualização: outubro de 2026.
          </p>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-[#C5B0F3] hover:bg-[#b8a0ec] text-[#0A1025] font-black text-sm px-5 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
