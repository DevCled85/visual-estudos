import React, { useState } from 'react';
import { MYSTERY_CASES } from '../data/mysteryCase';

export const FisioMisterio: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answered, setAnswered] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const currentClue = MYSTERY_CASES[step];
  const isFinished = step >= MYSTERY_CASES.length;

  const handleSelectChoice = (index: number) => {
    if (answered || isFinished) return;
    setAnswered(true);
    setSelectedIndex(index);
    if (index === currentClue.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextStep = () => {
    if (isFinished) {
      setStep(0);
      setScore(0);
      setAnswered(false);
      setSelectedIndex(null);
    } else {
      setStep((prev) => prev + 1);
      setAnswered(false);
      setSelectedIndex(null);
    }
  };

  return (
    <section id="fisiomisterio" aria-labelledby="mystery-title" className="w-full max-w-4xl mx-auto my-14 sm:my-20 px-4 scroll-mt-8">
      <div className="bg-gradient-to-br from-[#1B2850] to-[#10172E] border border-[#596898] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(2,6,20,0.5)]">
        {/* Header Kicker */}
        <div className="text-xs font-black tracking-[0.14em] text-[#A5DFE8] uppercase">
          FISIOMISTÉRIO • CASO 001 • GRATUITO
        </div>

        <h2 id="mystery-title" className="text-3xl sm:text-5xl font-black tracking-[-0.055em] text-white mt-2 mb-3">
          O ENIGMA DO <span className="text-[#C5B0F3]">QUADRIL.</span>
        </h2>

        <p className="text-[#D0D7F0] text-sm sm:text-base leading-relaxed mb-6">
          Uma dor persistente. Uma marcha alterada. Quatro pistas para investigar um caso clínico fictício. Você consegue desvendar?
        </p>

        {!isFinished ? (
          <div>
            {/* Clue Progress */}
            <div className="text-xs font-extrabold text-[#A5DFE8] tracking-wider uppercase mb-1">
              PISTA {step + 1} DE 4 • {currentClue.tag}
            </div>

            {/* Clue Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {currentClue.title}
            </h3>

            {/* Case File / Document */}
            <div className="bg-[#0B132D] border border-[#3B4D78] rounded-2xl p-5 sm:p-6 my-4 text-[#E0E5F4] text-sm sm:text-base leading-relaxed shadow-inner">
              {currentClue.story}
            </div>

            {/* Case Question */}
            <h4 className="text-base sm:text-lg font-bold text-white mt-5 mb-3">
              {currentClue.question}
            </h4>

            {/* Choices */}
            <div className="grid gap-2.5 my-4">
              {currentClue.choices.map((choice, i) => {
                const letter = String.fromCharCode(65 + i);
                const isSelected = selectedIndex === i;
                const isCorrect = i === currentClue.correct;

                let btnStyle = 'bg-[#243259] border-[#52618A] text-white hover:border-[#8e9bc7]';
                if (answered) {
                  if (isSelected && isCorrect) {
                    btnStyle = 'bg-[#294e39] border-[#48bb78] text-white font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-[#493976] border-[#C5B0F3] text-white font-bold';
                  } else if (isCorrect) {
                    btnStyle = 'bg-[#243259] border-[#48bb78]/80 text-[#8FE4DA]';
                  } else {
                    btnStyle = 'bg-[#1b2644] border-[#38456B] opacity-60 text-slate-300';
                  }
                }

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={answered}
                    onClick={() => handleSelectChoice(i)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border font-medium text-sm sm:text-base transition-all duration-200 cursor-pointer disabled:cursor-default flex items-start gap-2.5 ${btnStyle}`}
                  >
                    <span className="font-bold text-[#A5DFE8] shrink-0">{letter}.</span>
                    <span>{choice}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback alert */}
            {answered && (
              <div
                aria-live="polite"
                className="bg-[#1B304B] border border-[#3B4D78] rounded-2xl p-5 text-[#E6EEFA] text-sm sm:text-base leading-relaxed my-4"
              >
                <span className="font-bold block mb-1">
                  {selectedIndex === currentClue.correct
                    ? '✓ Pista interpretada corretamente!'
                    : '⚠ Reavalie sua hipótese.'}
                </span>
                {currentClue.why}
              </div>
            )}

            {/* Action button */}
            {answered && (
              <button
                type="button"
                onClick={handleNextStep}
                className="mt-2 bg-[#C5B0F3] hover:bg-[#b8a0ec] text-[#0A1025] font-black text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-md hover:-translate-y-0.5"
              >
                {step === 3 ? 'ABRIR DESFECHO LACRADO →' : 'PRÓXIMA PISTA →'}
              </button>
            )}
          </div>
        ) : (
          /* Finished Screen */
          <div className="py-2">
            <div className="text-xs font-black text-[#A5DFE8] tracking-widest uppercase mb-1">
              ARQUIVO DESCLASSIFICADO
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
              MISTÉRIO SOLUCIONADO —{' '}
              <span className="text-[#C5B0F3]">{score}/4 pistas</span>
            </h3>

            <div className="bg-[#0B132D] border border-[#3B4D78] rounded-2xl p-6 text-[#E0E5F4] text-base leading-relaxed space-y-3 mb-6">
              <p>
                <strong>Hipótese principal:</strong> osteoartrite de quadril direito. A avaliação clínica, a função e os achados radiográficos são compatíveis. O tratamento fisioterapêutico é individualizado e prioriza educação e exercícios.
              </p>
              <p className="text-xs text-[#A9C7F8] pt-2 border-t border-[#3B4D78]/60">
                Caso fictício para fins educacionais. Avaliações reais exigem diagnóstico diferencial e triagem de sinais de alerta.
              </p>
            </div>

            <button
              type="button"
              onClick={handleNextStep}
              className="bg-[#C5B0F3] hover:bg-[#b8a0ec] text-[#0A1025] font-black text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-md hover:-translate-y-0.5"
            >
              REINICIAR INVESTIGAÇÃO ↻
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
