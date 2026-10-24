import React from 'react';

interface HeaderProps {
  onNavigateToFlashcards: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateToFlashcards }) => {
  return (
    <header className="w-full max-w-5xl mx-auto pt-6 pb-4 px-4 sm:px-6 flex items-center justify-between gap-4 md:gap-8 border-b border-[#324370]/40">
      {/* Zone 1: Single text element Brand mark */}
      <a
        href="#inicio"
        className="text-2xl sm:text-3xl font-black tracking-tight text-[#FAF9FF] whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity flex items-center"
      >
        <span>visual</span>
        <span className="text-[#C5B0F3]">estudos.</span>
        <span aria-label="evolução" className="text-[#A5DFE8] text-xl sm:text-2xl ml-1 font-bold">
          ↗
        </span>
      </a>

      {/* Zone 2: Navigation links */}
      <nav aria-label="Navegação principal" className="hidden sm:flex items-center gap-3 md:gap-4 text-xs sm:text-sm font-semibold">
        <a
          href="#flashcards"
          className="text-[#FAF9FF] border border-[#52618A] hover:border-[#C5B0F3] hover:text-[#C5B0F3] px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0"
        >
          Flashcards
        </a>
        <a
          href="#fisiomisterio"
          className="text-[#FAF9FF] border border-[#52618A] hover:border-[#C5B0F3] hover:text-[#C5B0F3] px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0"
        >
          FisioMistério
        </a>
        <a
          href="#loja"
          className="text-[#FAF9FF] border border-[#52618A] hover:border-[#C5B0F3] hover:text-[#C5B0F3] px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0"
        >
          Loja Visual Estudos
        </a>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center shrink-0">
        <button
          onClick={onNavigateToFlashcards}
          className="bg-[#C5B0F3] hover:bg-[#b59de8] text-[#0A1025] font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-[0_4px_18px_rgba(197,176,243,0.25)] hover:shadow-[0_6px_22px_rgba(197,176,243,0.4)] hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer"
        >
          Acessar Flashcards ↗
        </button>
      </div>
    </header>
  );
};
