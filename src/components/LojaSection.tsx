import React from 'react';

export const LojaSection: React.FC = () => {
  return (
    <section id="loja" aria-labelledby="store-title" className="w-full max-w-4xl mx-auto my-14 sm:my-20 px-4 scroll-mt-8">
      <div className="bg-gradient-to-br from-[#172C63] to-[#11182E] border border-[#5B6B9B] rounded-3xl p-6 sm:p-12 shadow-[0_20px_50px_rgba(2,6,20,0.5)]">
        <div className="text-xs font-black tracking-[0.14em] text-[#A5DFE8] uppercase">
          LOJA VISUAL ESTUDOS • MAPAS MENTAIS
        </div>

        <h2 id="store-title" className="text-3xl sm:text-5xl font-black tracking-[-0.055em] leading-[1.08] text-white my-4 max-w-3xl">
          SEU CÉREBRO NÃO PRECISA DE MAIS TEXTOS.{' '}
          <span className="text-[#C5B0F3]">PRECISA FAZER CONEXÕES.</span>
        </h2>

        <p className="text-[#D0D7F0] text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
          Transforme conteúdos extensos em revisões mais visuais, organizadas e práticas. Estude com mais clareza e menos enrolação.
        </p>

        <div>
          <a
            href="https://naty-adorart.hotmart.host/fisioup-mapas-mentais-d273b25a-2613-4959-8322-4c9acb67381c"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#C5B0F3] hover:bg-[#b8a0ec] text-[#090E21] font-black text-sm sm:text-base px-6 py-4 rounded-xl shadow-[0_8px_28px_rgba(197,176,243,0.3)] hover:shadow-[0_12px_32px_rgba(197,176,243,0.45)] hover:-translate-y-0.5 transition-all text-center"
          >
            QUERO VIRAR A CHAVE DOS MEUS ESTUDOS ↗
          </a>
        </div>

        <p className="text-xs text-[#A9C7F8] mt-4 font-medium">
          Conheça os mapas mentais disponíveis na página do produto.
        </p>
      </div>
    </section>
  );
};
