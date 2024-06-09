import './Question.css'
import {AnswerModel} from "../../../types/Survey.ts";

export type MultipleChoiceQuestionModel = {
  text: string;
  subquestions?: string[];
  answer?: AnswerModel;
}

export interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionModel;
}

export default function MultipleChoiceQuestionComponent(
  props: MultipleChoiceQuestionProps){
  const { text, subquestions } = props.question;
  return (
    <div>
      <p>{text}</p>
      {subquestions!.map((subquestion, index) => (
        <div key={index}>
          <label>{subquestion}</label>
        </div>
      ))}
    </div>
  );
}