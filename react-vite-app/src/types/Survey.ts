export enum QuestionType {
  TEXT = 'TEXT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TABLE = 'TABLE',
  IMAGE = 'IMAGE',
}

export enum AnswerType {
  TEXT = 'TEXT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  DATE = 'DATE'
}

export interface AnswerProps {
  answerType: string;
  text?: string;
  choices?: string[];
  startDate?: string;
  endDate?: string;
}

export interface QuestionProps {
  text: string;
  questionType: QuestionType;
  subquestions?: string[];
  imageUrl?: string;
  answer: AnswerProps;
}

export interface SurveyProps {
}