import './Question.css'

interface MultipleChoiceQuestionProps {
  text: string;
  subquestions: string[];
  choices: string[];
}

export default function MultipleChoiceQuestion(question: MultipleChoiceQuestionProps){
  const { text, subquestions, choices } = question;
  return (
    <div>
      <p>{text}</p>
      {subquestions.map((subquestion, index) => (
        <div key={index}>
          <input type="checkbox" checked={choices.includes(subquestion)} readOnly />
          <label>{subquestion}</label>
        </div>
      ))}
    </div>
  );
}