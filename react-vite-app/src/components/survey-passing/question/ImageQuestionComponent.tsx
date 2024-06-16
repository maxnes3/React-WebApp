import './Question.css'
import {QuestionApiProps} from "../../../types/Survey.ts";

export default function ImageQuestionComponent(
  props: QuestionApiProps,){
  const { question } = props;
  return (
    <div className="flex flex-col w-full">
      <h1>{question.text}</h1>
      <div className="mt-2">
        <div className="mt-2">
          <label className="block w-full text-sm font-medium text-gray-700">Предварительный просмотр
            изображения:</label>
          <img src={"data:image/png;base64,"+question.imageUrl} alt="Предварительный просмотр"
               className="mt-2 max-w-full mx-auto object-cover object-cover"/>
        </div>
      </div>
    </div>
);
}