import './Answer.css'
import {InputField} from "../../InputField.tsx";
import {ChangeEvent, useState} from "react";
import {AnswerProps} from "../../../types/Survey.ts";

export default function TextAnswerComponent(
  props: AnswerProps) {
  const {answer, onAnswerChange} = props;
  const [text, setText]
    = useState(answer.text);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    onAnswerChange!({...answer, text: e.target.value});
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