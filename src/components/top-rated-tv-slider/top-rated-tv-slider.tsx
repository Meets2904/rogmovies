import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import axiosInstance from '../../axios/axios-instance'
import { Star } from 'lucide-react'
import '../../styles/top-rated-tv-slider/top-rated-tv-slider.css'
import { useQuery } from '@tanstack/react-query'
import { NavLink } from 'react-router-dom'
import MovieSkeletonCard from '../ui/movie-skeleton-card/movie-skeleton-card'
import { useState } from 'react'
import { CircularProgress } from '@mui/material'


type PropType = {
    slides: number[] 
    options?: EmblaOptionsType
}

type TopRatedTvData = {
    id: number;
    poster_path: string;
    name: string;
    first_air_date: string | number;
    vote_average: number;
}

const TopRatedTvSlider = (props: PropType) => {
    const { options } = props
    const [emblaRef] = useEmblaCarousel(options)
    const [imageLoading, setImageLoading] = useState(true)
    const api_key = import.meta.env.VITE_API_KEY;
    const image_url_300 = import.meta.env.VITE_MOVIE_IMAGE_BASE_URL_WIDTH_300

    const fetchTopRatedTvDetails = async () => {
        
        try {
            const response = await axiosInstance.get(`tv/top_rated?language=en-US&page=1&api_key=${api_key}`)
            console.log("Top Rated Tv Data", response?.data.results)
            const data = response?.data.results
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    
    const { isLoading, isError, data } = useQuery({
        queryKey: ['topRatedTvData'], 
        queryFn: fetchTopRatedTvDetails 
    });

    const handleImageLoad = () => {
        setImageLoading(false)
      }
    
      const handleImageError = () => {
        setImageLoading(false)
      }

    return (
        <section className='top-rated-tv-slider-section container'>
            <div className='top-rated-tv-heading'>
                <h3>Top Rated TV Series</h3>
                <NavLink to='tv/top_rated' className='see-all-link'><p>See All</p></NavLink>
            </div>
            {isError && <div style={{color: 'white', fontSize: '25px'}}>Currently Data Is Not Available</div>}
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                {isLoading && <MovieSkeletonCard length={20}/>}
                    {data?.map((movie: TopRatedTvData, index: number) => (
                        <div className='embla_slide movie-card-container' key={index}>
                            <div className='embla_slide_number upcoming-movie-card'>
                                <div className='upcoming-movie-poster'>
                                    <NavLink to={`/tv-show/detail/${movie?.id}`}>
                                    {imageLoading && <div style={{ position: 'absolute', top: "45%", right: "40%"}}><CircularProgress /></div>}
                                    <img src={`${image_url_300}${movie?.poster_path}`} onLoad={handleImageLoad} onError={handleImageError} alt="" /></NavLink>
                                </div>
                                <h6>{movie?.name}</h6>
                                <div className='upcoming-movie-date'>
                                    <p>{movie?.first_air_date || "NA"}</p>
                                    <div className='upcoming-movie-vote'>
                                        <Star size={18} fill='orange' color='orange' className='star'/>
                                        <span>{(movie?.vote_average).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TopRatedTvSlider;

