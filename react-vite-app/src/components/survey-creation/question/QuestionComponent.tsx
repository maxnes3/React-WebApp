import './Question.css'
import {AnswerModel, QuestionProps, QuestionTypeEnum} from "../../../types/Survey.ts";
import { motion } from 'framer-motion';
import TextQuestionComponent from './TextQuestionComponent.tsx';
import {RemoveButton} from "../../RemoveButton.tsx";
import {ChangeEvent} from "react";
import {colorsPresets} from "../../../styles/colorsPresets.ts";
import MultipleChoiceQuestionComponent from "./MultipleChoiceQuestionComponent.tsx";
import TableQuestionComponent from "./TableQuestionComponent.tsx";
import ImageQuestionComponent from "./ImageQuestionComponent.tsx";
import AnswerComponent from "../answer/AnswerComponent.tsx";


export default function QuestionComponent(
  props: QuestionProps) {
  const question = props.question;
  const onDelete = props.onDelete;
  const onUpdate = props.onUpdate;

  const renderQuestionComponent = (type: QuestionTypeEnum) => {
    switch (type) {
      case QuestionTypeEnum.TEXT:
        return <TextQuestionComponent question={props.question} />;
      case QuestionTypeEnum.IMAGE:
        return <ImageQuestionComponent question={props.question} />;
      case QuestionTypeEnum.TABLE:
        return <TableQuestionComponent question={props.question} />;
      case QuestionTypeEnum.MULTIPLE_CHOICE:
        return <MultipleChoiceQuestionComponent question={props.question} />;
    }
  }

  const handleQuestionTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newQuestionType = e.target.value as QuestionTypeEnum;
    onUpdate!({ ...question, questionType: newQuestionType });
  };

  const handleAnswerTypeChange = (updatedAnswer: AnswerModel) => {
    onUpdate!({ ...question, answer: updatedAnswer });
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
        value={question.questionType}
        onChange={handleQuestionTypeChange}
        className={`p-3 rounded-md ${colorsPresets.inputBackground} ${colorsPresets.primaryText} 
        border-none focus:outline-none focus:ring-2 ${colorsPresets.buttonFocusRing}
        block w-full`}
      >
        {Object.values(QuestionTypeEnum).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      {renderQuestionComponent(question.questionType)}
      <hr className="m-2 mb-4" />
      <AnswerComponent answer={question.answer} onUpdate={handleAnswerTypeChange}/>
      <RemoveButton label={"x"} onClick={onDelete!} className={"mt-4"}/>
    </motion.div>

  );
}