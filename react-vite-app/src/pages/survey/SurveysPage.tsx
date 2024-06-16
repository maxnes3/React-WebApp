import '../../components/survey-creation/Survey.css'
import {colorsPresets} from "../../styles/colorsPresets.ts";
import {FormHeader} from "../../components/FormHeader.tsx";
import {InputField} from "../../components/InputField.tsx";
import {SurveyDto} from "../../types/Survey.ts";
import {ChangeEvent, useEffect, useState} from "react";
import SurveyService from "../../services/SurveyService.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {SubmitButton} from "../../components/SubmitButton.tsx";
import SurveyCardComponent from "../../components/surveys/SurveyCardComponent.tsx";
import {AxiosResponse} from "axios";

export default function SurveysPage() {
  const [surveys, setSurveys] = useState<SurveyDto[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchSurveys = async (page: number) => {
    try{
      const response = await SurveyService.getSurveysPage(page)
      setList(response)
    } catch (error) {
      console.error('Ошибка поиска опросов:', error);
    }
  };

  const searchSurveys = async (page: number, count: number, search: string) => {
    try {
      const response = await SurveyService.search(page, count, search);
      console.log(response.data);
      setList(response)
    } catch (error) {
      console.error('Ошибка поиска опросов:', error);
    }
  };

  const setList = (response: AxiosResponse<any, any>) => {
    setSurveys(response.data.content);
    setTotalPages(response.data.totalPages);
  }
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    const page = parseInt(params.get('page') || '1', 10);

    setSearchTerm(search);
    setCurrentPage(page);

    if (search === null || search === '') {
      fetchSurveys(page)
    } 
  }, [location.search]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    console.log('поиск');
    navigate(`?search=${searchTerm}`);
    const page = 1
    setCurrentPage(page);
    searchSurveys(page, 5, searchTerm);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > totalPages || newPage < 1) return
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    params.set('page', newPage.toString());
    navigate({ search: params.toString() });
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center mx-4 w-full max-w-2xl">
        <div className={`m-2 p-4 rounded-md w-full ${colorsPresets.primaryBackground} ${colorsPresets.primaryTextWhite}`}>
          <FormHeader
            label="Поиск опроса" color={""}/>
          <div className="flex items-center">
            <InputField id="survey-title"
                        label=""
                        placeholder="Я жду..."
                        value={searchTerm}
                        onChange={handleSearchChange}/>
            <div className="h-full ml-2 mt-2">
              <SubmitButton onClick={handleSearchSubmit}
                            label="Поиск"/>
            </div>
          </div>
        </div>

        {surveys.map((survey) => (
          <SurveyCardComponent key={survey.id} survey={survey} />
        ))}

        <div className="flex justify-between mt-2 items-center">
          <SubmitButton onClick={() => handlePageChange(currentPage - 1)}
                        label="Предыдущая"/>
          <span className="px-4 py-2">{`Страница ${currentPage} из ${totalPages}`}</span>
          <SubmitButton onClick={() => handlePageChange(currentPage + 1)}
                        label="Следующая"/>
        </div>
      </div>
    </div>
  );
}