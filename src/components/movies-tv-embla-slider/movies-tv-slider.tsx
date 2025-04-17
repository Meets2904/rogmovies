import '../../styles/movies-tv-embla-slider/movies-tv-slider.css'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import axiosInstance from '../../axios/axios-instance';
import { Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import MovieSkeletonCard from '../ui/movie-skeleton-card/movie-skeleton-card';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
    path: string
}

type MovieTvData = {
    id: number;
    poster_path: string;
    title: string;
    release_date: string | number;
    vote_average: number;
    name: string;
    first_air_date: string | number;
}


const MoviesTVSlider = ({ options, path }: PropType) => {

    const [emblaRef] = useEmblaCarousel(options)
    const [imageLoading, setImageLoading] = useState(true)
    const api_key = import.meta.env.VITE_API_KEY;
    const image_url_300 = import.meta.env.VITE_MOVIE_IMAGE_BASE_URL_WIDTH_300


    // Function to fetch movies data
    const fetchMovies = async () => {
        try {
            const response = await axiosInstance.get(`${path}?language=en-US&page=1&api_key=${api_key}`)
            const data = response?.data.results;
            return data;
        } catch (error) {
            console.error(error)
        }
    }

    // React Query for MoviesTvData
    const { isLoading, isError, data: moviesData } = useQuery({
        queryKey: ['MoviesTvData', path],
        queryFn: fetchMovies,
    })

    // Image Loading Handler
    const handleImageLoad = () => {
        setImageLoading(false)
    }

    const handleImageError = () => {
        setImageLoading(false)
    }

    return (
        <section className='upcoming-movies-section container'>
            <div className='upcoming-movies-heading'>
                {path === 'movie/upcoming' && <>
                    <h3>Upcoming Movies</h3>
                    <NavLink to='movie/upcoming' className='see-all-link'><p>See All</p></NavLink>
                </>}
                {path === 'tv/top_rated' && <>
                    <h3>Top Rated TV Series</h3>
                    <NavLink to='tv/top_rated' className='see-all-link'><p>See All</p></NavLink>
                </>}
            </div>
            {isError && <div style={{ color: 'white', fontSize: '25px' }}>Currently Data Is Not Available</div>}
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {isLoading && <MovieSkeletonCard length={20} />}
                    {moviesData?.map((movie: MovieTvData, index: number) => (
                        <div className='embla_slide movie-card-container' key={index}>
                            <div className='embla_slide_number upcoming-movie-card'>
                                <div className='upcoming-movie-poster'><NavLink to={`${path === 'movie/upcoming' && `/movie/detail/${movie?.id}` || path === 'tv/top_rated' && `tv-show/detail/${movie?.id}`}`}>
                                    {imageLoading && <div style={{ position: 'absolute', top: "45%", right: "40%" }}><CircularProgress /></div>}
                                    <img src={`${image_url_300}${movie?.poster_path}`} onLoad={handleImageLoad} onError={handleImageError} alt="" /></NavLink></div>
                                <h6>{movie?.title || movie?.name || 'NA'}</h6>
                                <div className='upcoming-movie-date'>
                                    <p>{movie?.release_date || movie?.first_air_date || 'NA'}</p>
                                    <div className='upcoming-movie-vote'><Star size={18} fill='orange' color='orange' className='star' /><span>{movie?.vote_average || 'NA'}</span></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MoviesTVSlider;
