import './Question.css'
import {AnswerModel, QuestionProps, QuestionTypeEnum} from "../../../types/Survey.ts";
import { motion } from 'framer-motion';
import TextQuestionComponent from './TextQuestionComponent.tsx';
import {RemoveButton} from "../../RemoveButton.tsx";
import {ChangeEvent, useState} from "react";
import {colorsPresets} from "../../../styles/colorsPresets.ts";
import TableQuestionComponent from "./TableQuestionComponent.tsx";
import ImageQuestionComponent from "./ImageQuestionComponent.tsx";
import AnswerComponent from "../answer/AnswerComponent.tsx";

const questionTypeMapping = {
  [QuestionTypeEnum.TEXT]: 'TEXT',
  [QuestionTypeEnum.TABLE]: 'TABLE',
  [QuestionTypeEnum.IMAGE]: 'IMAGE',
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
    switch (type) {
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
      questionType: newQuestionType,
      subquestions: undefined,
      imageUrl: undefined
    };
    setQuestion(updatedQuestion);
    onUpdate!(updatedQuestion);
  };

  const updateAnswer = (updatedAnswer: AnswerModel) => {
    const updatedQuestion = { ...question,
      answer: updatedAnswer };
    const updatedQuestion2 = { ...updatedQuestion, answer: updatedAnswer };
    console.log(updatedAnswer);
    console.log(updatedQuestion2);
    setQuestion(updatedQuestion);
    onUpdate!(updatedQuestion);
  };

  return (
    <motion.div
      initial={{x: '-100%', opacity: 0}}
      animate={{x: 0, opacity: 1}}
      exit={{x: '3%', opacity: 0}}
      transition={{duration: 0.5}}
      className="flex flex-col items-stretch border rounded-lg p-4 w-full"
      style={{overflow: 'hidden'}}
    >
      <select
        onChange={handleQuestionTypeChange}
        className={`p-3 mb-2 rounded-md ${colorsPresets.inputBackground} ${colorsPresets.primaryText} 
        border-none focus:outline-none focus:ring-2 ${colorsPresets.buttonFocusRing}
        block w-full`}
      >
        {Object.values(QuestionTypeEnum).map((key) => (
          <option key={key} value={questionTypeMapping[question.questionType]}>
            {key}
          </option>
        ))}
      </select>
      <div className="border p-2 mb-2 rounded-lg">
        {renderQuestionComponent(question.questionType)}
      </div>
      <hr className="m-2 mb-4" />
      <AnswerComponent answer={question.answer} onAnswerChange={(updatedAnswer) => {updateAnswer(updatedAnswer)}}/>
      <RemoveButton label={"x"} onClick={onDelete!} className={"mt-4"}/>
    </motion.div>

  );
}