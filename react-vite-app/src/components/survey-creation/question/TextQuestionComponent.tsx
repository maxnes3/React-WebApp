import './Question.css'
import {AnswerModel} from "../../../types/Survey.ts";
import {TextArea} from "../../TextArea.tsx";
import {ChangeEvent, useState} from "react";

export type TextQuestionModel = {
  text: string;
  answer: AnswerModel;
}

export interface TextQuestionProps {
  question: TextQuestionModel;
}

export default function TextQuestionComponent(
  props: TextQuestionProps) {
  const [questionText, setQuestionText]
    = useState(props.question.text);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionText(e.target.value);
  };

  return (
    <div>
      <TextArea id="question-text"
                label="Содержание вопроса"
                placeholder="Содержание вопроса"
                value={questionText}
                onChange={handleTextChange}/>
    </div>
  );
}