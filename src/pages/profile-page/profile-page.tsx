// import React from 'react'
import { useQuery } from '@tanstack/react-query';
import '../../styles/profile-page/profile-page.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/axios-instance';
import ProfileSkeleton from '../../components/ui/profile-skeleton/profile-skeleton';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

type UserData = {
  username: string | number;
  userID: number;
  name: string;
}


const ProfilePage = () => {

  const [imageLoading, setImageLoading] = useState(true)
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
    toast.success("LogOut Successfull");
  }
  const session_id = localStorage.getItem("sessionId")
  const api_key = localStorage.getItem("api_key")

  // Function to fetch user details
  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get(`account/null?api_key=${api_key}&session_id=${session_id}`)
      const data = response?.data
      const user: UserData = {
        username: data?.username,
        userID: data?.id,
        name: data?.name,
      }
      return user;
    } catch (error) {
      console.error(error)
    }
  }

  // React Query For UserDetails
  const { data: user, isLoading } = useQuery({
    queryKey: ['userAccountDetails'],
    queryFn: fetchUserDetails,
  })

  const userID: number = user?.userID as number
  localStorage.setItem('userID', String(userID));

  // Image Loading Handler
  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageLoading(false)
  }

  return (
    <section className='profile-section-container container'>
      {isLoading && <ProfileSkeleton />}
      <div className='profile-card'>
        <div className='profile-avatar'>
          {imageLoading && <div style={{ position: 'absolute', top: "40%", right: "40%" }}><CircularProgress /></div>}
          <img src="/avatar.jpg" onLoad={handleImageLoad} onError={handleImageError} alt="" />
        </div>
        {!isLoading && <h6>Username:- <span>{user?.username}</span></h6>}
        {!isLoading && <h6>UserID:- <span>{user?.userID}</span></h6>}
        {!isLoading && <h6>Name:- <span>{user?.name}</span></h6>}
        {!isLoading && <button className='log-out-btn' onClick={handleLogOut}>LogOut <Toaster /></button>}
      </div>
    </section>
  )
}

export default ProfilePage
