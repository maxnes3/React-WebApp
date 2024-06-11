import './Question.css'
import {TextArea} from "../../ui/TextArea.tsx";
import {QuestionProps} from "../../../types/Survey.ts";
import {ChangeEvent, useState} from "react";

export default function ImageQuestionComponent(
  props: QuestionProps,){
  const { question, onQuestionChange } = props;
  const [text, setQuestionText]
    = useState(question.text);
  const [image, setImage]
    = useState(question.imageUrl!);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionText(e.target.value);
    onQuestionChange!({...question, text: e.target.value});
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        onQuestionChange!({...question, imageUrl: base64String});
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <TextArea id="question-text"
                label="Содержание вопроса"
                placeholder="Содержание вопроса"
                value={text}
                onChange={handleTextChange}/>
      <div className="mt-2">
        <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">
          Загрузить изображение
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {image && (
        <div className="mt-2">
          <label className="block w-full text-sm font-medium text-gray-700">Предварительный просмотр изображения:</label>
          <img src={image} alt="Предварительный просмотр" className="mt-2 max-w-full mx-auto object-cover object-cover" />
        </div>
      )}
    </div>
);
}