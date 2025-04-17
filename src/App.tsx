import { Outlet } from 'react-router-dom';
import './App.css'
import Navbar from './components/navbar/navbar';
import './styles/style.css';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from './axios/axios-instance';
function App() {

  const getSessionID = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const URL_Request_Token_Approved = urlParams.get('request_token');
    const api_key = localStorage.getItem("api_key")

    console.log("url_request_token", URL_Request_Token_Approved)
    if (URL_Request_Token_Approved) {
      const payload = {
        URL_Request_Token_Approved: URL_Request_Token_Approved,
      }
      try {
        const response = await axiosInstance.post(`/authentication/session/new?api_key=${api_key}&request_token=${payload?.URL_Request_Token_Approved}`)
        console.log("Session response", response?.data.session_id)
        if (response?.data.session_id) {
          window.location.reload();
          localStorage.setItem("sessionId", response?.data.session_id)
        } else {
          console.log("Failed to get session Id")
        }
      } catch (error) {
        console.log(error)
      }
    }

  }

  const { } = useQuery({
    queryKey: ['getSessionID'],
    queryFn: getSessionID,
  })


  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
