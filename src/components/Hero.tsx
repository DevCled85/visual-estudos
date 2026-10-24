import React from 'react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section id="inicio" className="flex flex-col items-center text-center pt-10 sm:pt-16 pb-12 px-4 max-w-4xl mx-auto">
      <div className="text-[#8FE4DA] text-xs sm:text-sm tracking-[0.16em] font-extrabold uppercase mb-6 sm:mb-8">
        VISUAL ESTUDOS • UMA NOVA EXPERIÊNCIA EM APRENDER
      </div>

      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-[-0.055em] leading-[1.06] text-white text-balance max-w-4xl mx-auto">
        O CONTEÚDO É SÉRIO.
        <br />
        <span className="text-[#C5B0F3] font-normal italic block sm:inline">
          O JEITO DE APRENDER NÃO PRECISA SER.
        </span>
      </h1>

      <div className="w-24 h-1 bg-[#8FE4DA] rounded-full my-6 sm:my-8" aria-hidden="true" />

      <p className="text-[#D0D7F0] text-lg sm:text-xl md:text-[21px] max-w-2xl mx-auto leading-relaxed font-normal">
        Mapas mentais, flashcards, desafios e experiências interativas para quem quer aprender de um jeito nada óbvio.
      </p>

      <div className="mt-8 sm:mt-10 flex flex-col items-center">
        <button
          onClick={onExploreClick}
          className="bg-[#C5B0F3] hover:bg-[#b8a0ec] text-[#0A1025] font-black text-sm sm:text-base px-7 py-4 rounded-2xl shadow-[0_12px_35px_rgba(197,176,243,0.3)] hover:shadow-[0_16px_40px_rgba(197,176,243,0.45)] hover:-translate-y-1 transition-all duration-200 cursor-pointer"
        >
          EXPLORE UM NOVO JEITO DE APRENDER ↗
        </button>

        <p className="text-[#C6B4F6] text-xs sm:text-sm mt-4 font-medium flex items-center gap-1.5">
          <span>✦</span> Comece com 15 flashcards gratuitos
        </p>
      </div>
    </section>
  );
};
