import '../../styles/navbar/navbar.css';
import nav_logo from '../../../src/assets/images/navbar/nav-logo.png'
import { ChevronDown, Heart, SquareUser } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import MovieDropdownMenu from '../ui/movie-dropdown-menu/movie-drodown-menu';
import { useState } from 'react';
import TvDropdownMenu from '../ui/tv-dropdown-menu/tv-dropdown-menu';

const Navbar = () => {

    const [isMovieVisible, setIsMovieVisible] = useState(false);
    const [isTvVisible, setIsTvVisible] = useState(false);

    const toggleMovieVisibility = () => {
        setIsMovieVisible(!isMovieVisible);
        if (isTvVisible) {
            setIsTvVisible(!isTvVisible);
        }
    }

    const toggleTvVisibility = () => {
        setIsTvVisible(!isTvVisible);
        if (isMovieVisible) {
            setIsMovieVisible(!isMovieVisible);
        }
    }

    return (
        <nav className='nav-bar container'>
            <div className='nav-bar-tab-container'>
                <NavLink to='/' className='nav-logo-container'>
                    <div className='nav-logo'>
                        <img src={nav_logo} alt="" />
                        <p>Rog Movies</p>
                    </div>
                </NavLink>

                <div className='movies-tab-container' onClick={toggleMovieVisibility}>
                    <h6>Movies <span><ChevronDown className={`arrow-down ${isMovieVisible == true ? 'rotate-arrow' : ''}`} /><MovieDropdownMenu isVisible={isMovieVisible} /></span></h6>
                </div>

                <div className='tv-shows-container' onClick={toggleTvVisibility}>
                    <h6>TV Shows <span><ChevronDown className={`arrow-down ${isTvVisible == true ? 'rotate-arrow' : ''}`} /><TvDropdownMenu isVisible={isTvVisible} /></span></h6>
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

export default Navbar;