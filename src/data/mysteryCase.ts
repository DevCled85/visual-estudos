import { MysteryClue } from '../types';

export const MYSTERY_CASES: MysteryClue[] = [
  {
    tag: 'PISTA 01 • ANAMNESE',
    title: 'O que a história clínica sugere?',
    story:
      'Paciente fictícia, 64 anos, aposentada, relata dor progressiva na virilha direita há 18 meses. Rigidez ao levantar pela manhã por cerca de 15 minutos. Dor ao caminhar e subir escadas, com melhora no repouso.',
    question: 'Qual hipótese merece maior investigação?',
    choices: [
      'Osteoartrite de quadril',
      'Radiculopatia lombar aguda',
      'Ruptura do ligamento cruzado anterior'
    ],
    correct: 0,
    why: 'Dor mecânica na virilha, evolução lenta e rigidez matinal breve são compatíveis com osteoartrite do quadril. Isso não confirma o diagnóstico isoladamente.'
  },
  {
    tag: 'PISTA 02 • EXAME FÍSICO',
    title: 'O movimento revela uma pista.',
    story:
      'Na avaliação, há limitação dolorosa da rotação interna e da flexão do quadril direito, redução da velocidade da marcha e dificuldade para calçar sapatos.',
    question: 'Qual achado reforça a hipótese?',
    choices: [
      'Aumento da rotação interna',
      'Limitação dolorosa da rotação interna',
      'Ausência de dor ao movimento'
    ],
    correct: 1,
    why: 'A limitação dolorosa da rotação interna é frequente na osteoartrite do quadril e deve ser interpretada com o conjunto da avaliação.'
  },
  {
    tag: 'PISTA 03 • EVIDÊNCIA',
    title: 'O laudo chegou.',
    story:
      'Laudo radiográfico fictício: redução do espaço articular superior, osteófitos marginais e esclerose subcondral no quadril direito.',
    question: 'Como interpretar os achados?',
    choices: [
      'A imagem determina sozinha a intensidade da dor',
      'São alterações compatíveis com degeneração articular',
      'Indicam cirurgia imediata'
    ],
    correct: 1,
    why: 'Essas alterações são típicas de osteoartrite. A intensidade dos sintomas e a incapacidade não são definidas apenas pela radiografia.'
  },
  {
    tag: 'PISTA 04 • CONDUTA',
    title: 'Você assumiu o caso.',
    story:
      'A paciente quer voltar a caminhar no bairro e subir escadas com menos dor. Não apresenta sinais de alerta na triagem inicial.',
    question: 'Qual plano inicial é mais apropriado?',
    choices: [
      'Repouso absoluto por seis semanas',
      'Somente ultrassom terapêutico',
      'Educação, exercícios progressivos, treino funcional e atividade aeróbica adaptada'
    ],
    correct: 2,
    why: 'Educação, fortalecimento e exercícios individualizados e progressivos são pilares da abordagem conservadora; recursos passivos não os substituem.'
  }
];
