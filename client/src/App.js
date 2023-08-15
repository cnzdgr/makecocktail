import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Builder from './pages/Builder';
import AllPage from './pages/AllPage';
import FavoritesPage from "./pages/FavoritesPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AddDrink from "./pages/AddDrink";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PopularPage from "./pages/PopularPage";
import DrinkPage from "./pages/DrinkPage";
import LogoutPage from './pages/LogoutPage';
import ErrorPage from "./pages/ErrorPage";


function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
    <BrowserRouter >
    <Navbar/>
    <div className="mb-auto" >
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/builder" element={<Builder/>}/>
          <Route path="/all" element={<AllPage />}/>
          <Route path="/favorites" element={<FavoritesPage />}/>
          <Route path="/popular" element={<PopularPage />}/>
          <Route path="/signin" element={<SignInPage />}/>
          <Route path="/signup" element={<SignUpPage />}/>
          <Route path="/adddrink" element={<AddDrink/>}/>
          <Route path="/changepassword" element={<ChangePasswordPage />}/>
          <Route path="/ForgotPassword" element={<ForgotPasswordPage />}/>
          <Route path="/favorites" element={<FavoritesPage />}/>
          <Route path="/all/:drinkName" element={<DrinkPage />} />
          <Route path="/logout" element={<LogoutPage/>}/>
          <Route path='*' element={<ErrorPage />}/>
        </Routes>
      </div>
      <Footer/>
      </BrowserRouter>
      </div>
  );
}

export default App;
