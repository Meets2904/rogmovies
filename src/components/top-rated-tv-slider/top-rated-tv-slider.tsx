import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import  { useEffect, useState } from 'react'
import axiosInstance from '../../axios/axios-instance'
import { Star } from 'lucide-react'
import '../../styles/top-rated-tv-slider/top_rated_tv_slider.css'


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
    const [tvData, setTvData] = useState([]);
    const api_key = import.meta.env.VITE_API_KEY;
    const image_url_300 = import.meta.env.VITE_MOVIE_IMAGE_BASE_URL_WIDTH_300

    const fetchPersonDetails = async () => {
        await axiosInstance.get(`tv/top_rated?language=en-US&page=1&api_key=${api_key}`)
        .then((response) => {
            console.log("Top Rated TV Series Data",response.data.results);
            setTvData(response.data.results);
        })
        .catch((error) => {
            console.log("Error", error)
        })
    }

    useEffect(()=> {
        fetchPersonDetails();
    }, [])

    return (
        <section className='top-rated-tv-slider-section container'>
            <div className='top-rated-tv-heading'>
                <h3>Top Rated TV Series</h3>
                <p>See All</p>
            </div>
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {tvData?.map((movie: TopRatedTvData, index) => (
                        <div className='embla_slide movie-card-container' key={index}>
                            <div className='embla_slide_number upcoming-movie-card'>
                                <div className='upcoming-movie-poster'><img src={`${image_url_300}${movie?.poster_path}`} alt="" /></div>
                                <h6>{movie?.name}</h6>
                                <div className='upcoming-movie-date'>
                                    <p>{movie?.first_air_date}</p>
                                    <div className='upcoming-movie-vote'><Star size={18} fill='orange' color='orange' /><span>{(movie?.vote_average).toFixed(2)}</span></div>
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
