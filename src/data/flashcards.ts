import { FlashcardTuple } from '../types';

export const INITIAL_FLASHCARDS: FlashcardTuple[] = [
  [
    'Quais são os graus da escala MRC de força muscular?',
    '<b>0:</b> sem contração<br><b>1:</b> contração visível ou palpável, sem movimento<br><b>2:</b> movimento com gravidade eliminada<br><b>3:</b> vence a gravidade, sem resistência<br><b>4:</b> vence a gravidade e resistência parcial<br><b>5:</b> força normal',
    'Escala de Força',
    'Medical Research Council (MRC); Kendall'
  ],
  [
    'O que é o MRC Sum Score e qual o ponto de corte para fraqueza adquirida na UTI?',
    'Soma da força de 12 grupos musculares (6 por lado: abdução de ombro, flexão de cotovelo, extensão de punho, flexão de quadril, extensão de joelho e dorsiflexão).<br>Pontuação de 0 a 60.<br><b>Abaixo de 48</b> indica fraqueza adquirida na UTI.',
    'Escala de Força',
    'MRC Sum Score'
  ],
  [
    'Quais são os graus da Escala de Ashworth Modificada?',
    '<b>0:</b> sem aumento do tônus<br><b>1:</b> leve aumento, com "pegada" e liberação ou resistência mínima no final da ADM<br><b>1+:</b> leve aumento, com "pegada" seguida de resistência mínima em menos da metade da ADM<br><b>2:</b> aumento mais marcante na maior parte da ADM, mas o movimento é fácil<br><b>3:</b> aumento considerável, movimento passivo difícil<br><b>4:</b> segmento rígido em flexão ou extensão',
    'Escala de Espasticidade',
    'Ashworth Modificada (Bohannon e Smith)'
  ],
  [
    'Qual a definição clássica de espasticidade?',
    'Aumento do tônus muscular <b>dependente da velocidade</b> do estiramento passivo, com reflexos tendíneos exagerados (definição de Lance).<br>Faz parte da síndrome do neurônio motor superior.<br>Como a Ashworth não mede a velocidade, a <b>Escala de Tardieu</b> é uma alternativa.',
    'Escala de Espasticidade',
    'Lance (1980); Tardieu'
  ],
  [
    'Quais os três componentes do Glasgow e a pontuação de cada um?',
    '<b>Abertura ocular (1-4):</b> espontânea, ao comando, à dor, nenhuma<br><b>Resposta verbal (1-5):</b> orientado, confuso, palavras inapropriadas, sons incompreensíveis, nenhuma<br><b>Resposta motora (1-6):</b> obedece comandos, localiza dor, retirada, flexão anormal, extensão anormal, nenhuma<br><br>Total: <b>3 a 15</b>.',
    'Glasgow',
    'Teasdale e Jennett (1974)'
  ],
  [
    'Como o Glasgow classifica a gravidade do TCE e o que significam as respostas motoras 3 e 2?',
    '<b>Leve:</b> 13-15<br><b>Moderado:</b> 9-12<br><b>Grave:</b> ≤ 8<br><br>Motora 3 = flexão anormal (<b>decorticação</b>).<br>Motora 2 = extensão anormal (<b>descerebração</b>).',
    'Glasgow',
    'Escala de Coma de Glasgow'
  ],
  [
    'Como posicionar o goniômetro?',
    '<b>Eixo (fulcro):</b> sobre o eixo articular<br><b>Braço fixo:</b> alinhado ao segmento proximal<br><b>Braço móvel:</b> acompanha o segmento distal<br><br>Antes de medir, posicione o paciente e estabilize o segmento proximal.',
    'Goniometria',
    'Marques, Manual de Goniometria'
  ],
  [
    'Quais os valores normais de ADM de ombro, cotovelo, joelho e tornozelo?',
    '<b>Ombro:</b> flexão e abdução 0-180°<br><b>Cotovelo:</b> flexão 0-150°<br><b>Joelho:</b> flexão 0-135°<br><b>Tornozelo:</b> dorsiflexão 0-20°, flexão plantar 0-50°<br><br><i>Os valores variam conforme a referência (AAOS, Marques etc.).</i>',
    'Goniometria',
    'AAOS; Marques'
  ],
  [
    'O que é neuroplasticidade?',
    'Capacidade do sistema nervoso de <b>reorganizar sua estrutura, função e conexões</b> em resposta a experiências, aprendizado ou lesão.<br>É a base biológica da reabilitação neurológica.',
    'Neuroplasticidade',
    'Kandel, Princípios de Neurociências'
  ],
  [
    'Quais mecanismos e princípios sustentam a neuroplasticidade na reabilitação?',
    '<b>Mecanismos:</b> potenciação de longa duração (LTP), sinaptogênese, brotamento axonal, recrutamento de vias alternativas<br><b>Princípios:</b> repetição, intensidade, especificidade da tarefa, motivação e feedback<br><b>Fator favorável:</b> BDNF, estimulado pelo exercício aeróbico',
    'Neuroplasticidade',
    'Kleim e Jones (2008); Kandel'
  ],
  [
    'Quais as fases do potencial de ação neuronal?',
    '<ol class="list-decimal pl-5 space-y-1"><li><b>Repouso:</b> cerca de -70 mV</li><li><b>Despolarização:</b> abertura dos canais de <b>Na⁺</b> voltagem-dependentes</li><li><b>Pico:</b> cerca de +30 mV</li><li><b>Repolarização:</b> abertura dos canais de <b>K⁺</b> e inativação dos de Na⁺</li><li><b>Hiperpolarização:</b> retorno gradual ao repouso, com a <b>bomba Na⁺/K⁺-ATPase</b></li></ol>',
    'Potencial de Ação',
    'Guyton e Hall; Kandel'
  ],
  [
    'O que são limiar, lei do "tudo ou nada" e período refratário?',
    '<b>Limiar:</b> cerca de -55 mV, o valor mínimo para disparar o potencial de ação<br><b>Tudo ou nada:</b> atingido o limiar, o potencial ocorre com amplitude máxima. Se não atingido, não ocorre<br><b>Período refratário absoluto:</b> nenhum novo estímulo gera potencial, pois os canais de Na⁺ estão inativados. Garante a propagação em um só sentido',
    'Potencial de Ação',
    'Guyton e Hall'
  ],
  [
    'Quais são os princípios doutrinários do SUS e o que cada um significa?',
    '<b>Universalidade:</b> saúde é direito de todos<br><b>Equidade:</b> tratar desigualmente os desiguais, conforme a necessidade<br><b>Integralidade:</b> atenção em todos os níveis, com ações de promoção, prevenção, tratamento e reabilitação',
    'SUS',
    'Constituição Federal de 1988; Lei 8.080/1990'
  ],
  [
    'Quais leis organizam o SUS e quais as diretrizes organizativas?',
    '<b>Lei 8.080/1990:</b> organização e funcionamento do SUS<br><b>Lei 8.142/1990:</b> participação da comunidade e transferências financeiras<br><br><b>Diretrizes organizativas:</b> descentralização, regionalização e hierarquização, participação social',
    'SUS',
    'Leis 8.080/1990 e 8.142/1990'
  ],
  [
    'O que é a PNAB e quais suas principais diretrizes?',
    'A Política Nacional de Atenção Básica (<b>Portaria GM/MS nº 2.436/2017</b>) define a Atenção Básica como porta de entrada preferencial do SUS.<br><br>Diretrizes principais: <b>territorialização, população adscrita, longitudinalidade, coordenação do cuidado, resolutividade, ordenação da rede e participação da comunidade</b>.',
    'PNAB',
    'Portaria GM/MS nº 2.436/2017'
  ]
];

