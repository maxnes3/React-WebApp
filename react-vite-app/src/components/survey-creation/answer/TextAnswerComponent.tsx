import './Answer.css'
import {AnswerModel} from "../../../types/Survey.ts";
import {InputField} from "../../InputField.tsx";
import {ChangeEvent, useState} from "react";

export interface TextAnswerProps {
  answer: AnswerModel;
}

export default function TextAnswerComponent(
  props: TextAnswerProps) {
  const [text, setText]
    = useState(props.answer.text);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <div>
      <InputField id="answer-text"
                  label="Введите ответ на вопрос"
                  placeholder="Примерный ответ"
                  value={text!}
                  onChange={handleTextChange}/>
    </div>
  );
}