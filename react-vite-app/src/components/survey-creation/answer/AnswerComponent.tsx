import './Answer.css'
import {AnswerProps, AnswerTypeEnum} from "../../../types/Survey.ts";
import TextAnswerComponent from "./TextAnswerComponent.tsx";
import {colorsPresets} from "../../../styles/colorsPresets.ts";

export default function AnswerComponent(props: AnswerProps) {
  const { answer, onUpdate } = props;

  const handleAnswerTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAnswerType = e.target.value as AnswerTypeEnum;
    onUpdate!({ ...answer, answerType: newAnswerType });
  };

  const renderAnswerComponent = (type: AnswerTypeEnum) => {
    switch (type) {
      case AnswerTypeEnum.TEXT:
        return <TextAnswerComponent answer={answer} />;
      // Добавьте сюда другие типы ответов
      default:
        return null;
    }
  };

  return (
    <div className="answer-component">
      <select
        value={answer.answerType}
        onChange={handleAnswerTypeChange}
        className={`w-full p-3 rounded-md ${colorsPresets.inputBackground} ${colorsPresets.primaryText} border-none focus:outline-none focus:ring-2 ${colorsPresets.buttonFocusRing}`}
        style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
      >
        {Object.values(AnswerTypeEnum).map((type) => (
          <option key={type} value={type} className="truncate">
            {type}
          </option>
        ))}
      </select>
      {renderAnswerComponent(answer.answerType)}
    </div>
  );
}