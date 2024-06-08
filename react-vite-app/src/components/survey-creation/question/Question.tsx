import './Question.css'
import {QuestionProps, QuestionType} from "../../../types/Survey.ts";
import TextQuestion from './TextQuestion.tsx';


export default function Question(question: QuestionProps) {
  const { questionType } = question;
  return (
    <>
      {() => {
          switch (questionType) {
            case QuestionType.TEXT:
              return <TextQuestion {...question} />;
          }
        }
      }
    </>
  );
}