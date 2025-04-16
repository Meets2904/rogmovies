import { NavLink } from 'react-router-dom'
import '../../../styles/navbar/navbar.css'
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const TvDropdownMenu = () => {

    const tvRef = useRef<HTMLDivElement>(null);
    const [isTvVisible, setIsTvVisible] = useState(false);


    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (tvRef.current && !tvRef.current.contains(event.target) && isTvVisible) {
                setIsTvVisible(false)
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [tvRef, isTvVisible, setIsTvVisible])


    return (
        <div className='tv-shows-container' ref={tvRef} onClick={(e) => {
            e.preventDefault();
            setIsTvVisible(!isTvVisible)
        }}>
            <h6>TV Shows <span><ChevronDown className={`arrow-down ${isTvVisible == true ? 'rotate-arrow' : ''}`} /></span></h6>
            {isTvVisible && <div className="tv-dropdown-menu" >
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
