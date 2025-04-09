// import React from 'react'
import { useQuery } from '@tanstack/react-query';
import '../../styles/profile-page/profile-page.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/axios-instance';

type UserData = {
  username: string | number;
  userID: number;
  name: string;
}


const ProfilePage = () => {

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  }
  const session_id = localStorage.getItem("sessionId")
  const api_key = localStorage.getItem("api_key")

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
      console.log(error)
    }
  }

  const { data: user } = useQuery({
    queryKey: ['userAccountDetails'],
    queryFn: fetchUserDetails,
  })

  console.log(user)

  return (
    <section className='profile-section-container container'>
      <div className='profile-card'>
        <div className='profile-avatar'><img src="../../../src/assets/images/avatar.jpg" alt="" /></div>
        <h6>Username:- <span>{user?.username}</span></h6>
        <h6>UserID:- <span>{user?.userID}</span></h6>
        <h6>Name:- <span>{user?.name}</span></h6>
        <button className='log-out-btn' onClick={handleLogOut}>LogOut</button>
      </div>
    </section>
  )
}

export default ProfilePage
