import '../../styles/navbar/navbar.css';
import nav_logo from '../../../src/assets/images/navbar/nav-logo.png'
import { Heart, SquareUser } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import MovieDropdownMenu from '../ui/movie-dropdown-menu/movie-drodown-menu';
import TvDropdownMenu from '../ui/tv-dropdown-menu/tv-dropdown-menu';

const Navbar = () => {

    return (
        <nav className='nav-bar container'>
            <div className='nav-bar-tab-container'>

                <NavLink to='/' className='nav-logo-container'>
                    <div className='nav-logo'>
                        <img src={nav_logo} alt="Rog Movies" />
                        <p>Rog Movies</p>
                    </div>
                </NavLink>

                <MovieDropdownMenu />

                <TvDropdownMenu />
            </div>

            <div className='nav-bar-functionality-container'>
                <div className='add-to-fav'>
                    <NavLink to={`${localStorage.getItem("sessionId") ? '/watchlist-page' : '/login'}`}><Heart color='white' className='heart-icon' /></NavLink>
                </div>
                <div className='user-profile'>
                    <NavLink to={`${localStorage.getItem("sessionId") ? '/profile' : '/login'}`}>{localStorage.getItem("sessionId") ? <img src="/avatar.jpg" alt="" className='user_image' /> : <SquareUser color='white' />}</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;