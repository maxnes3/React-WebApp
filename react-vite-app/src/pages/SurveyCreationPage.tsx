import '../components/survey-creation/Survey.css'
import {SubmitButton} from "../components/SubmitButton.tsx";
import {ChangeEvent, useState} from "react";
import {
  AnswerTypeEnum,
  QuestionTypeEnum,
  AnswerModel, QuestionModel, SurveyModel
} from "../types/Survey.ts";
import QuestionComponent from "../components/survey-creation/question/QuestionComponent.tsx";
import {InputField} from "../components/InputField.tsx";
import {AnimatePresence} from "framer-motion";

export default function SurveyCreationPage() {
  const [survey, setSurvey]
    = useState<SurveyModel>({ title: '', questions: [] });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSurvey({ ...survey, title: e.target.value });
  };

  const addQuestion = () => {
    const answer: AnswerModel = { answerType: AnswerTypeEnum.TEXT, text: "Пример ответа" }
    const newQuestion: QuestionModel = { text: 'Пример вопроса', questionType: QuestionTypeEnum.TEXT, answer: answer };
    setSurvey({ ...survey, questions: [...survey.questions, newQuestion] });
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = survey.questions
      .filter((_, i) => i !== index);
    console.log(index);
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const updateQuestion = (index: number, updatedQuestion: QuestionModel) => {
    const updatedQuestions = survey.questions
      .map((q, i) => (i === index ? updatedQuestion : q));
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const handleSubmit = async () => {
    console.log((survey));
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center mx-4 w-full max-w-2xl">
        <div className="m-2 w-full">
          <InputField id="survey-title"
                      label=""
                      placeholder="Название опроса"
                      value={survey.title}
                      onChange={handleTitleChange}/>
        </div>
        <AnimatePresence>
        {survey.questions.map((question, index) => (

            <div className="m-2 w-full" key={index}>
              <QuestionComponent key={index}
                                 question={question}
                                 onDelete={() => removeQuestion(index)}
                                 onUpdate={(updatedQuestion) => updateQuestion(index, updatedQuestion)}/>
            </div>
        ))}
        </AnimatePresence>
        <div className="m-2">
          <SubmitButton label={'+'}
                        onClick={addQuestion} />
          <SubmitButton label="Создать опрос" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}