export const STORAGE_KEY_CARDS = 'fisioup-flash-cards';
export const STORAGE_KEY_ACCESS = 'visual-estudos-free-access';

export function parseDelimited(text: string, delimiter: string): string[][] {
  text = text.replace(/^\uFEFF/, '');
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (quoted && text[i + 1] === '"') {
        field += '"';
        i++;
      } else {
        quoted = !quoted;
      }
    } else if (ch === delimiter && !quoted) {
      row.push(field);
      field = '';
    } else if ((ch === '\n' || ch === '\r') && !quoted) {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      if (row.some((v) => v.trim())) rows.push(row);
      row = [];
      field = '';
    } else {
      field += ch;
    }
  }
  row.push(field);
  if (row.some((v) => v.trim())) rows.push(row);
  return rows;
}

export function sanitizeHtml(rawHtml: string): string {
  // Simple browser sanitizer that removes dangerous script/style tags and on* attributes
  const div = document.createElement('div');
  div.innerHTML = rawHtml;
  div.querySelectorAll('script,style,iframe,object,embed,svg,math').forEach((e) => e.remove());
  div.querySelectorAll('*').forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      if (attr.name.startsWith('on') || ['href', 'src', 'style'].includes(attr.name)) {
        el.removeAttribute(attr.name);
      }
    });
  });
  return div.innerHTML;
}
