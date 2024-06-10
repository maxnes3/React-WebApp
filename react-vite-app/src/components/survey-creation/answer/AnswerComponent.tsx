import './Answer.css'
import {AnswerProps, AnswerTypeEnum} from "../../../types/Survey.ts";
import TextAnswerComponent from "./TextAnswerComponent.tsx";
import {colorsPresets} from "../../../styles/colorsPresets.ts";
import {ChangeEvent, useState} from "react";
import MultipleChoiceAnswerComponent from "./MultipleChoiceAnswerComponent.tsx";
import DateAnswerComponent from "./DateAnswerComponent.tsx";

export default function AnswerComponent(props: AnswerProps) {
  const [answer, setAnswer] = useState(props.answer)
  const onAnswerChange = props.onAnswerChange;

  const handleAnswerTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newAnswerType = e.target.value as AnswerTypeEnum;
    const updatedAnswer = {...answer,
      answerType: newAnswerType,
      text: undefined,
      choices: undefined,
      startDate: undefined,
      endDate: undefined,
    };
    setAnswer(updatedAnswer);
    onAnswerChange!(updatedAnswer);
  };

  const handleAnswerChange = (updatedAnswer: typeof answer) => {
    setAnswer(updatedAnswer);
    onAnswerChange!(updatedAnswer);
  };

  const renderAnswerComponent = (type: AnswerTypeEnum) => {
    switch (type) {
      case AnswerTypeEnum.TEXT:
        return <TextAnswerComponent answer={answer} onAnswerChange={handleAnswerChange} />;
      case AnswerTypeEnum.MULTIPLE_CHOICE:
        return <MultipleChoiceAnswerComponent answer={answer} onAnswerChange={handleAnswerChange} />;
      case AnswerTypeEnum.DATE:
        return <DateAnswerComponent answer={answer} onAnswerChange={handleAnswerChange} />;
    }
  };

  return (
    <div className="answer-component">
      <select
        onChange={handleAnswerTypeChange}
        className={`w-full p-3 mb-2 rounded-md ${colorsPresets.inputBackground} ${colorsPresets.primaryText} border-none focus:outline-none focus:ring-2 ${colorsPresets.buttonFocusRing}`}
        style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
      >
        {Object.values(AnswerTypeEnum).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <div className="border p-2 mb-2 rounded-lg">
        {renderAnswerComponent(answer.answerType)}
      </div>
    </div>
  );
}