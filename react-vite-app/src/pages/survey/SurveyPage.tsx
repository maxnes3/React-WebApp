import {useEffect, useState} from "react";
import {colorsPresets} from "../../styles/colorsPresets.ts";
import {AnswerPassingModel, SurveyApiDto, SurveyPassingModel} from "../../types/Survey.ts";
import {FormHeader} from "../../components/FormHeader.tsx";
import QuestionComponent from "../../components/survey-passing/question/QuestionComponent.tsx";
import {SubmitButton} from "../../components/SubmitButton.tsx";
import {useParams} from "react-router-dom";
import SurveyService from "../../services/SurveyService.ts";

export default function SurveyPage() {
  const { surveyId } = useParams<{ surveyId: string }>();
  const [survey, setSurvey] = useState<SurveyApiDto | null>(null);
  const [surveyPassing, setSurveyPassing] = useState<SurveyPassingModel>({id: 0, answers: []});

  const getSurvey = async (surveyId: string) => {
    const response = await SurveyService.getSurvey(surveyId!);
    const foundSurvey = response.data;
    if (foundSurvey) {
      setSurvey(foundSurvey);
      setSurveyPassing({...surveyPassing, id: foundSurvey.id});
    }
  }

  useEffect(() => {
    getSurvey(surveyId!)
  }, [surveyId]);

  if (!survey) {
    return (<h1>Loading...</h1>);
  }

  const handleSubmit = () => {
    SurveyService.passSurvey(surveyPassing)
  }

  const handleAnswerChange = (answer: AnswerPassingModel) => {
    setSurveyPassing(prevState => ({
      ...prevState,
      answers: {
        ...prevState.answers,
        [answer.questionId]: answer
      }
    }));
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center mx-4 w-full max-w-2xl">
        <div className={`m-2 p-4 rounded-md w-full ${colorsPresets.primaryBackground} ${colorsPresets.primaryTextBlack}`}>
          <FormHeader
            label={survey?.title} color={""}/>
        </div>
        {survey.questions.map((question, index) => {
          return (
            <div
              key={question.id}
              className="m-2 w-full"
            >
              <QuestionComponent
                key={question.id}
                question={question}
                index={index}
                onAnswerChange={handleAnswerChange}/>
            </div>
          )
        })}
        <div className={`m-2 flex ${colorsPresets.primaryBackground}`}>
          <SubmitButton label="Отправить" onClick={handleSubmit}/>
        </div>
      </div>
    </div>
  );
}