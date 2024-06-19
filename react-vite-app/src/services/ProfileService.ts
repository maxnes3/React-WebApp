import CommonService from "./CommonService.ts";
import axios from "axios";
import {UserProfile} from "../pages/ProfilePage.tsx";

export default class ProfileService extends CommonService {
  static async getProfileData() {
    return axios.get(`${this.API_URL}/profile`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
      }
    });
  }

  static async updateProfile(profile: UserProfile) {
    console.log(profile)
    axios.patch(`${this.API_URL}/profile`, profile,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
      }
    });
  }

  static async deleteProfile() {
    axios.delete(`${this.API_URL}/profile`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
      }
    });
  }
}