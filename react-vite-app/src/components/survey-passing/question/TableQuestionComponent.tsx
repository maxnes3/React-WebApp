import {TableQuestionApiProps} from '../../../types/Survey.ts';
import '../Survey.css'
import {useState} from "react";

export default function TableQuestionComponent(
  props: TableQuestionApiProps) {
  const { question, onAnswerChange } = props;
  const columns = question.subquestions ?
    (question.subquestions.length % 3 === 0 ? 3
      : question.subquestions.length % 2 === 0 ? 2 : 1)
      : 1;

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const handleCellClick = (subquestionId: number) => {
    const newSelectedAnswers = selectedAnswers.includes(subquestionId)
      ? selectedAnswers.filter(id => id !== subquestionId)
      : [...selectedAnswers, subquestionId];

    setSelectedAnswers(newSelectedAnswers);
    if (onAnswerChange) {
      onAnswerChange({ answerType: "MULTIPLE_CHOICE", choices: newSelectedAnswers });
    }
  };

  return (
    <div className="table-question-component">
      <h1>{question.text}</h1>
      <div className={`table-container columns-${columns}`}>
        <table className="custom-table">
          <thead>
          </thead>
          <tbody>
          {Array(Math.ceil(question.subquestions!.length / columns)).fill('').map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array(columns).fill('').map((_, colIndex) => {
                const questionIndex = rowIndex * columns + colIndex;
                return questionIndex < question.subquestions!.length ? (
                  <td
                    key={colIndex}
                    className={`table-cell ${selectedAnswers.includes(question.subquestions![questionIndex].id) ? 'selected' : ''}`}
                    onClick={() => handleCellClick(question.subquestions![questionIndex].id)}
                  >
                    {question.subquestions![questionIndex].text}
                  </td>
                ) : <td key={colIndex}></td>;
              })}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
