import { NavLink } from 'react-router-dom'
import '../../../styles/navbar/navbar.css'
import { ChevronDown } from 'lucide-react'
import useOutsideClick from '../../../hooks/useOutsideClick';


const MovieDropdownMenu = () => {

    // useOutsideClick Custom Hook
    const [ref, isVisible, setVisible]: any = useOutsideClick();

    return (
        <div className='movies-tab-container' ref={ref} onClick={(e) => {
            e.preventDefault();
            setVisible(!isVisible)
        }} >
            <h6>Movies <span><ChevronDown className={`arrow-down ${isVisible == true ? 'rotate-arrow' : ''}`} /></span></h6>
            {isVisible && <div className="movie-dropdown-menu" >
                <ul className="movie-dropdown-menu-list-wrapper">
                    <NavLink to='/movie/now_playing' style={{ textDecoration: 'none' }}><li>Now Playing</li></NavLink>
                    <NavLink to='/movie/popular' style={{ textDecoration: 'none' }} ><li>Popular</li></NavLink>
                    <NavLink to='/movie/top_rated' style={{ textDecoration: 'none' }}><li>Top Rated</li></NavLink>
                    <NavLink to='/movie/upcoming' style={{ textDecoration: 'none' }}><li>Upcoming</li></NavLink>
                </ul>
            </div >}
        </div>
    )
}

export default MovieDropdownMenu;
