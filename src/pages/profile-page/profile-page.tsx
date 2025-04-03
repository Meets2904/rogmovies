// import React from 'react'
import '../../styles/profile-page/profile_page.css';
import { useNavigate } from 'react-router-dom';



const ProfilePage = () => {

    const navigate = useNavigate();

const handleLogOut = () => {
    navigate('/');
}

  return (
    <section className='profile-section-container container'>
            <div className='profile-card'>
                <div className='profile-avatar'><img src="../../../src/assets/images/avatar.jpg" alt="" /></div>
                <h6>Username:- <span>Meets2904</span></h6>
                <h6>UserID:- <span>123456</span></h6>
                <h6>Name:- <span>Meet Satasiya</span></h6>
                <button className='log-out-btn' onClick={handleLogOut}>LogOut</button>
            </div>
    </section>
  )
}

export default ProfilePage
