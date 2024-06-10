import {ChangeEvent, useState} from 'react';
import { QuestionProps } from '../../../types/Survey.ts';
import {InputField} from "../../InputField.tsx";
import {SubmitButton} from "../../SubmitButton.tsx";
import {TextArea} from "../../TextArea.tsx";

export default function TableQuestionComponent(
  props: QuestionProps) {
  const { question, onQuestionChange } = props;
  const [rows, setRows]
    = useState(2);
  const [cols, setCols]
    = useState(2);
  const [text, setText]
    = useState(question.text);
  const [subquestions, setSubquestions]
    = useState(['', '', '', '']);

  const handleInputChange = (index: number, value: string) => {
    const newSubquestions = [...subquestions!];
    newSubquestions[index] = value;
    setSubquestions(newSubquestions);
    onQuestionChange!({...question, subquestions: newSubquestions});
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onQuestionChange!({...question, text: e.target.value});
  };

  const addRow = () => {
    setRows(rows + 1);
    setSubquestions([...subquestions!, ...Array(cols).fill('')]);
  };

  const removeRow = () => {
    if (rows > 1) {
      setRows(rows - 1);
      setSubquestions(subquestions!.slice(0, -cols));
    }
  };

  const addCol = () => {
    setCols(cols + 1);
    const newSubquestions = [];
    for (let i = 0; i < rows; i++) {
      newSubquestions.push(...subquestions!.slice(i * cols, (i + 1) * cols), '');
    }
    setSubquestions(newSubquestions);
  };

  const removeCol = () => {
    if (cols > 1) {
      setCols(cols - 1);
      const newSubquestions = [];
      for (let i = 0; i < rows; i++) {
        newSubquestions.push(...subquestions!.slice(i * cols, (i + 1) * cols - 1));
      }
      setSubquestions(newSubquestions);
    }
  };

  return (
    <div>
      <TextArea id="question-text"
                label="Содержание вопроса"
                placeholder="Содержание вопроса"
                value={text}
                onChange={handleTextChange}/>
      <div className="my-2 flex flex-col items-center w-full">
        <div className="justify-around flex w-full">
          <div className="flex flex-col">
            <SubmitButton label={"+ строка"} onClick={addRow} />
            <div className="m-1"></div>
            <SubmitButton label={"- строка"} onClick={removeRow} />
          </div>
          <div className="flex flex-col">
            <SubmitButton label={"+ столбец"} onClick={addCol} />
            <div className="m-1"></div>
            <SubmitButton label={"- столбец"} onClick={removeCol} />
          </div>
        </div>
        <table className="w-full">
          <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: cols }).map((_, colIndex) => {
                const index = rowIndex * cols + colIndex;
                return (
                  <td key={colIndex} className="p-1 pb-0">
                    <InputField
                      id={(colIndex+rowIndex).toString()}
                      label={""}
                      value={subquestions![index]}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder={"Введите вариант ответа"}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
