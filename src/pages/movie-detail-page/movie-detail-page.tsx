import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios/axios-instance';
import '../../styles/movie-detail-page/movie-detail-page.css';
import { EmblaOptionsType } from 'embla-carousel';
import MovieVideos from '../../components/movie-videos/movie-videos';
import MovieReviews from '../../components/movie-reviews/movie-reviews';
import MovieRecommendations from '../../components/movie-recommendations/movie-recommendations';
import AddWatchlistBtn from '../../components/ui/add-to-watchlist-btn/add-to-watchlist-btn';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import MovieTvDetailSkeleton from '../../components/ui/movie-tv-detail-skeleton/movie-tv-detail-skeleton';
import PeopleSlider from '../../components/people-slider/people-slider';

// Movie Credits Slider
const movie_cast_options: EmblaOptionsType = { dragFree: true }
const movie_cast_slide_count = 20
const movie_cast_slides = Array.from(Array(movie_cast_slide_count).keys())

// Movie Videos Slider
const movie_videos_options: EmblaOptionsType = { align: 'start' }
const movie_videos_slide_count = 6
const movie_videos_slides = Array.from(Array(movie_videos_slide_count).keys())

// Movie Recommendations Slider
const movie_recommendations_options: EmblaOptionsType = { dragFree: true }
const movie_recommendations_slide_count = 20
const movie_recommendations_slides = Array.from(Array(movie_recommendations_slide_count).keys())

const MovieDetailPage = () => {

    const [imageLoading, setImageLoading] = useState(true)
    const [bgImageLoading, setBgImageLoading] = useState(true)
    const params = useParams();
    console.log(params)
    const api_key = import.meta.env.VITE_API_KEY;
    const background_image_url = import.meta.env.VITE_BACKGROUND_IMAGE_URL;
    const image_url_300 = import.meta.env.VITE_MOVIE_IMAGE_BASE_URL_WIDTH_300;

    const fetchMovieDetails = async () => {
        if(params?.movieID){
            try {
                const response = await axiosInstance.get(`movie/${params?.movieID}?language=en-US&api_key=${api_key}`)
                return response?.data
            } catch (error) {
                console.log(error)
            }
        }else if (params?.tvshowID) {
            try {
                const response = await axiosInstance.get(`tv/${params?.tvshowID}?language=en-US&api_key=${api_key}`)
                return response?.data
              } catch (error) {
                console.log(error)
              }
        }
    }

    const { data: movieData, isLoading} = useQuery({
        queryKey: ['movieDetails', params?.movieID, params?.tvshowID],
        queryFn: fetchMovieDetails,
    })

    console.log(movieData)

    const handleImageLoad = () => {
        setImageLoading(false)
    }

    const handleImageError = () => {
        setImageLoading(false)
    }

    const handleBgImageLoad = () => {
        setBgImageLoading(false)
    }

    const handleBgImageError = () => {
        setBgImageLoading(false)
    }

    return (
        <section className='movie-details-section'>
            <div className='movie-background-poster'>
                {bgImageLoading && <div style={{ position: 'absolute', top: "45%", right: "50%" }}><CircularProgress /></div>}
                <img src={`${background_image_url}${movieData?.backdrop_path}`} onLoad={handleBgImageLoad} onError={handleBgImageError} alt="" />
            </div>
            <div className='movie-detail-page-container container'>
                {isLoading && <MovieTvDetailSkeleton/>}
                {<div className='movie-detail-card'>
                    <div className='movie-detail-card-poster'>
                        {imageLoading && <div style={{ position: 'absolute', top: "45%", right: "40%" }}><CircularProgress /></div>}
                        <img src={`${image_url_300}${movieData?.poster_path}`} onLoad={handleImageLoad} onError={handleImageError} alt="" /></div>
                    <div className='movie-details'>
                        <h2>{movieData?.original_title || movieData?.original_name || 'NA'}</h2>
                        <p className='movie-release-date'>{movieData?.release_date || movieData?.first_air_date || 'NA'}</p>
                        <div className='movie-genre-container'>{movieData?.genres.map((genre: any, index: number) => (
                            <p key={index}>{genre?.name || 'NA'}</p>
                        ))}</div>
                        <p className='movie-overview-detail'>{movieData?.overview || 'NA'}</p>
                        <AddWatchlistBtn movieID={params?.movieID} tvshowID={params?.tvshowID}/>
                    </div>
                </div>}

                <div className='movie-full-cast'>
                    <PeopleSlider movieID={params?.movieID} tvshowID={params?.tvshowID} slides={movie_cast_slides} options={movie_cast_options} />
                </div>

                <div className='movie-videos'>
                    <MovieVideos movieID={params?.movieID} tvshowID={params?.tvshowID} slides={movie_videos_slides} options={movie_videos_options} />
                </div>

                <div className='movie-reviews'>
                    <MovieReviews movieID={params?.movieID} tvshowID={params?.tvshowID}/>
                </div>

                <div className='movie-recommendations'>
                    <MovieRecommendations movieID={params?.movieID} tvshowID={params?.tvshowID} slides={movie_recommendations_slides} options={movie_recommendations_options} />
                </div>
            </div>
        </section>
    )
}

export default MovieDetailPage;
