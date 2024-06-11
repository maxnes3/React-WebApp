import axios from "axios";
import CommonService from "./CommonService.ts";
import {SurveyModel} from "../types/Survey.ts";

export default class SurveyModeratorService extends CommonService{
  static async create(survey: SurveyModel) {
    console.log(JSON.stringify(survey))
    axios.post(`${this.API_URL}/moderator/surveys`,
      survey
    )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Ошибка создания опроса:', error);
      });
  }
}