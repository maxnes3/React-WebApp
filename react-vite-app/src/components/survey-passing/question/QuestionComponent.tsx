import './Question.css'
import {AnswerApiDto, QuestionApiProps, QuestionTypeEnum} from "../../../types/Survey.ts";
import TextQuestionComponent from './TextQuestionComponent.tsx';
import {colorsPresets} from "../../../styles/colorsPresets.ts";
import TableQuestionComponent from "./TableQuestionComponent.tsx";
import ImageQuestionComponent from "./ImageQuestionComponent.tsx";
import {FormHeader} from "../../FormHeader.tsx";
import AnswerComponent from "../answer/AnswerComponent.tsx";

const reverseQuestionTypeMapping: Record<string, QuestionTypeEnum> = {
  "TEXT": QuestionTypeEnum.TEXT,
  "TABLE": QuestionTypeEnum.TABLE,
  "IMAGE": QuestionTypeEnum.IMAGE,
};

export default function QuestionComponent(
  props: QuestionApiProps) {
  const { question, onAnswerChange } = props;
  const handleAnswerChange = (answer: AnswerApiDto) => {
    if (onAnswerChange) {
      onAnswerChange({questionId: question.id, answer: answer});
    }
  };

  const renderQuestionComponent = (type: QuestionTypeEnum) => {
    switch (type) {
      case QuestionTypeEnum.TEXT:
        return <TextQuestionComponent question={question} />;
      case QuestionTypeEnum.IMAGE:
        return <ImageQuestionComponent question={question} />;
      case QuestionTypeEnum.TABLE:
        return <TableQuestionComponent question={question} onAnswerChange={handleAnswerChange} />;
    }
  }

  const renderAnswerComponent = (type: QuestionTypeEnum) => {
    if (type !== QuestionTypeEnum.TABLE) {
      return <AnswerComponent onAnswerChange={handleAnswerChange} answerType={question.answerType!}/>;
    }
  }

  return (
    <div
      className="my-2 flex flex-col items-stretch border rounded-lg w-full"
      style={{ overflow: 'hidden' }}
    >
      <div className={`p-4 ${colorsPresets.primaryBackground} ${colorsPresets.primaryTextBlack}`}>
        <FormHeader
          color={""}
          label={"Вопрос #"+(props.index!+1)}/>
        <div className="border p-2 mb-2 rounded-lg">
          {renderQuestionComponent(reverseQuestionTypeMapping[question.questionType])}
        </div>
        <hr className="m-2 mb-4"/>
        {renderAnswerComponent(reverseQuestionTypeMapping[question.questionType])}
      </div>
    </div>
);
}