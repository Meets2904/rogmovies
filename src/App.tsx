import { Routes, Route} from 'react-router-dom';
import './App.css'
import Navbar from './components/navbar/navbar';
import HomePage from './pages/home-page/home-page';
import './styles/style.css';
import ProfilePage from './pages/profile-page/profile-page';
import LoginPage from './pages/login-page/login-page';

function App() {
  // const location = useLocation();

  return (
    <>
      
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/login' element={<LoginPage/>} />
      </Routes>
    </>
  )
}

export default App
