import { NavLink } from 'react-router-dom'
import '../../../styles/navbar/navbar.css'

type ProtoType = {
    isVisible: boolean
}

const TvDropdownMenu = (props: ProtoType) => {
    return (
        <>
        {
            props?.isVisible?(
        <div className = "tv-dropdown-menu" >
                    <ul className="tv-dropdown-menu-list-wrapper">
                        <NavLink to='tv/airing_today' style={{textDecoration: 'none'}}><li>Airing Today</li></NavLink>
                        <NavLink to='tv/on_the_air' style={{textDecoration: 'none'}}><li>On The Air</li></NavLink>
                        <NavLink to='tv/popular' style={{textDecoration: 'none'}}><li>Popular</li></NavLink>
                        <NavLink to='tv/top_rated' style={{textDecoration: 'none'}}><li>Top Rated</li></NavLink>
                    </ul>
        </div >
      ) : null}
        </>
  )
}

export default TvDropdownMenu;
