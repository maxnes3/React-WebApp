// Импорт страниц из "./pages/"
import { SearchTicket } from "./pages/SearchTicket.tsx";
import { Navbar } from "./NavBar.tsx";
import Survey from "./components/survey-creation/Survey.tsx";
import { SignIn } from "./pages/SignIn.tsx";
import { SignUp } from "./pages/SignUp.tsx";
import { AddTwoFactor } from "./pages/AddTwoFactor.tsx";
import { Favorites } from "./pages/Favorites.tsx";
import { Tickets } from "./pages/Tickets.tsx";
import { BuyTickets } from "./pages/BuyTickets.tsx";
import { ShareTicket } from "./pages/ShareTicket.tsx";

// Импорт компонентов из React
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  
  const [isTwoFactor, setIsTwoFactor] = useState(localStorageService.getIsTwoFactor());

  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Navbar 
          isAuth={isAuth} 
          setIsAuth={setIsAuth} 
          isAuthBoolean={isAuthBoolean}
          isTwoFactor={isTwoFactor}
          setIsTwoFactor={setIsTwoFactor}
        />
        <Routes>
          <Route 
            path="/" 
            element={<SearchTicket />}
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
            element={<Favorites />}
          />
          <Route 
            path="/tickets"
            element={<Tickets />}
          />
          <Route 
            path="/buyticket/:flightId"
            element={
              <BuyTickets 
                isAuth={isAuth}
              />
            }
          />
          <Route
            path="/share-ticket/:ticketNumber"
            element={<ShareTicket />}
          />
        </Routes>
        <ToastContainer
          position="bottom-right"
        />
      </BrowserRouter>
    </div>
  )
}