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
      this.removeUndefinedFields(survey),{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
      }
    })
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
              },
              headers: {
                'Authorization': `Bearer ${localStorage.getItem("access")}`,
              }});
  }

  static async search(page: number, size = 5, search: string) {
    page = page-1;
    return axios.get(`${this.API_URL}/surveys/search`,
      {params: {search, page, size},
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access")}`,
        }});
  }

  static async getSurvey(surveyId: string) {
    return axios.get(`${this.API_URL}/surveys/${surveyId}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access")}`,
        }
      });
  }
}