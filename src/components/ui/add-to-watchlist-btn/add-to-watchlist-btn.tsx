import axiosInstance from '../../../axios/axios-instance';
import { useNavigate } from 'react-router-dom';


type ProtoType = {
  movieID?: any
  tvshowID?: any
}

const AddWatchlistBtn = (props: ProtoType) => {

  const navigate = useNavigate();

  const api_key = localStorage.getItem('api_key');
  const session_id = localStorage.getItem('sessionId');
  const account_id = localStorage.getItem('userID');

  const addToWatchlist = async () => {
    if(session_id){
      if (props?.movieID) {
        const payload = {
          "media_type": "movie",
          "media_id": props?.movieID,
          "watchlist": true
        }
        try {
          const response = await axiosInstance.post(`account/${account_id}/watchlist?api_key=${api_key}&session_id=${session_id}`,payload)
          console.log("Added to",response?.data)
        } catch (error) {
          console.log(error)
        }
      } else if (props?.tvshowID) {
        const payload = {
          "media_type": "tv",
          "media_id": props?.tvshowID,
          "watchlist": true
        }
        try {
          const response = await axiosInstance.post(`account/${account_id}/watchlist?api_key=${api_key}&session_id=${session_id}`,payload)
          console.log(response?.data)
        } catch (error) {
          console.log(error)
        }
      }
    }else {
      alert("You have to login first!")
      navigate('/login');
    }
  }

  return (
    <button className='add-to-watchlist-btn' onClick={() => addToWatchlist()}>Add To Watchlist</button>
  )
}

export default AddWatchlistBtn;
