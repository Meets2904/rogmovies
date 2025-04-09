import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios/axios-instance";
import { EmblaOptionsType } from 'embla-carousel';
import React from 'react'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from '../movie-videos/EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react'
import '../../styles/movie-videos/movie-videos.css';


type PropType = {
    slides: number[]
    options?: EmblaOptionsType
    movieID?: any
    tvshowID?: any
}

type MovieVideosData = {
    key: string;
}

const MovieVideos = (props: PropType) => {

    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const api_key = import.meta.env.VITE_API_KEY;

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)


    const fetchMovieVideos = async () => {
        if (props?.movieID) {
            try {
                const response = await axiosInstance.get(`movie/${props?.movieID}/videos?language=en-US&api_key=${api_key}`)
                const data = (response?.data.results).slice(0, 6)
                return data
            } catch (error) {
                console.log(error)
            }
        }else if (props?.tvshowID) {
            try {
                const response = await axiosInstance.get(`tv/${props?.tvshowID}/videos?language=en-US&api_key=${api_key}`)
                const data = (response?.data.results).slice(0, 6)
                return data
            } catch (error) {
                console.log(error)
            }
        }
    }


    const { data: moviesVideosData } = useQuery({
        queryKey: ['movieVideosData', props?.movieID, props?.tvshowID],
        queryFn: fetchMovieVideos,
    })

    console.log("Videos", moviesVideosData)

    if (!moviesVideosData || moviesVideosData?.length === 0) {
        return null;
      }
    return (
        <section className="embla movies-video-container">
            <div className="movie-videos-heading"><h5>Videos</h5></div>
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {moviesVideosData?.map((video:MovieVideosData,index:number) => (
                        <div className="embla__slide" key={index}>
                            <div className="embla__slide__number video-card"><iframe className="iframe-link" width="560" height="315" src={`https://www.youtube.com/embed/${video?.key}?si=T0MO0tgpCEsbwGjd`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>
            </div>
        </section>
    )
}

export default MovieVideos;