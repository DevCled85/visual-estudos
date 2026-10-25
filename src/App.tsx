/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LeadCapture } from './components/LeadCapture';
import { FlashcardViewer } from './components/FlashcardViewer';
import { FisioMisterio } from './components/FisioMisterio';
import { LojaSection } from './components/LojaSection';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';
import { LeadsAdminModal } from './components/LeadsAdminModal';
import { WhatsAppConnectModal } from './components/WhatsAppConnectModal';
import { STORAGE_KEY_ACCESS } from './data/flashcards';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);
  const [isLeadsAdminOpen, setIsLeadsAdminOpen] = useState<boolean>(false);
  const [isWhatsAppConnectOpen, setIsWhatsAppConnectOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY_ACCESS) === '1') {
        setIsUnlocked(true);
      }
    } catch {
      // fallback
    }
  }, []);

  const handleUnlocked = () => {
    setIsUnlocked(true);
    setTimeout(() => {
      const el = document.getElementById('flashcards');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleScrollToFlashcards = () => {
    const el = document.getElementById('flashcards');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent selection:bg-[#C5B0F3] selection:text-[#0A1025]">
      {/* Skip to Content for Accessibility */}
      <a
        href="#flashcards"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-white text-slate-900 px-4 py-2 rounded-lg font-bold"
      >
        Pular para os flashcards
      </a>

      {/* Navigation Bar */}
      <Header onNavigateToFlashcards={handleScrollToFlashcards} />

      {/* Main Content Wrap */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <Hero onExploreClick={handleScrollToFlashcards} />

        {/* Anchor for Flashcards section */}
        <div id="flashcards" className="scroll-mt-6" aria-hidden="true" />

        {/* Flashcards: either Lead Capture or Interactive Viewer */}
        {isUnlocked ? (
          <FlashcardViewer />
        ) : (
          <LeadCapture
            onUnlocked={handleUnlocked}
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
          />
        )}

        {/* FisioMistério Clinical Investigation Case */}
        <FisioMisterio />

        {/* Loja Visual Estudos Mapas Mentais */}
        <LojaSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenLeadsAdmin={() => setIsLeadsAdminOpen(true)}
        onOpenWhatsAppConnect={() => setIsWhatsAppConnectOpen(true)}
      />

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Leads Database Admin Modal */}
      <LeadsAdminModal
        isOpen={isLeadsAdminOpen}
        onClose={() => setIsLeadsAdminOpen(false)}
      />

      {/* WhatsApp Evolution API Connect Modal */}
      <WhatsAppConnectModal
        isOpen={isWhatsAppConnectOpen}
        onClose={() => setIsWhatsAppConnectOpen(false)}
      />
    </div>
  );
}
