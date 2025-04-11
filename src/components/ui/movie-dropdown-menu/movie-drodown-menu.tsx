import { NavLink } from 'react-router-dom'
import '../../../styles/navbar/navbar.css'

type ProtoType = {
    isVisible: boolean
    ref?: any
}

const MovieDropdownMenu = (props: ProtoType) => {


    return (
        <>
        {
            props?.isVisible?(
        <div className = "movie-dropdown-menu" >
                    <ul className="movie-dropdown-menu-list-wrapper">
                        <NavLink to='movie/now_playing' style={{textDecoration: 'none'}}><li>Now Playing</li></NavLink>
                        <NavLink to='movie/popular' style={{textDecoration: 'none'}}><li>Popular</li></NavLink>
                        <NavLink to='movie/top_rated' style={{textDecoration: 'none'}}><li>Top Rated</li></NavLink>
                        <NavLink to='movie/upcoming' style={{textDecoration: 'none'}}><li>Upcoming</li></NavLink>
                    </ul>
        </div >
      ) : null}
        </>
  )
}

export default MovieDropdownMenu;
