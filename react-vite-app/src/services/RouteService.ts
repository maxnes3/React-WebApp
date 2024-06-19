import CommonService from "./CommonService.ts";
import axios from "axios";
import {NewRouteDto} from "../types/Route.ts";

export default class RouteService extends CommonService{
  static async create(route: NewRouteDto) {
    await axios.post(`${this.API_URL}/operator/routes`,
      route,
      {
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

  static async getRoutes() {
    const response =
      await axios.get(`${this.API_URL}/operator/routes`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("access")}`,
          }});
    return response.data;
  }
}