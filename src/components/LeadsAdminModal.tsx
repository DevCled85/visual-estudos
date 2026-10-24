import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Download, Users, X, MessageCircle } from 'lucide-react';

interface LeadRecord {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  marketing?: boolean;
  createdAt: string;
}

interface LeadsAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadsAdminModal: React.FC<LeadsAdminModalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);

    const path = 'leads';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const docs: LeadRecord[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            docs.push({
              id: doc.id,
              nome: data.nome || '',
              email: data.email || '',
              telefone: data.telefone || '',
              marketing: Boolean(data.marketing),
              createdAt: data.createdAt || '',
            });
          });
          setLeads(docs);
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          handleFirestoreError(error, OperationType.GET, path);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      setLoading(false);
      handleFirestoreError(err, OperationType.GET, path);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleExportCSV = () => {
    if (!leads.length) return;
    const headers = ['ID', 'Nome', 'Email', 'Telefone', 'Marketing', 'Data'];
    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.nome.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${(l.telefone || '').replace(/"/g, '""')}"`,
      l.marketing ? 'Sim' : 'Não',
      `"${new Date(l.createdAt).toLocaleString('pt-BR')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_visual_estudos_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openWhatsAppToLead = (lead: LeadRecord) => {
    if (!lead.telefone) return;
    const clean = lead.telefone.replace(/\D/g, '');
    const phone = clean.length <= 11 ? `55${clean}` : clean;
    const msg = encodeURIComponent(
      `Olá, ${lead.nome}! Seja bem-vindo(a) à Visual Estudos. Notamos seu interesse nos nossos flashcards de Fisioterapia!`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0D1735] border border-[#3B4D78] rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col text-[#FAF9FF] shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 sm:p-6 border-b border-[#3B4D78]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#1B2853] text-[#A5DFE8]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                Banco de Dados de Leads
                <span className="text-xs bg-[#24345D] text-[#A5DFE8] border border-[#53668D] px-2.5 py-0.5 rounded-full font-bold tabular-nums">
                  {leads.length} cadastrados
                </span>
              </h2>
              <p className="text-xs text-[#A9C7F8] mt-0.5">
                Dados capturados no Firebase Firestore em tempo real
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {leads.length > 0 && (
              <button
                onClick={handleExportCSV}
                className="hidden sm:inline-flex items-center gap-2 bg-[#1B2853] hover:bg-[#253770] text-[#A5DFE8] border border-[#52618A] text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Exportar CSV
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {loading ? (
            <div className="py-16 text-center text-slate-400">
              <div className="inline-block animate-spin w-8 h-8 border-2 border-[#C5B0F3] border-t-transparent rounded-full mb-3" />
              <p className="text-sm">Carregando leads do banco de dados...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#A5DFE8]" />
              <p className="text-base font-semibold text-white">Nenhum lead cadastrado ainda</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Assim que um visitante preencher o formulário no site, os dados aparecerão aqui em tempo real.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#3B4D78] text-[#A5DFE8] uppercase tracking-wider text-[11px] font-bold">
                    <th className="pb-3 px-3">Nome</th>
                    <th className="pb-3 px-3">E-mail</th>
                    <th className="pb-3 px-3">Telefone / WhatsApp</th>
                    <th className="pb-3 px-3">Data</th>
                    <th className="pb-3 px-3 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3B4D78]/40">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#152042]/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-white">{lead.nome}</td>
                      <td className="py-3 px-3 text-[#D0D7F0]">{lead.email}</td>
                      <td className="py-3 px-3 text-[#A9C7F8] font-mono tabular-nums">
                        {lead.telefone || '—'}
                      </td>
                      <td className="py-3 px-3 text-slate-400 text-xs tabular-nums">
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleString('pt-BR') : '—'}
                      </td>
                      <td className="py-3 px-3 text-right">
                        {lead.telefone && (
                          <button
                            onClick={() => openWhatsAppToLead(lead)}
                            title="Conversar no WhatsApp"
                            className="inline-flex items-center gap-1.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 text-xs px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">WhatsApp</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#3B4D78] flex justify-between items-center text-xs text-[#A9C7F8]">
          <span>Conectado à nuvem Firebase Firestore</span>
          <button
            onClick={onClose}
            className="bg-[#C5B0F3] hover:bg-[#b8a0ec] text-[#0A1025] font-black px-4 py-2 rounded-xl transition-all cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
