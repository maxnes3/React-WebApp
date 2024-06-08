import './Question.css'
import Answer from '../answer/Answer.tsx'
import {AnswerProps} from "../../../types/Survey.ts";


export interface TextQuestionProps {
  text: string;
  answer: AnswerProps;
}

export default function TextQuestion(question: TextQuestionProps) {
  const { text, answer } = question;
  return (
    <div>
      <p>{text}</p>
      <Answer {...answer} />
    </div>
  );
}