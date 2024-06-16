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

export type AnswerApiDto = {
  answerType: string;
  text?: string;
  choices?: number[];
  startDate?: string;
  endDate?: string;
}

export interface AnswerProps {
  correctAnswer: AnswerModel;
  onAnswerChange?: (answer: AnswerModel) => void;
}

export interface AnswerApiProps {
  answer?: AnswerApiDto;
  answerType: string;
  onAnswerChange?: (answer: AnswerApiDto) => void;
}

export type QuestionModel = {
  id?: number;
  text: string;
  questionType: QuestionTypeEnum;
  subquestions?: string[];
  imageUrl?: string;
  correctAnswer?: AnswerModel;
}

export type QuestionApiDto = {
  id: number;
  text: string;
  questionType: string;
  subquestions?: {id: number, text: string}[];
  imageUrl?: string;
  answerType?: string;
  answer?: AnswerApiDto;
}

export type SubQuestionModel = {
  text: string;
}

export interface QuestionProps {
  id?: number;
  question: QuestionModel;
  questionKey?: number;
  onDelete?: () => void;
  onQuestionChange?: (question: QuestionModel) => void;
}

export interface QuestionApiProps {
  id?: number;
  question: QuestionApiDto;
  onAnswerChange?: (answer: AnswerPassingModel) => void;
}

export interface TableQuestionApiProps {
  question: QuestionApiDto;
  onAnswerChange?: (answer: AnswerApiDto) => void;
}

export type SurveyModel = {
  id?: number
  title: string;
  questions: QuestionModel[];
}


export type SurveyApiDto = {
  id?: number
  title: string;
  questions: QuestionApiDto[];
}

export type SurveyDto = {
  id: number;
  title: string;
  numOfQuestions: number;
}

export type SurveyDtoProps = {
  survey: SurveyDto;
}

export interface SurveyProps {
  survey: SurveyModel;
}

export type AnswerPassingModel = {
  questionId: number;
  answer: AnswerApiDto;
}

export type SurveyPassingModel = {
  id: number,
  answers: AnswerPassingModel[];
}

export interface SurveyPassingProps {
 survey: SurveyPassingModel;
}