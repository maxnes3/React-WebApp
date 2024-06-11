import './Question.css'
import {AnswerModel, QuestionProps, QuestionTypeEnum} from "../../../types/Survey.ts";
import TextQuestionComponent from './TextQuestionComponent.tsx';
import {RemoveButton} from "../../ui/RemoveButton.tsx";
import {ChangeEvent, useState} from "react";
import {colorsPresets} from "../../../styles/colorsPresets.ts";
import TableQuestionComponent from "./TableQuestionComponent.tsx";
import ImageQuestionComponent from "./ImageQuestionComponent.tsx";
import AnswerComponent from "../answer/AnswerComponent.tsx";
import {FormHeader} from "../../ui/FormHeader.tsx";
import { motion } from 'framer-motion';

const questionTypeMapping: Record<QuestionTypeEnum, string> = {
  [QuestionTypeEnum.TEXT]: 'TEXT',
  [QuestionTypeEnum.TABLE]: 'TABLE',
  [QuestionTypeEnum.IMAGE]: 'IMAGE',
};

const reverseQuestionTypeMapping: Record<string, QuestionTypeEnum> = {
  TEXT: QuestionTypeEnum.TEXT,
  TABLE: QuestionTypeEnum.TABLE,
  IMAGE: QuestionTypeEnum.IMAGE,
};

export default function QuestionComponent(
  props: QuestionProps) {
  const [question, setQuestion] = useState(props.question);
  const onDelete = props.onDelete;
  const onUpdate = props.onQuestionChange;

  const handleQuestionChange = (updatedQuestion: typeof props.question) => {
    setQuestion(updatedQuestion);
    onUpdate!(updatedQuestion);
  };

  const renderQuestionComponent = (type: QuestionTypeEnum) => {
    switch (reverseQuestionTypeMapping[type]) {
      case QuestionTypeEnum.TEXT:
        return <TextQuestionComponent question={props.question} onQuestionChange={handleQuestionChange} />;
      case QuestionTypeEnum.IMAGE:
        return <ImageQuestionComponent question={props.question} onQuestionChange={handleQuestionChange} />;
      case QuestionTypeEnum.TABLE:
        return <TableQuestionComponent question={props.question} onQuestionChange={handleQuestionChange} />;
    }
  }

  const handleQuestionTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newQuestionType = e.target.value as QuestionTypeEnum;
    const updatedQuestion = {...question,
      questionType: questionTypeMapping[newQuestionType] as QuestionTypeEnum ,
      subquestions: undefined,
      imageUrl: undefined
    };
    setQuestion(updatedQuestion);
    onUpdate!(updatedQuestion);
  };

  const updateAnswer = (updatedAnswer: AnswerModel) => {
    const updatedQuestion = { ...question,
      answer: updatedAnswer };
    setQuestion(updatedQuestion);
    onUpdate!(updatedQuestion);
  };

  return (
    <motion.div
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '3%', opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="my-2 flex flex-col items-stretch border rounded-lg w-full"
      style={{ overflow: 'hidden' }}
    >
      <div className={`p-4 ${colorsPresets.primaryBackground} ${colorsPresets.primaryText}`}>
        <FormHeader
          label={"Вопрос #"+props.questionKey!.toString()}/>
        <select
          onChange={handleQuestionTypeChange}
          className={`p-3 mb-2 rounded-md ${colorsPresets.inputBackground} ${colorsPresets.primaryText} 
        border-none focus:outline-none focus:ring-2 ${colorsPresets.buttonFocusRing}
        block w-full`}
        >
          {Object.values(QuestionTypeEnum).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <div className="border p-2 mb-2 rounded-lg">
          {renderQuestionComponent(question.questionType)}
        </div>
        <hr className="m-2 mb-4"/>
        <AnswerComponent answer={question.answer} onAnswerChange={(updatedAnswer) => {
          updateAnswer(updatedAnswer)
        }}/>
        <RemoveButton label={"x"} onClick={onDelete!} className={"mt-4"}/>
      </div>
    </motion.div>
);
}