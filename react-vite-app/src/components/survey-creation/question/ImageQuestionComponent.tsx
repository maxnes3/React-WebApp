import './Question.css'

export type ImageQuestionModel = {
  text: string;
  imageUrl?: string;
  startDate?: string;
  endDate?: string;
}

export interface ImageQuestionProps {
  question: ImageQuestionModel;
}

export default function ImageQuestionComponent(
  props: ImageQuestionProps){
  const { text, imageUrl, startDate, endDate } = props.question;
  return (
    <div>
        <p>{text}</p>
        <img src={imageUrl} alt="QuestionComponent Image" />
        <p>Start Date: {startDate}</p>
        <p>End Date: {endDate}</p>
    </div>
  );
}