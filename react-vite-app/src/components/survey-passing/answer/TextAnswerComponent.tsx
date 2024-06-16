import './Answer.css'
import {InputField} from "../../ui/InputField.tsx";
import {ChangeEvent, useState} from "react";
import {AnswerApiProps} from "../../../types/Survey.ts";

export default function TextAnswerComponent(
  props: AnswerApiProps ) {
  const {answerType, onAnswerChange} = props
  const [text, setText] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    if (onAnswerChange) {
      onAnswerChange({answerType: answerType, text: e.target.value});
    }
  };

  return (
    <div>
      <InputField id="answer-text"
                  label="Введите ответ на вопрос"
                  placeholder="Примерный ответ"
                  value={text}
                  onChange={handleChange}/>
    </div>
  );
}