import './Answer.css'
import {AnswerApiProps, AnswerTypeEnum} from "../../../types/Survey.ts";
import TextAnswerComponent from "./TextAnswerComponent.tsx";
import DateAnswerComponent from "./DateAnswerComponent.tsx";

const reverseAnswerTypeMapping: Record<string, AnswerTypeEnum> = {
  "TEXT": AnswerTypeEnum.TEXT,
  "DATE": AnswerTypeEnum.DATE,
  "MULTIPLE_CHOICE": AnswerTypeEnum.MULTIPLE_CHOICE,
};

export default function AnswerComponent(
  props: AnswerApiProps) {
  const { answerType, onAnswerChange } = props

  console.log(answerType)

  const renderAnswerComponent = (type: AnswerTypeEnum) => {
    switch (type) {
      case AnswerTypeEnum.TEXT:
        return <TextAnswerComponent answerType="TEXT" onAnswerChange={onAnswerChange} />;
      case AnswerTypeEnum.DATE:
        return <DateAnswerComponent answerType="DATE" onAnswerChange={onAnswerChange} />;
    }
  };

  return (
    <div className="answer-component">
      <div className="border p-2 mb-2 rounded-lg">
        {renderAnswerComponent(reverseAnswerTypeMapping[answerType])}
      </div>
    </div>
  );
}