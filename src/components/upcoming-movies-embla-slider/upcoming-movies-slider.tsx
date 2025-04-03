import { useEffect, useState } from 'react';
import '../../styles/upcoming-movies-embla-slider/upcoming_movies_slider.css'

import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import axiosInstance from '../../axios/axios-instance';
import { Star } from 'lucide-react';

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

type UpcomingMovieData = {
    poster_path: string;
    title: string;
    release_date: string | number;
    vote_average: number;
}


const UpcomingMoviesSlider = (props: PropType) => {

    const {  options } = props
    const [emblaRef] = useEmblaCarousel(options)
    const [moviesData, setMoviesData] = useState([]);
    const api_key = import.meta.env.VITE_API_KEY;
    const image_url_300 = import.meta.env.VITE_MOVIE_IMAGE_BASE_URL_WIDTH_300

    const fetchMovies = async () => {
       await axiosInstance.get(`movie/upcoming?language=en-US&page=1&api_key=${api_key}`)
            .then((response) => {
                console.log("Upcoming Movies Data",response.data.results);
                setMoviesData(response.data.results);
            })
            .catch((error) => {
                console.log("Error", error)
            })
    }

    useEffect(() => {
        fetchMovies();
    }, [])

    return (
        <section className='upcoming-movies-section container'>
            <div className='upcoming-movies-heading'>
                <h3>Upcoming Movies</h3>
                <p>See All</p>
            </div>
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {moviesData?.map((movie: UpcomingMovieData, index) => (
                        <div className='embla_slide movie-card-container' key={index}>
                            <div className='embla_slide_number upcoming-movie-card'>
                                <div className='upcoming-movie-poster'><img src={`${image_url_300}${movie?.poster_path}`} alt="" /></div>
                                <h6>{movie?.title}</h6>
                                <div className='upcoming-movie-date'>
                                    <p>{movie?.release_date}</p>
                                    <div className='upcoming-movie-vote'><Star size={18} fill='orange' color='orange' /><span>{movie?.vote_average}</span></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UpcomingMoviesSlider;
