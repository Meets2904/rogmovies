import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from 'react'
import axiosInstance from '../../axios/axios-instance'
import '../../styles/trending-people-slider/trending_people_slider.css';
import { useQuery } from '@tanstack/react-query';

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

type PeopleData = {
    profile_path: string;
    original_name: string;
    known_for_department: string;
}

const TrendingPeopleSlider = (props: PropType) => {

    const { options } = props
    const [emblaRef] = useEmblaCarousel(options)
    const api_key = import.meta.env.VITE_API_KEY;
    const image_url_200 = import.meta.env.VITE_MOVIE_IMAGE_BASE_URL_WIDTH_200

    const fetchPeopleData = async () => {
        try {
            const response = await axiosInstance.get(`trending/person/day?language=en-US&api_key=${api_key}`)
            console.log("Trending People Data", response?.data.results)
            const data = response?.data.results;
            return data;
        } catch (error) {
            console.log(error)
        }
    }


    const { isLoading, error, data: peopleData } = useQuery({
        queryKey: ['TrendingPeopleSliderData'],
        queryFn: fetchPeopleData
    })

    return (
        <section className='trending-people-section container'>
            <div className='trending-people-section-heading'>
                <h3>Trending People</h3>
                <p>See All</p>
            </div>
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {peopleData?.map((people: PeopleData, index: number) => (
                        <div className='embla_slide people-card-container' key={index}>
                            {people?.profile_path && <div className='embla_slide_number people-card'>
                                <div className='people-profile-photo'><img src={`${image_url_200}${people?.profile_path}`} alt="" /></div>
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

export default TrendingPeopleSlider
