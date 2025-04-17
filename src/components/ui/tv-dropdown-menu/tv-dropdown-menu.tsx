import { NavLink } from 'react-router-dom'
import '../../../styles/navbar/navbar.css'
import { ChevronDown } from 'lucide-react';
import useOutsideClick from '../../../hooks/useOutsideClick';

const TvDropdownMenu = () => {

    const [ref, isVisible, setVisible]: any = useOutsideClick();


    return (
        <div className='tv-shows-container' ref={ref} onClick={(e) => {
            e.preventDefault();
            setVisible(!isVisible)
        }}>
            <h6>TV Shows <span><ChevronDown className={`arrow-down ${isVisible == true ? 'rotate-arrow' : ''}`} /></span></h6>
            {isVisible && <div className="tv-dropdown-menu" >
                <ul className="tv-dropdown-menu-list-wrapper">
                    <NavLink to='tv/airing_today' style={{ textDecoration: 'none' }}><li>Airing Today</li></NavLink>
                    <NavLink to='tv/on_the_air' style={{ textDecoration: 'none' }}><li>On The Air</li></NavLink>
                    <NavLink to='tv/popular' style={{ textDecoration: 'none' }}><li>Popular</li></NavLink>
                    <NavLink to='tv/top_rated' style={{ textDecoration: 'none' }}><li>Top Rated</li></NavLink>
                </ul>
            </div >}
        </div>
    )
}

export default TvDropdownMenu;
