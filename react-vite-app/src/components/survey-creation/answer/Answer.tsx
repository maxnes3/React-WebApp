import './Answer.css'
import {AnswerProps, AnswerType} from "../../../types/Survey.ts";
import TextAnswer from './TextAnswer.tsx'

export default function Answer(answer: AnswerProps) {
  const { answerType } = answer;
  return (
    <>
      {
        () => {
          switch (answerType) {
            case AnswerType.TEXT:
              return <TextAnswer {...answer} />;
          }
        }
      }
    </>
  );
}