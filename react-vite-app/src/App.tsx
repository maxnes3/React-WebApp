import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SearchTicket} from "./pages/SearchTicket.tsx";
import {Navbar} from "./NavBar.tsx";
import Survey from "./components/survey-creation/Survey.tsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchTicket/>}/>
          <Route path="/survey-creation" element={<Survey/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}