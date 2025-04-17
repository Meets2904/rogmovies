import { useQuery } from '@tanstack/react-query';
import '../../styles/watchlist-page/watchlist-page.css'
import axiosInstance from '../../axios/axios-instance';
import { useState } from 'react';
import MovieTvDetailSkeleton from '../../components/ui/movie-tv-detail-skeleton/movie-tv-detail-skeleton';
import { CircularProgress } from '@mui/material';
import { NavLink } from 'react-router-dom';

type WatchlistData = {
    poster_path: string,
    backdrop_path: string,
    id: number,
    original_title: string,
    overview: string,
    release_date: number | string,
    first_air_date: number | string,
    vote_count: number | string,
    original_name: string,
}

const WatchListPage = () => {

    const [timeFrame, setTimeFrame] = useState('movies');
    const [imageLoading, setImageLoading] = useState(true)
    const session_id = localStorage.getItem('sessionId');
    const api_key = localStorage.getItem('api_key')
    const image_url_200 = import.meta.env.VITE_MOVIE_IMAGE_BASE_URL_WIDTH_200;
    const image_url_300 = import.meta.env.VITE_MOVIE_IMAGE_BASE_URL_WIDTH_300;

    // Function to fetch watchlist data
    const fetchWatchlistData = async () => {
        if (timeFrame == 'movies') {
            try {
                const response = await axiosInstance.get(`account/null/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc&session_id=${session_id}&api_key=${api_key}`)
                const data = response?.data.results;
                return data;
            } catch (error) {
                console.error(error)
            }
        } else if (timeFrame == 'tv-shows') {
            try {
                const response = await axiosInstance.get(`account/null/watchlist/tv?language=en-US&page=1&sort_by=created_at.asc&session_id=${session_id}&api_key=${api_key}`)
                const data = response?.data.results;
                return data;
            } catch (error) {
                console.error(error)
            }
        }
    }

    // React Query For Watchlist Data
    const { data: watchlistData, isLoading, isError } = useQuery({
        queryKey: ['watchlistData', timeFrame,],
        queryFn: fetchWatchlistData,
    })


    // Image Loading Handler
    const handleImageLoad = () => {
        setImageLoading(false)
    }

    const handleImageError = () => {
        setImageLoading(false)
    }

    const length = watchlistData?.length;

    return (
        <section className='watchlist-page-section container'>
            <div className='watchlist-page-heading-container'>
                <h2>My Watchlist Page</h2>
                <div className='movies-tv-toggle-btn'>
                    <button className={`movies-btn ${timeFrame == 'movies' ? 'selected-time-frame' : ''}`} onClick={() => setTimeFrame('movies')}>Movies</button>
                    <button className={`tv-shows-btn ${timeFrame == 'tv-shows' ? 'selected-time-frame' : ''}`} onClick={() => setTimeFrame('tv-shows')}>TV Shows</button>
                </div>
            </div>

            {isError && <div style={{ color: 'white', fontSize: '25px' }}>Currently Data Is Not Available</div>}
            {isLoading && <MovieTvDetailSkeleton length={length} />}
            {watchlistData?.length == 0 ? <p style={{ fontSize: '30px', display: 'flex', gap: '10px' }}>You Have Nothing To Watch Later! <img style={{ height: '50px', width: '50px' }} src="../../../src/assets/images/sad_emoji.png" alt="" /></p> :
                <div className='watchlist-card-container'>
                    {watchlistData?.map((item: WatchlistData, index: number) => (
                        <div className='watchlist-card' key={index}>
                            <div className='watchlist-item-poster'>
                                {imageLoading && <div style={{ position: 'absolute', top: "45%", right: "40%" }}><CircularProgress /></div>}
                                {item?.poster_path
                                    ? <NavLink to={`${timeFrame == 'movies' ? `/movie/detail/${item?.id}` : `/tv-show/detail/${item?.id}`}`}><img src={`${image_url_200}${item?.poster_path}`} onLoad={handleImageLoad} onError={handleImageError} alt="" /></NavLink>
                                    : <NavLink to={`${timeFrame == 'movies' ? `/movie/detail/${item?.id}` : `/tv-show/detail/${item?.id}`}`}><img src={`${image_url_300}${item?.backdrop_path}`} onLoad={handleImageLoad} onError={handleImageError} alt="" /></NavLink>}
                            </div>
                            <div className='watchlist-item-details'>
                                {item?.id && <h6>Id:- <span>{item?.id}</span></h6>}
                                {(item?.original_title || item?.original_name) && (
                                    <h5>Name:- <span>{item?.original_title || item?.original_name}</span></h5>
                                )}
                                {item?.overview && <p>Overview:- <span>{item?.overview}</span></p>}
                                {(item?.release_date || item?.first_air_date) && (
                                    <p>Release date:- <span>{item?.release_date || item?.first_air_date}</span></p>
                                )}
                                {item?.vote_count && <p>Total Rating:- <span>{item?.vote_count}</span></p>}
                            </div>
                        </div>
                    ))}
                </div>}
        </section>
    )
}

export default WatchListPage;
