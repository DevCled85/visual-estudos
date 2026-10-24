export type FlashcardTuple = [
  question: string,
  answer: string,
  category: string,
  source?: string
];

export interface MysteryClue {
  tag: string;
  title: string;
  story: string;
  question: string;
  choices: string[];
  correct: number;
  why: string;
}

export interface LeadData {
  nome: string;
  email: string;
  telefone?: string;
  marketing: boolean;
  timestamp: string;
}
