import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../../axios/axios-instance';
import { useNavigate } from 'react-router-dom';

type ProtoType = {
  movieID?: any;
  tvshowID?: any;
};

const AddWatchlistBtn = (props: ProtoType) => {
  const navigate = useNavigate();
  const api_key = localStorage.getItem('api_key');
  const session_id = localStorage.getItem('sessionId');
  const account_id = localStorage.getItem('userID');

  const addWatchlistMutation = useMutation({
    mutationFn: async (mediaID: any) => {
      const mediaType = props?.movieID ? 'movie' : 'tv';
      const payload = {
        media_type: mediaType,
        media_id: mediaID,
        watchlist: true,
      };

      if (!session_id) {
        throw new Error('Login First');
      }

      const response = await axiosInstance.post(
        `account/${account_id}/watchlist?api_key=${api_key}&session_id=${session_id}`,
        payload
      );
      return response?.data;
    },
    onSuccess: (data: any) => {
      console.log('Added to watchlist', data);
    },
    onError: (error: any) => {
      console.log('Error for watchlist', error);
    },
  });

  const addToWatchlist = () => {
    if (!session_id) {
      alert('You have to login first!');
      navigate('/login');
      return;
    }

    const mediaID = props?.movieID || props?.tvshowID;
    if (mediaID) {
      addWatchlistMutation.mutate(mediaID);
    }
  };

  return (
    <button
      className="add-to-watchlist-btn"
      onClick={addToWatchlist}
    >
      Add To Watchlist
    </button>
  );
};

export default AddWatchlistBtn;
