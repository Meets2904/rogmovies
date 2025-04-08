import { useQuery } from '@tanstack/react-query';
import '../../styles/watchlist-page/watchlist-page.css'
import axiosInstance from '../../axios/axios-instance';
import { useState } from 'react';

type WatchlistData = {
    poster_path: string,
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
    const session_id = localStorage.getItem('sessionId');
    const api_key = localStorage.getItem('api_key')
    const image_url_200 = import.meta.env.VITE_MOVIE_IMAGE_BASE_URL_WIDTH_200;

    const fetchWatchlistData = async () => {
        if (timeFrame == 'movies') {
            try {
                const response = await axiosInstance.get(`account/null/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc&session_id=${session_id}&api_key=${api_key}`)
                console.log("Watchlist Movies", response?.data.results)
                const data = response?.data.results;
                return data;
            } catch (error) {
                console.log(error)
            }
        } else if (timeFrame == 'tv-shows') {
            try {
                const response = await axiosInstance.get(`account/null/watchlist/tv?language=en-US&page=1&sort_by=created_at.asc&session_id=${session_id}&api_key=${api_key}`)
                console.log("Watchlist Tv Shows", response?.data.results)
                const data = response?.data.results;
                return data;
            } catch (error) {
                console.log(error)
            }
        }
    }

    const { data: watchlistData } = useQuery({
        queryKey: ['watchlistData', timeFrame],
        queryFn: fetchWatchlistData,
    })


    return (
        <section className='watchlist-page-section container'>
            <div className='watchlist-page-heading-container'>
                <h2>My Watchlist Page</h2>
                <div className='movies-tv-toggle-btn'>
                    <button className={`movies-btn ${timeFrame == 'movies' ? 'selected-time-frame' : ''}`} onClick={() => setTimeFrame('movies')}>Movies</button>
                    <button className={`tv-shows-btn ${timeFrame == 'tv-shows' ? 'selected-time-frame' : ''}`} onClick={() => setTimeFrame('tv-shows')}>TV Shows</button>
                </div>
            </div>

            {watchlistData?.length == 0 ? <p style={{ fontSize: '30px', display: 'flex', gap: '10px' }}>You Have Nothing To Watch Later! <img style={{ height: '50px', width: '50px' }} src="../../../src/assets/images/sad_emoji.png" alt="" /></p> : <div className='watchlist-card-container'>
                {watchlistData?.map((item: WatchlistData, index: number) => (
                    <div className='watchlist-card' key={index}>
                        <div className='watchlist-item-poster'>
                            <img src={`${image_url_200}${item?.poster_path}`} alt="" />
                        </div>
                        <div className='watchlist-item-details'>
                            <h6>Id:- <span>{item?.id}</span></h6>
                            <h5>Name: {item?.original_title ? <span>{item?.original_title}</span> : <span>{item?.original_name}</span>}</h5>
                            <p>Overview:- <span>{item?.overview}</span></p>
                            <p>Release date:- {item?.release_date ? <span>{item?.release_date}</span> : <span>{item?.first_air_date}</span>} </p>
                            <p>Total Rating:- <span>{item?.vote_count}</span></p>
                        </div>
                    </div>
                ))}
            </div>}
        </section>
    )
}

export default WatchListPage;
