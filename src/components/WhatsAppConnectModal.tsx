import React, { useState, useEffect } from 'react';
import { QrCode, RefreshCw, CheckCircle2, X, MessageSquare, ExternalLink } from 'lucide-react';

interface WhatsAppConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppConnectModal: React.FC<WhatsAppConnectModalProps> = ({ isOpen, onClose }) => {
  const [state, setState] = useState<'connecting' | 'open' | 'close' | 'loading'>('loading');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/whatsapp-status');
      if (res.ok) {
        const data = await res.json();
        setState(data.state || 'close');
        if (data.qrcode) {
          setQrCode(data.qrcode);
        }
      } else {
        // Direct fallback to Evolution API
        const directRes = await fetch(
          'https://evolution-api-latest-aqou.onrender.com/instance/connect/visualestudos',
          {
            headers: { apikey: 'visualestudos2026' },
          }
        );
        const directData = await directRes.json();
        if (directData.base64) {
          setQrCode(directData.base64);
          setState('connecting');
        }
      }
    } catch (err) {
      console.warn('Erro ao carregar status do WhatsApp:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    fetchStatus();

    const interval = setInterval(() => {
      fetchStatus();
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0D1735] border border-[#3B4D78] rounded-3xl max-w-md w-full text-[#FAF9FF] shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-[#3B4D78]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#25D366]/20 text-[#25D366]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">Conectar WhatsApp Automático</h3>
              <p className="text-xs text-[#A9C7F8]">Evolution API gratuita no Render</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          {state === 'open' ? (
            <div className="py-6 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#25D366]/20 border border-[#25D366]/50 flex items-center justify-center text-[#25D366]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black text-white">WhatsApp Conectado!</h4>
              <p className="text-xs text-[#D0D7F0] max-w-xs mx-auto leading-relaxed">
                Seu número está pareado à Evolution API. Todas as mensagens de boas-vindas serão enviadas 100% no automático!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-left bg-[#0B132D] p-3.5 rounded-2xl border border-[#3B4D78] text-xs text-[#D0D7F0] space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-[#A5DFE8]" /> Como conectar:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-slate-300 pl-1 pt-1">
                  <li>Abra o WhatsApp no seu celular</li>
                  <li>Vá em <strong>Aparelhos conectados</strong></li>
                  <li>Toque em <strong>Conectar aparelho</strong> e aponte para o QR Code abaixo:</li>
                </ol>
              </div>

              {/* QR Code Container */}
              <div className="relative mx-auto w-64 h-64 bg-white p-3 rounded-2xl border-4 border-[#25D366]/60 shadow-lg flex items-center justify-center">
                {qrCode ? (
                  <img
                    src={qrCode.startsWith('data:') ? qrCode : `data:image/png;base64,${qrCode}`}
                    alt="QR Code WhatsApp"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-slate-600 text-xs flex flex-col items-center gap-2">
                    <RefreshCw className="w-6 h-6 animate-spin text-[#1B2853]" />
                    <span>Gerando QR Code...</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-[#A9C7F8]">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Aguardando leitura do QR Code pelo celular...</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#3B4D78] flex justify-between items-center text-xs">
          <a
            href="https://evolution-api-latest-aqou.onrender.com/manager"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A5DFE8] hover:underline flex items-center gap-1 font-semibold"
          >
            Abrir Painel Manager ↗
          </a>

          <button
            onClick={fetchStatus}
            disabled={loading}
            className="flex items-center gap-1 text-[#C5B0F3] hover:text-white font-bold cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
};
