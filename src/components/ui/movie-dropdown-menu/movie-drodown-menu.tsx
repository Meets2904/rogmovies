import { NavLink } from 'react-router-dom'
import '../../../styles/navbar/navbar.css'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react';


const MovieDropdownMenu = () => {

    const movieRef = useRef<HTMLDivElement>(null);
    const [isMovieVisible, setIsMovieVisible] = useState(false);

     useEffect(()=>{
            const handleClickOutside = (event: any) => {
                if (movieRef.current && !movieRef.current.contains(event.target) && isMovieVisible){
                    setIsMovieVisible(false);
                }
            }
    
            document.addEventListener("click", handleClickOutside);
    
            return () => {
                document.removeEventListener("click", handleClickOutside);
              };
        }, [movieRef, isMovieVisible, setIsMovieVisible])

    return (
        <div className='movies-tab-container' ref={movieRef} onClick={(e)=> {
            e.preventDefault();
            setIsMovieVisible(!isMovieVisible) }} >
            <h6>Movies <span><ChevronDown className={`arrow-down ${isMovieVisible == true ? 'rotate-arrow' : ''}`} /></span></h6>
            {isMovieVisible && <div className="movie-dropdown-menu" >
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
