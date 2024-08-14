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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Navbar />
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
              <SignIn />
            }
          />
          <Route 
            path="/signup" 
            element={<SignUp/>}
          />
          <Route 
            path="/twofactor" 
            element={
              <AddTwoFactor />
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
              <BuyTickets />
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