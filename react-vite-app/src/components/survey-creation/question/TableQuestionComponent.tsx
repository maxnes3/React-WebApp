import './Question.css'
import {AnswerModel} from "../../../types/Survey.ts";

export type TableQuestionModel = {
  text: string;
  subquestions?: string[];
  answer?: AnswerModel;
}

export interface TableQuestionProps {
  question: TableQuestionModel;
}

export default function TableQuestionComponent(
  props: TableQuestionProps) {
  const { text, subquestions } = props.question;
  return (
    <div>
      <p>{text}</p>
      <table>
        <thead>
        <tr>
          {subquestions!.map((subquestion, index) => (
            <th key={index}>{subquestion}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  );
}