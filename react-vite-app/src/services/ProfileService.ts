import CommonService from "./CommonService.ts";
import axios from "axios";
import {UserProfile} from "../pages/ProfilePage.tsx";

export default class ProfileService extends CommonService {
  static async getProfileData() {
    return await axios.get(`${this.API_URL}/profile`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
      }
    });
  }

  static async updateProfile(profile: UserProfile) {
    console.log(profile)
    await axios.patch(`${this.API_URL}/profile`, profile,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
      }
    });
  }

  static async deleteProfile() {
    await axios.delete(`${this.API_URL}/profile`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
      }
    });
  }

  static async getPassedSurveys(page: number, size = 2) {
    page = page-1;
    return await axios.get(`${this.API_URL}/profile/passedSurveys`, {
      params: {
        page,
        size
      },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
      }
    });
  }

  static async getChildMode() {
    return await axios.get(`${this.API_URL}/profile/child-mode`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
      }
    });
  }
}