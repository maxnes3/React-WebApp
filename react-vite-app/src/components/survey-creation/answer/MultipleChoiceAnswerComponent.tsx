import './Answer.css'
import {InputField} from "../../ui/InputField.tsx";
import {useEffect, useState} from "react";
import {AnswerProps} from "../../../types/Survey.ts";
import {SubmitButton} from "../../ui/SubmitButton.tsx";

export default function MultipleChoiceAnswerComponent(
  props: AnswerProps) {
  const {correctAnswer, onAnswerChange} = props;
  const [choices, setChoices]
    = useState(correctAnswer.choices || [''])

  useEffect(() => {
    setChoices(correctAnswer.choices || ['']);
  }, [correctAnswer]);

  const handleInputChange = (index: number, value: string) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
    onAnswerChange!({ ...correctAnswer, choices: newChoices });
  };

  const addRow = () => {
    if (choices.length < 9) {
      setChoices([...choices, '']);
      onAnswerChange!({...correctAnswer, choices: [...choices, '']});
    }
  };

  const removeRow = () => {
    if (choices.length > 1) {
      const newChoices = choices.slice(0, -1);
      setChoices(newChoices);
      onAnswerChange!({ ...correctAnswer, choices: newChoices });
    }
  };

  return (
    <div>
      <div className="my-2 flex flex-col items-center w-full">
        <div className="justify-around flex w-full">
          <div className="flex flex-col">
            <SubmitButton label={"+ строка"} onClick={addRow} />
            <div className="m-1"></div>
            <SubmitButton label={"- строка"} onClick={removeRow} />
          </div>
        </div>
        <table className="w-full">
          <tbody>
          {choices.map((choice, rowIndex) => (
            <tr key={rowIndex}>
              <td className="p-1 pb-0">
                <InputField
                  id={rowIndex.toString()}
                  label=""
                  value={choice}
                  onChange={(e) => handleInputChange(rowIndex, e.target.value)}
                  placeholder="Введите вариант ответа"
                />
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}