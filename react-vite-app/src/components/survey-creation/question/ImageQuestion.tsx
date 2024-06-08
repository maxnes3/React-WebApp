import './Question.css'

interface ImageQuestionProps {
  text: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
}

export default function ImageQuestion(question: ImageQuestionProps){
  const { text, imageUrl, startDate, endDate } = question;
  return (
    <div>
        <p>{text}</p>
        <img src={imageUrl} alt="Question Image" />
        <p>Start Date: {startDate}</p>
        <p>End Date: {endDate}</p>
    </div>
  );
}