import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SearchTicket} from "./pages/SearchTicket.tsx";
import {Navbar} from "./NavBar.tsx";
import SurveyCreationPage from "./pages/survey/SurveyCreationPage.tsx";
import {SignIn} from "./pages/SignIn.tsx";
import {SignUp} from "./pages/SignUp.tsx";
import {AddTwoFactor} from "./pages/AddTwoFactor.tsx";
import {Favorites} from "./pages/Favorites.tsx";
import {Tickets} from "./pages/Tickets.tsx";

// Импорт компонентов из React
import {useState} from "react";

// Импорт сервисов
import {localStorageService} from './services/LocalStorageService.ts';
import ProfilePage from "./pages/ProfilePage.tsx";
import SurveysPage from "./pages/survey/SurveysPage.tsx";
import SurveyPage from "./pages/survey/SurveyPage.tsx";
import FlightCreationPage from "./pages/flight/FlightCreationPage.tsx";
import RouteCreationPage from "./pages/flight/RouteCreationPage.tsx";
import {BuyTickets} from "./pages/BuyTickets.tsx";
import ProfileService from "./services/ProfileService.ts";

export default function App() {
  const isAuthBoolean = () => {
    const token = localStorageService.getAccessToken();
    if(!token)
        return false;
    return true;
  };

  const getUserRoleFromToken = () => {
    return localStorageService.getUserRoleFromToken() || ''
  }

  const getChildMode = () => {
    if (localStorageService.getAccessToken())
      return ProfileService.getChildMode();
    else return false
  }

  const [isAuth, setIsAuth] = useState(isAuthBoolean());
  const [role, setRole] = useState(getUserRoleFromToken)
  const [childMode, setChildMode] = useState(getChildMode)
  const [isTwoFactor, setIsTwoFactor] = useState(localStorageService.getIsTwoFactor());

  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Navbar
          role={role || "ROLE_USER"}
          setRole={setRole}
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          isAuthBoolean={isAuthBoolean}
          isTwoFactor={isTwoFactor}
        />
        <Routes>
          <Route
            path="/"
            element={<SearchTicket/>}
          />
          {role === "ROLE_MODERATOR" && (
            <Route
              path="/survey-creation"
              element={<SurveyCreationPage/>}
            />
          )}
          {role === "ROLE_OPERATOR" && (
            <>
              <Route
                path="/flight-creation"
                element={<FlightCreationPage/>}
              />
              <Route
                path="/route-creation"
                element={<RouteCreationPage/>}
              />
            </>
          )}
          <Route
            path="/signin"
            element={
              <SignIn
                setRole={setRole}
                setIsAuth={setIsAuth}
                isAuthBoolean={isAuthBoolean}
                setIsTwoFactor={setIsTwoFactor}
              />
            }
          />
          <Route
            path="/signup"
            element={<SignUp/>}
          />
          <Route
            path="/twofactor"
            element={
              <AddTwoFactor
                setIsTwoFactor={setIsTwoFactor}
              />
            }
          />
          <Route
            path="/favorites"
            element={<Favorites/>}
          />
          <Route
            path="/tickets"
            element={<Tickets />}
          />
          <Route
            path="/buyticket/:flightId"
            element={<BuyTickets childMode={childMode} />}
          />
          <Route
            path="/profile"
            element={<ProfilePage setChildMode={setChildMode} />}
          />
          <Route
            path="/surveys"
            element={<SurveysPage/>}
          />
          <Route
            path="/survey/:surveyId"
            element={<SurveyPage/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}