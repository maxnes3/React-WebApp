// Импорт страниц из "./pages/"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchTicket } from "./pages/SearchTicket.tsx";
import { Navbar } from "./NavBar.tsx";
import Survey from "./components/survey-creation/Survey.tsx";
import { SignIn } from "./pages/SignIn.tsx";
import { SignUp } from "./pages/SignUp.tsx";
import { AddTwoFactor } from "./pages/AddTwoFactor.tsx";
import { Favorites } from "./pages/Favorites.tsx";

// Импорт компонентов из React
import { useState } from "react";

// Импорт сервисов
import { localStorageService } from './services/LocalStorageService.ts';

export default function App() {
  const isAuthBoolean = () => {
    const token = localStorageService.getAccessToken();
    if(!token)
        return false;
    return true;
  };

  const [isAuth, setIsAuth] = useState(isAuthBoolean());
  
  const [isTwoFactor, setIsTwoFactor] = useState(localStorageService.setIsTwoFactor(false));

  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Navbar 
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
          <Route 
            path="/survey-creation" 
            element={<Survey/>}
          />
          <Route 
            path="/signin" 
            element={
              <SignIn 
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
        </Routes>
      </BrowserRouter>
    </div>
  )
}