import '../../styles/upcoming-movies-embla-slider/upcoming_movies_slider.css'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import axiosInstance from '../../axios/axios-instance';
import { Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

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
    const api_key = import.meta.env.VITE_API_KEY;
    const image_url_300 = import.meta.env.VITE_MOVIE_IMAGE_BASE_URL_WIDTH_300

    const fetchMovies = async() => {
        try {
            const response = await axiosInstance.get(`movie/upcoming?language=en-US&page=1&api_key=${api_key}`)
            console.log("Upcoming Movies Data",response?.data.results)
            const data = response?.data.results;
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    const { isLoading, error, data: moviesData} =useQuery({
        queryKey: ['upcomingMoviesData'],
        queryFn: fetchMovies,
    })

    return (
        <section className='upcoming-movies-section container'>
            <div className='upcoming-movies-heading'>
                <h3>Upcoming Movies</h3>
                <p>See All</p>
            </div>
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {moviesData?.map((movie: UpcomingMovieData, index: number) => (
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
