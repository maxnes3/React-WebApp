import './Question.css'
import {QuestionApiProps} from "../../../types/Survey.ts";

export default function TextQuestionComponent(
  props: QuestionApiProps) {
  const { question } = props;

  return (
    <div>
      <h1>{question.text}</h1>
    </div>
  );
}