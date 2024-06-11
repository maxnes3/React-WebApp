import '../../components/survey-creation/Survey.css'
import {SubmitButton} from "../../components/ui/SubmitButton.tsx";
import {ChangeEvent, useState} from "react";
import {
  AnswerTypeEnum,
  QuestionTypeEnum,
  AnswerModel, QuestionModel, SurveyModel
} from "../../types/Survey.ts";
import QuestionComponent from "../../components/survey-creation/question/QuestionComponent.tsx";
import {InputField} from "../../components/ui/InputField.tsx";
import {AnimatePresence, motion} from "framer-motion";
import {colorsPresets} from "../../styles/colorsPresets.ts";
import {FormHeader} from "../../components/ui/FormHeader.tsx";
import SurveyModeratorService from "../../services/SurveyService.ts";

export default function SurveyCreationPage() {
  const [survey, setSurvey]
    = useState<SurveyModel>({ title: '', questions: [] });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSurvey({ ...survey, title: e.target.value });
  };

  const addQuestion = () => {
    const answer: AnswerModel = {
      answerType: 'TEXT' as AnswerTypeEnum,
      text: "Пример ответа"
    }
    const newQuestion: QuestionModel = {
      id: new Date().getTime().toString(),
      text: 'Пример вопроса',
      questionType: 'TEXT' as QuestionTypeEnum,
      answer: answer
    };
    setSurvey({ ...survey, questions: [...survey.questions, newQuestion] });
  };

  const removeQuestion = (id: string) => {
    setSurvey((prevSurvey) => {
      const updatedQuestions
        = prevSurvey.questions.filter((_) => _.id !== id);
      return { ...prevSurvey, questions: updatedQuestions };
    });
  };

  const updateQuestion = (id: string, updatedQuestion: QuestionModel) => {
    const updatedQuestions = survey.questions
      .map((q) => (q.id === id ? updatedQuestion : q));
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const handleSubmit = async () => {
    const surveyToSubmit: Omit<SurveyModel, 'questions'> & { questions: Omit<QuestionModel, 'id'>[] } = {
      ...survey,
      questions: survey.questions
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ id, ...rest }) => rest)
    };
    await SurveyModeratorService.create(surveyToSubmit)
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center mx-4 w-full max-w-2xl">
        <div className={`m-2 p-4 rounded-md w-full ${colorsPresets.primaryBackground} ${colorsPresets.primaryText}`}>
          <FormHeader
            label="Название опроса"/>
          <InputField id="survey-title"
                      label=""
                      placeholder="Название опроса"
                      value={survey.title}
                      onChange={handleTitleChange}/>
        </div>
        <AnimatePresence>
          {survey.questions.map((question, index) => {
            return (
              <motion.div
                key={question.id}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0, height: 0}}
                transition={{duration: 0.5}}
                className="m-2 w-full"
              >
                <QuestionComponent
                  key={question.id!}
                  questionKey={index + 1}
                  question={question}
                  onDelete={() => removeQuestion(question.id!)}
                  onQuestionChange={(updatedQuestion) => updateQuestion(question.id!, updatedQuestion)}/>
              </motion.div>
            )
          })}
        </AnimatePresence>
        <div className="m-2 flex ">
          <SubmitButton label='+'
                        onClick={addQuestion}/>
        </div>
        <SubmitButton label="Создать опрос" onClick={handleSubmit}/>
      </div>
    </div>
);
}