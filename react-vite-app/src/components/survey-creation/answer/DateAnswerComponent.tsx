import './Answer.css'
import {ChangeEvent, useState} from "react";
import {AnswerProps} from "../../../types/Survey.ts";
import {DateField} from "../../DateField.tsx";

export default function DateAnswerComponent(
  props: AnswerProps) {
  const {correctAnswer, onAnswerChange} = props;
  const [startDate, setStartDate]
    = useState(correctAnswer.startDate || '');
  const [endDate, setEndDate]
    = useState(correctAnswer.endDate || '');

  const handleStartDateChange = (e: ChangeEvent<HTMLDataElement>) => {
    setStartDate(e.target.value);
    onAnswerChange!({...correctAnswer, startDate: e.target.value});
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLDataElement>) => {
    setEndDate(e.target.value);
    onAnswerChange!({...correctAnswer, endDate: e.target.value});
  };

  return (
    <div>
      <DateField id="startDate"
                 label="С: "
                 placeholder=""
                 value={startDate!}
                 onChange={handleStartDateChange} />
      <DateField id="endDate"
                 label="По: "
                 placeholder="2024.01.02"
                 value={endDate!}
                 onChange={handleEndDateChange} />
    </div>
  );
}