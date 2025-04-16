import '../../styles/navbar/navbar.css';
import nav_logo from '../../../src/assets/images/navbar/nav-logo.png'
import { Heart, SquareUser } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import MovieDropdownMenu from '../ui/movie-dropdown-menu/movie-drodown-menu';
import TvDropdownMenu from '../ui/tv-dropdown-menu/tv-dropdown-menu';

const Navbar = () => {

    // const movieRef = useRef<HTMLDivElement>(null);
    // const tvRef = useRef<HTMLDivElement>(null);
    // const [isMovieVisible, setIsMovieVisible] = useState(false);
    // const [isTvVisible, setIsTvVisible] = useState(false);


    // useEffect(()=>{
    //     const handleClickOutside = (event: any) => {
    //         if (movieRef.current && !movieRef.current.contains(event.target) && isMovieVisible){
    //             setIsMovieVisible(false);
    //         }

    //         if (tvRef.current && !tvRef.current.contains(event.target) && isTvVisible){
    //             setIsTvVisible(false)
    //         }
    //     }

    //     document.addEventListener("click", handleClickOutside);

    //     return () => {
    //         document.removeEventListener("click", handleClickOutside);
    //       };
    // }, [movieRef, tvRef, isMovieVisible, setIsMovieVisible, isTvVisible, setIsTvVisible])


    return (
        <nav className='nav-bar container'>
            <div className='nav-bar-tab-container'>
                <NavLink to='/' className='nav-logo-container'>
                    <div className='nav-logo'>
                        <img src={nav_logo} alt="Rog Movies" />
                        <p>Rog Movies</p>
                    </div>
                </NavLink>

                {/* <div className='movies-tab-container' ref={movieRef} onClick={(e)=> {
                    e.preventDefault();
                    setIsMovieVisible(!isMovieVisible);
                }}>
                    <h6>Movies <span><ChevronDown className={`arrow-down ${isMovieVisible == true ? 'rotate-arrow' : ''}`} />{isMovieVisible && <MovieDropdownMenu />}</span></h6>
                </div> */}
                <MovieDropdownMenu/>

                <TvDropdownMenu/>

                {/* <div className='tv-shows-container' ref={tvRef} onClick={(e) => {
                    e.preventDefault();
                    setIsTvVisible(!isTvVisible)
                }} >
                    <h6>TV Shows <span><ChevronDown className={`arrow-down ${isTvVisible == true ? 'rotate-arrow' : ''}`} />{isTvVisible && <TvDropdownMenu />}</span></h6>
                </div> */}
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