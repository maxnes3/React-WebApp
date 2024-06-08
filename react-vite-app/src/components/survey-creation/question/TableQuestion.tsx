import './Question.css'

export interface TableQuestionProps {
  text: string;
  subquestions: string[];
  answer: string;
}

export default function TableQuestion(question: TableQuestionProps) {
  const { text, subquestions, answer } = question;
  return (
    <div>
      <p>{text}</p>
      <table>
        <thead>
        <tr>
          {subquestions.map((subquestion, index) => (
            <th key={index}>{subquestion}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        <tr>
          {subquestions.map((subquestion, index) => (
            <td key={index}>{subquestion === answer ? '✔' : ''}</td>
          ))}
        </tr>
        </tbody>
      </table>
    </div>
  );
}