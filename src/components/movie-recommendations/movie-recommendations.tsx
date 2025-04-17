import { useQuery } from '@tanstack/react-query';
import '../../styles/movie-recommendations/movie-recommendations.css';
import axiosInstance from '../../axios/axios-instance';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { Star } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import MovieSkeletonCard from '../ui/movie-skeleton-card/movie-skeleton-card';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
    movieID?: any
    tvshowID?: any
}

type RecommendationData = {
    id: number;
    poster_path: string;
    original_title: string;
    release_date: string | number;
    vote_average: number;
    first_air_date: string | number;
    original_name: string;
}

const MovieRecommendations = ({ options, movieID, tvshowID }: PropType) => {

    const [emblaRef] = useEmblaCarousel(options)
    const [imageLoading, setImageLoading] = useState(true)
    const api_key = import.meta.env.VITE_API_KEY;
    const image_url_300 = import.meta.env.VITE_MOVIE_IMAGE_BASE_URL_WIDTH_300

    // fetch recommendation handler for api calling
    const fetchRecommendationData = async () => {
        if (movieID) {
            try {
                const response = await axiosInstance.get(`movie/${movieID}/recommendations?language=en-US&page=1&api_key=${api_key}`)
                return response?.data.results
            } catch (error) {
                console.error(error)
            }
        } else if (tvshowID) {
            try {
                const response = await axiosInstance.get(`tv/${tvshowID}/recommendations?language=en-US&page=1&api_key=${api_key}`)
                return response?.data.results
            } catch (error) {
                console.error(error)
            }
        }
    }

    // React Query For Movie RecommendationData
    const { data, isLoading } = useQuery({
        queryKey: ['movieRecommendationsData', movieID, tvshowID],
        queryFn: fetchRecommendationData,
    })

    if (!data || data?.length === 0) {
        return null;
    }

    // Image Loading Handler
    const handleImageLoad = () => {
        setImageLoading(false)
    }

    const handleImageError = () => {
        setImageLoading(false)
    }

    return (
        <section className='movie-recommendations-section'>
            <div className='movie-recommendations-heading'><h3>Recommendations</h3></div>
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {isLoading && <MovieSkeletonCard length={20} />}
                    {data?.map((movie: RecommendationData, index: number) => (
                        <div className='embla_slide movie-recommendations-container' key={index}>
                            {movie?.poster_path && <div className='embla_slide_number recommendations-movie-card'>
                                <div className='recommendations-movie-poster'>
                                    <NavLink to={`/movie/detail/${movie?.id}`}>
                                        {imageLoading && <div style={{ position: 'absolute', top: "45%", right: "40%" }}><CircularProgress /></div>}
                                        <img src={`${image_url_300}${movie?.poster_path}`} onLoad={handleImageLoad} onError={handleImageError} alt="" />
                                    </NavLink>
                                </div>
                                <h6>{movie?.original_title ? movie?.original_title : movie?.original_name}</h6>
                                <div className='recommendations-movie-date'>
                                    <p>{movie?.release_date ? movie?.release_date : movie?.first_air_date || "NA"}</p>
                                    <div className='recommendations-movie-vote'>
                                        <Star size={18} fill='orange' color='orange' className='star' />
                                        <span>{(movie?.vote_average).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MovieRecommendations;
