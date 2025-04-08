// import React from 'react'
import '../../styles/navbar/navbar.css';
// import { NavLink } from 'react-router-dom';
import nav_logo from '../../../src/assets/images/navbar/nav-logo.png'
import { ChevronDown, Heart, SquareUser } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    // const request_token = localStorage.getItem("request_token")

    return (
        <nav className='nav-bar container'>
            <div className='nav-bar-tab-container'>
                <NavLink to='/' className='nav-logo-container'>
                    <div className='nav-logo'>
                        <img src={nav_logo} alt="" />
                        <p>Movies App</p>
                    </div>
                </NavLink>

                <div className='movies-tab-container'>
                    {/* <NavLink to='/'> */}
                    <h6>Movies <span><ChevronDown className='arrow-down' /></span></h6>
                    {/* </NavLink> */}
                </div>

                <div className='tv-shows-container'>
                    {/* <NavLink to='/'> */}
                    <h6>TV Shows <span><ChevronDown className='arrow-down' /></span></h6>
                    {/* </NavLink> */}
                </div>
            </div>

            <div className='nav-bar-functionality-container'>
                <div className='add-to-fav'>
                    <NavLink to={`${localStorage.getItem("sessionId") ? '/watchlist-page' : '/login'}`}><Heart color='white' className='heart-icon' /></NavLink>
                </div>
                <div className='user-profile'>
                    <NavLink to={`${localStorage.getItem("sessionId") ? '/profile' : '/login'}`}>{localStorage.getItem("sessionId") ? <img src="../../../src/assets/images/avatar.jpg" alt="" className='user_image' /> : <SquareUser color='white' />}</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
