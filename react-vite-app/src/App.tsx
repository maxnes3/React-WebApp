import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SearchTicket} from "./pages/SearchTicket.tsx";
import {Navbar} from "./NavBar.tsx";
import SurveyCreationPage from "./pages/survey/SurveyCreationPage.tsx";
import { SignIn } from "./pages/SignIn.tsx";
import { SignUp } from "./pages/SignUp.tsx";
import { AddTwoFactor } from "./pages/AddTwoFactor.tsx";
import { Favorites } from "./pages/Favorites.tsx";

// Импорт компонентов из React
import { useState } from "react";

// Импорт сервисов
import { localStorageService } from './services/LocalStorageService.ts';
import ProfilePage from "./pages/ProfilePage.tsx";
import SurveysPage from "./pages/survey/SurveysPage.tsx";
import SurveyPage from "./pages/survey/SurveyPage.tsx";

export default function App() {
  const isAuthBoolean = () => {
    const token = localStorageService.getAccessToken();
    if(!token)
        return false;
    return true;
  };

  const getUserRoleFromToken = () => {
    return localStorageService.getUserRoleFromToken()
  }

  const [isAuth, setIsAuth] = useState(isAuthBoolean());
  const [role, setRole] = useState(getUserRoleFromToken)

  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Navbar role={role || "ROLE_USER"} isAuth={isAuth} setIsAuth={setIsAuth} isAuthBoolean={isAuthBoolean}/>
        <Routes>
          <Route path="/" element={<SearchTicket/>}/>
          {role === "ROLE_MODERATOR" && (
            <Route path="/survey-creation" element={<SurveyCreationPage/>}/>
          )}
          {/*{role === "ROLE_OPERATOR" && (
            <Route path="/flight-creation" element={<FlightCreationPage/>}/>
            <Route path="/route-creation" element={<RouteCreationPage/>}/>
          )}*/}
          <Route path="/surveys" element={<SurveysPage/>}/>
          <Route path="/survey/:surveyId" element={<SurveyPage/>}/>
          <Route path="/signin" element={<SignIn setIsAuth={setIsAuth} isAuthBoolean={isAuthBoolean}/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/twofactor" element={<AddTwoFactor/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}