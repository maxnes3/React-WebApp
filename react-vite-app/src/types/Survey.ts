export enum QuestionTypeEnum {
  TEXT = 'TEXT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TABLE = 'TABLE',
  IMAGE = 'IMAGE',
}

export enum AnswerTypeEnum {
  TEXT = 'TEXT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  DATE = 'DATE'
}

export type AnswerModel = {
  answerType: AnswerTypeEnum;
  text?: string;
  choices?: string[];
  startDate?: string;
  endDate?: string;
}

export interface AnswerProps {
  answer: AnswerModel;
  onUpdate?: (updatedAnswer: AnswerModel) => void;
}

export type QuestionModel = {
  text: string;
  questionType: QuestionTypeEnum;
  subquestions?: string[];
  imageUrl?: string;
  answer: AnswerModel;
}

export interface QuestionProps {
  question: QuestionModel;
  onDelete?: () => void;
  onUpdate?: (updatedQuestion: QuestionModel) => void;
}

export type SurveyModel = {
  title: string;
  questions: QuestionModel[];
}

export interface SurveyProps {
  survey: SurveyModel;
}