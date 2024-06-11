import './Question.css'
import {TextArea} from "../../ui/TextArea.tsx";
import {ChangeEvent, useState} from "react";
import {QuestionProps} from "../../../types/Survey.ts";

export default function TextQuestionComponent(
  props: QuestionProps) {
  const { question, onQuestionChange } = props;
  const [questionText, setQuestionText]
    = useState(question.text);


  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionText(e.target.value);
    onQuestionChange!({...question, text: e.target.value});
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