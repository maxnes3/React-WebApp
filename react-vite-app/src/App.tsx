// Импорт страниц из "./pages/"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchTicket } from "./pages/SearchTicket.tsx";
import { Navbar } from "./NavBar.tsx";
import Survey from "./components/survey-creation/Survey.tsx";
import { SignIn } from "./pages/SignIn.tsx";
import { SignUp } from "./pages/SignUp.tsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchTicket/>}/> 
          <Route path="/survey-creation" element={<Survey/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}