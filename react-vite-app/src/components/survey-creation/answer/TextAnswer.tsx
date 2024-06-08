import './Answer.css'
import {AnswerProps} from "../../../types/Survey.ts";

export interface TextAnswerProps extends AnswerProps {

}

export default function TextAnswerProps(answer: TextAnswerProps) {
  const { text } = answer;
  return (
    <div>
      <input value={text} />
    </div>
  );
}