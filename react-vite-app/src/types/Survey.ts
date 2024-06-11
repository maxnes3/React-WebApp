export enum QuestionTypeEnum {
  TEXT = 'Текстовый вопрос',
  TABLE = 'Вопрос в виде таблицы',
  IMAGE = 'Вопрос с изображением',
}

export enum AnswerTypeEnum {
  TEXT = 'Ответ в виде текста',
  MULTIPLE_CHOICE = 'Ответ с выбором',
  DATE = 'Ответ в виде даты'
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
  onAnswerChange?: (answer: AnswerModel) => void;
}

export type QuestionModel = {
  id?: string;
  text: string;
  questionType: QuestionTypeEnum;
  subquestions?: string[];
  imageUrl?: string;
  answer: AnswerModel;
}

export type SubQuestionModel = {
  text: string;
}

export interface QuestionProps {
  question: QuestionModel;
  questionKey?: number;
  onDelete?: () => void;
  onQuestionChange?: (question: QuestionModel) => void;
}

export type SurveyModel = {
  title: string;
  questions: QuestionModel[];
}

export interface SurveyProps {
  survey: SurveyModel;
}