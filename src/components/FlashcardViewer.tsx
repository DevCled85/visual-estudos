import React, { useState, useEffect, useMemo, useRef } from 'react';
import { FlashcardTuple } from '../types';
import {
  INITIAL_FLASHCARDS,
  STORAGE_KEY_CARDS,
  parseDelimited,
  sanitizeHtml
} from '../data/flashcards';

export const FlashcardViewer: React.FC = () => {
  const [cards, setCards] = useState<FlashcardTuple[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CARDS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_FLASHCARDS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [notice, setNotice] = useState<string>(
    'Importe um arquivo de notas do Anki separado por ponto e vírgula, com colunas Frente;Verso;Categoria;Fonte. Os novos cartões ficam salvos neste navegador. Para compartilhar os cartões importados com outras pessoas, exporte uma versão atualizada da página.'
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    cards.forEach((c) => {
      if (c[2] && c[2].trim()) {
        set.add(c[2].trim());
      }
    });
    return Array.from(set).sort();
  }, [cards]);

  // Filter cards by category
  const filteredCards = useMemo(() => {
    if (!selectedCategory) return cards;
    return cards.filter((c) => c[2] === selectedCategory);
  }, [cards, selectedCategory]);

  // Ensure current index is within bounds
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedCategory]);

  const currentCard = filteredCards[currentIndex];

  const handleFlip = () => {
    if (filteredCards.length > 0) {
      setIsFlipped((prev) => !prev);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleFlip();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  // Import Anki notes file
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const delimiter = text.includes('#separator:Tab')
        ? '\t'
        : text.includes('#separator:Comma')
        ? ','
        : ';';

      const rows = parseDelimited(text, delimiter).filter((r) => !r[0]?.startsWith('#'));
      if (rows[0]?.[0]?.trim().toLowerCase() === 'frente') {
        rows.shift();
      }

      const imported: FlashcardTuple[] = rows
        .filter((r) => r.length >= 2 && r[0]?.trim() && r[1]?.trim())
        .map((r) => [r[0].trim(), r[1].trim(), (r[2] || 'Geral').trim(), (r[3] || '').trim()]);

      if (!imported.length) {
        setNotice('Não encontrei cartões válidos. Confira se o arquivo contém as colunas Frente;Verso;Categoria;Fonte.');
        return;
      }

      const signatures = new Set(cards.map((c) => c[0].trim().toLowerCase()));
      let added = 0;
      const updated = [...cards];

      for (const card of imported) {
        const sig = card[0].trim().toLowerCase();
        if (!signatures.has(sig)) {
          updated.push(card);
          signatures.add(sig);
          added++;
        }
      }

      setCards(updated);
      try {
        localStorage.setItem(STORAGE_KEY_CARDS, JSON.stringify(updated));
      } catch {
        // storage quota
      }

      setNotice(
        `Importação concluída: ${added} novos cartões adicionados. ${imported.length - added} duplicados ignorados. Os cartões ficam neste navegador; para distribuí-los, será necessário publicar uma versão atualizada.`
      );
    } catch {
      setNotice('Erro ao ler o arquivo. Certifique-se de que é um arquivo de texto válido (.txt ou .csv).');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleResetCards = () => {
    if (window.confirm('Restaurar apenas os 15 cartões originais neste navegador?')) {
      setCards(INITIAL_FLASHCARDS);
      setSelectedCategory('');
      try {
        localStorage.removeItem(STORAGE_KEY_CARDS);
      } catch {
        // ignore
      }
      setNotice('Restaurados os 15 cartões originais.');
    }
  };

  return (
    <section id="flashcard-content" className="w-full max-w-3xl mx-auto my-8 px-4 focus:outline-none">
      {/* Top Toolbar */}
      <div className="flex justify-center items-center gap-3 flex-wrap mb-4">
        {/* Category Selector */}
        <select
          aria-label="Filtrar por categoria"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#172344] text-[#FAF9FF] border border-[#59658C] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C5B0F3] cursor-pointer"
        >
          <option value="">Todas as categorias</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Anki File Upload */}
        <label className="inline-flex items-center gap-1.5 bg-[#A5DFE8] hover:bg-[#8ee1ee] text-[#0A1025] font-extrabold text-sm px-4 py-3 rounded-xl border border-[#A5DFE8] transition-all cursor-pointer shadow-sm hover:-translate-y-0.5">
          <span>+</span> Importar arquivo do Anki
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.csv,text/plain,text/csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        {/* Restore Initial 15 */}
        <button
          onClick={handleResetCards}
          className="bg-[#24345D] hover:bg-[#2e4275] text-[#FAF9FF] border border-[#53668D] font-extrabold text-sm px-4 py-3 rounded-xl transition-all cursor-pointer hover:-translate-y-0.5"
        >
          Restaurar 15 cartões
        </button>
      </div>

      {/* Counter */}
      <div className="text-center text-[#A9C7F8] text-xs sm:text-sm font-medium mb-3">
        {filteredCards.length} cartões disponíveis • {cards.length} no total
      </div>

      {/* Interactive Card */}
      <div
        tabIndex={0}
        role="button"
        aria-label="Virar flashcard"
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        className={`min-h-[350px] w-full rounded-3xl p-6 sm:p-10 flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-300 select-none shadow-[0_20px_65px_rgba(2,6,20,0.6)] border ${
          isFlipped
            ? 'bg-gradient-to-br from-[#213063] to-[#162145] border-[#8997CD]'
            : 'bg-gradient-to-br from-[#1B2853] to-[#131B39] border-[#6976A8] hover:border-[#8e9bc7]'
        } outline-none focus-visible:ring-2 focus-visible:ring-[#C5B0F3]`}
      >
        <div className="text-[#A5DFE8] text-xs font-black tracking-[0.18em] uppercase">
          {isFlipped ? 'RESPOSTA' : 'PERGUNTA'}
        </div>

        <div className="my-auto py-4 w-full">
          {currentCard ? (
            <div
              className={`text-white transition-opacity duration-200 ${
                isFlipped
                  ? 'text-left text-base sm:text-lg md:text-xl font-normal leading-relaxed [&>b]:text-[#C5B0F3] [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1'
                  : 'text-center text-xl sm:text-2xl md:text-3xl font-bold leading-snug'
              }`}
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(isFlipped ? currentCard[1] : currentCard[0])
              }}
            />
          ) : (
            <p className="text-slate-400">Nenhum cartão nesta categoria</p>
          )}
        </div>

        <div className="text-xs text-[#A9C7F8] font-medium pt-2">
          {isFlipped
            ? `Fonte: ${currentCard?.[3] || 'Não informada'} • Clique para voltar`
            : 'Clique para revelar a resposta ↻'}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center gap-3 my-5">
        <button
          onClick={handlePrev}
          disabled={!currentCard || currentIndex === 0}
          className="bg-[#C5B0F3] hover:bg-[#b8a0ec] disabled:opacity-40 disabled:cursor-not-allowed text-[#0A1025] font-black text-xs sm:text-sm px-5 py-3 rounded-xl transition-all cursor-pointer shadow-sm min-w-[110px]"
        >
          ← ANTERIOR
        </button>

        <span className="text-[#A9C7F8] text-xs sm:text-sm font-semibold tabular-nums">
          {currentCard ? `${currentIndex + 1} / ${filteredCards.length}` : '0 / 0'}
        </span>

        <button
          onClick={handleNext}
          disabled={!currentCard || currentIndex === filteredCards.length - 1}
          className="bg-[#C5B0F3] hover:bg-[#b8a0ec] disabled:opacity-40 disabled:cursor-not-allowed text-[#0A1025] font-black text-xs sm:text-sm px-5 py-3 rounded-xl transition-all cursor-pointer shadow-sm min-w-[110px]"
        >
          PRÓXIMO →
        </button>
      </div>

      {/* Notice info */}
      <p className="text-xs text-[#B7C2E0] leading-relaxed mt-6 bg-[#0B132D]/50 p-4 rounded-xl border border-[#3B4D78]/50">
        {notice}
      </p>
    </section>
  );
};
