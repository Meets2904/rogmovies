import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { useState } from 'react'
import axiosInstance from '../../axios/axios-instance'
import '../../styles/people-slider/people-slider.css';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import PeopleSliderSkeleton from '../ui/people-slider-skeleton/people-slider-skeleton';

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
    movieID?: any
    tvshowID?: any
}

type PeopleData = {
    profile_path: string;
    original_name: string;
    known_for_department: string;
}

const PeopleSlider = ({ options, movieID, tvshowID }: PropType) => {

    const [emblaRef] = useEmblaCarousel(options)
    const [imageLoading, setImageLoading] = useState(true)
    const api_key = import.meta.env.VITE_API_KEY;
    const image_url_200 = import.meta.env.VITE_MOVIE_IMAGE_BASE_URL_WIDTH_200

    // Function to fetch people data
    const fetchPeopleData = async () => {
        if (movieID) {
            try {
                const response = await axiosInstance.get(`movie/${movieID}/credits?language=en-US&api_key=${api_key}`)
                return response?.data.cast
            } catch (error) {
                console.error(error)
            }
        } else if (tvshowID) {
            try {
                const response = await axiosInstance.get(`tv/${tvshowID}/credits?language=en-US&api_key=${api_key}`)
                return response?.data.cast
            } catch (error) {
                console.error(error)
            }
        } else {
            try {
                const response = await axiosInstance.get(`trending/person/day?language=en-US&api_key=${api_key}`)
                console.log("Trending People Data", response?.data.results)
                const data = response?.data.results;
                return data;
            } catch (error) {
                console.log(error)
            }
        }
    }

    // React Query for people slider data
    const { isLoading, isError, data: peopleData } = useQuery({
        queryKey: ['PeopleSliderData', movieID, tvshowID],
        queryFn: fetchPeopleData
    })

    // Image Loading Handler
    const handleImageLoad = () => {
        setImageLoading(false)
    }

    const handleImageError = () => {
        setImageLoading(false)
    }

    const length = peopleData?.length

    if (!peopleData || peopleData?.length === 0) {
        return null;
    }

    return (
        <section className='trending-people-section container'>
            <div className='trending-people-section-heading'>
                <h3>Trending People</h3>
            </div>
            {isError && <div style={{ color: 'white', fontSize: '25px' }}>Currently Data Is Not Available</div>}
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {isLoading && <PeopleSliderSkeleton length={length} />}
                    {peopleData?.map((people: PeopleData, index: number) => (
                        <div className='embla_slide people-card-container' key={index}>
                            {people?.profile_path && <div className='embla_slide_number people-card'>
                                <div className='people-profile-photo'>
                                    {imageLoading && <div style={{ position: 'absolute', top: "55px", right: '55px' }}><CircularProgress /></div>}
                                    <img src={`${image_url_200}${people?.profile_path}`} onLoad={handleImageLoad} onError={handleImageError} alt="" /></div>
                                <h6>{people?.original_name}</h6>
                                <p>{people?.known_for_department}</p>
                            </div>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PeopleSlider
