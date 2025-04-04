import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import axiosInstance from '../../axios/axios-instance'
import { Star } from 'lucide-react'
import '../../styles/top-rated-tv-slider/top_rated_tv_slider.css'
import { useQuery } from '@tanstack/react-query'


type PropType = {
    slides: number[] 
    options?: EmblaOptionsType
}

type TopRatedTvData = {
    poster_path: string;
    name: string;
    first_air_date: string | number;
    vote_average: number;
}

const TopRatedTvSlider = (props: PropType) => {
    const { options } = props
    const [emblaRef] = useEmblaCarousel(options)
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

    
    const { data } = useQuery({
        queryKey: ['topRatedTvData'], 
        queryFn: fetchTopRatedTvDetails 
    });

    return (
        <section className='top-rated-tv-slider-section container'>
            <div className='top-rated-tv-heading'>
                <h3>Top Rated TV Series</h3>
                <p>See All</p>
            </div>
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {data?.map((movie: TopRatedTvData, index: number) => (
                        <div className='embla_slide movie-card-container' key={index}>
                            <div className='embla_slide_number upcoming-movie-card'>
                                <div className='upcoming-movie-poster'>
                                    <img src={`${image_url_300}${movie?.poster_path}`} alt="" />
                                </div>
                                <h6>{movie?.name}</h6>
                                <div className='upcoming-movie-date'>
                                    <p>{movie?.first_air_date || "NA"}</p>
                                    <div className='upcoming-movie-vote'>
                                        <Star size={18} fill='orange' color='orange' />
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

