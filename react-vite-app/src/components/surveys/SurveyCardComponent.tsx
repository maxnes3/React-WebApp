import {useState} from "react";
import {SurveyDtoProps} from "../../types/Survey.ts";
import {colorsPresets} from "../../styles/colorsPresets.ts";
import {useNavigate} from "react-router-dom";

export default function SurveyCardComponent(
  props: SurveyDtoProps
) {
  const [survey] = useState(props.survey);

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/survey/${survey.id}`);
  };

  return (
    <div onClick={handleCardClick} className={`border p-4 mb-4 rounded-lg w-full transition-all duration-300 
                    ${colorsPresets.primaryBackground} ${colorsPresets.primaryText} 
                    hover:bg-notActiveCyan`}>
      <h2 className={`text-xl font-bold ${colorsPresets.primaryHeaderText}`}>{props.survey.title}</h2>
      <p><strong>Вопросов:</strong> {survey.numOfQuestions}</p>
    </div>
  );
}