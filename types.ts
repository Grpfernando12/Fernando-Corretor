export type Tab = 'home' | 'corrector' | 'converter' | 'about';

export interface ConverterOption {
  id: string;
  title: string;
  description: string;
  icon: string; // We'll use lucide-react names or similar identifiers
  color?: string;
}

export interface ProcessingStats {
  charCount: number;
  wordCount: number;
  processingTime: number;
  modelUsed: string;
}

export enum ProcessingType {
  CORRECTION = 'CORRECTION',
  IMPROVEMENT = 'IMPROVEMENT',
  TRANSLATION = 'TRANSLATION',
  EXPLANATION = 'EXPLANATION'
}