import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios/axios-instance";
import { EmblaOptionsType } from 'embla-carousel';
import { useState } from 'react'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from '../movie-videos/EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react'
import '../../styles/movie-videos/movie-videos.css';
import MovieVideoSkeleton from "../ui/movie-video-skeleton/movie-video-skeleton";
import { CircularProgress } from "@mui/material";


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

    const { options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const [imageLoading, setImageLoading] = useState(true)
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
        } else if (props?.tvshowID) {
            try {
                const response = await axiosInstance.get(`tv/${props?.tvshowID}/videos?language=en-US&api_key=${api_key}`)
                const data = (response?.data.results).slice(0, 6)
                return data
            } catch (error) {
                console.log(error)
            }
        }
    }


    const { data: moviesVideosData, isLoading } = useQuery({
        queryKey: ['movieVideosData', props?.movieID, props?.tvshowID],
        queryFn: fetchMovieVideos,
    })

    console.log("Videos", moviesVideosData)

    if (!moviesVideosData || moviesVideosData?.length === 0) {
        return null;
    }

    const length = moviesVideosData?.length

    const handleImageLoad = () => {
        setImageLoading(false)
    }

    const handleImageError = () => {
        setImageLoading(false)
    }
    return (
        <section className="embla movies-video-container">
            <div className="movie-videos-heading"><h5>Videos</h5></div>
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {isLoading && <MovieVideoSkeleton length={length} />}
                    {moviesVideosData?.map((video: MovieVideosData, index: number) => (
                        <div className="embla__slide" key={index}>
                            <div className="embla__slide__number video-card">
                                {imageLoading && <div style={{ position: 'absolute', top: "41%", right: "46%" }}><CircularProgress /></div>}
                                <iframe className="iframe-link" width="560" onLoad={handleImageLoad} onError={handleImageError} height="315" src={`https://www.youtube.com/embed/${video?.key}?si=T0MO0tgpCEsbwGjd`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></div>
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