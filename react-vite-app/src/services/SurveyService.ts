import axios from "axios";
import CommonService from "./CommonService.ts";
import {SurveyModel} from "../types/Survey.ts";

export default class SurveyService extends CommonService{
  static removeUndefinedFields = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(this.removeUndefinedFields);
    } else if (obj !== null && typeof obj === 'object') {
      return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = this.removeUndefinedFields(value);
        }
        return acc;
      }, {} as any);
    }
    return obj;
  };


  static async create(survey: SurveyModel) {
    axios.post(`${this.API_URL}/moderator/surveys`,
      this.removeUndefinedFields(survey)
    )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Ошибка создания опроса:', error);
      });
  }

  static async getSurveysPage(page: number, size = 5) {
    page = page-1;
    return axios.get(`${this.API_URL}/surveys`,
        {params: {
                  page,
                  size
              }});
  }

  static async search(page: number, size = 5, search: string) {
    page = page-1;
    return axios.get(`${this.API_URL}/surveys/search`,
      {params: {search, page, size}});
  }

  static async getSurvey(surveyId: string) {
    return axios.get(`${this.API_URL}/surveys/${surveyId}`);
  }
}