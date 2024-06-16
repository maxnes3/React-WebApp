import './Answer.css'
import {ChangeEvent, useState} from "react";
import {DateField} from "../../DateField.tsx";
import {AnswerApiProps} from "../../../types/Survey.ts";

export default function DateAnswerComponent(
  props: AnswerApiProps) {
  const {answerType, onAnswerChange} = props;
  const [startDate, setStartDate]
    = useState('');
  const [endDate, setEndDate]
    = useState('');

  const handleStartDateChange = (e: ChangeEvent<HTMLDataElement>) => {
    const value = e.target.value;
    setStartDate(value);
    if (onAnswerChange) {
      onAnswerChange({answerType: answerType, startDate: value, endDate});
    }
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLDataElement>) => {
    const value = e.target.value;
    setEndDate(e.target.value);
    if (onAnswerChange) {
      onAnswerChange({answerType: answerType, startDate, endDate: value});
    }
  };


  return (
    <div>
      <DateField id="startDate"
                 key={1}
                 label="С: "
                 placeholder=""
                 value={startDate!}
                 onChange={handleStartDateChange} />
      <DateField id="endDate"
                 key={2}
                 label="По: "
                 placeholder=""
                 value={endDate!}
                 onChange={handleEndDateChange} />
    </div>
  );
}