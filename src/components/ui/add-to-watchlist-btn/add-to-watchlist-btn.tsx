import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../../axios/axios-instance';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

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
      sucessNotify()
    },
    onError: (error: any) => {
      console.log('Error for watchlist', error);
      errorNotify()
    },
  });

  const sucessNotify = () => toast.success("Added To Watchlist");
  const errorNotify = () => toast.error("Failed To Add Into Watchlist");
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
      <Toaster />
    </button>
  );
};

export default AddWatchlistBtn;
