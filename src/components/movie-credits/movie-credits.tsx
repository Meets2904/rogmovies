import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios/axios-instance";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import '../../styles/movie-credits/movie-credits.css';

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
    movieID?: any
    tvshowID?: any
}

type CastData = {
    profile_path: string;
    name: string;
    known_for_department: string;
    character: string;
}


const MovieCredits = ({options, movieID, slides,tvshowID}: PropType) => {

    // const { options } = props
    const [emblaRef] = useEmblaCarousel(options)
    const api_key = import.meta.env.VITE_API_KEY;
    const image_url_200 = import.meta.env.VITE_MOVIE_IMAGE_BASE_URL_WIDTH_200


    const fetchMovieCredits = async () => {
        if (movieID) {
            try {
                const response = await axiosInstance.get(`movie/${movieID}/credits?language=en-US&api_key=${api_key}`)
                return response?.data.cast
            } catch (error) {
                console.log(error)
            }
        } else if (tvshowID){
            try {
                const response = await axiosInstance.get(`tv/${tvshowID}/credits?language=en-US&api_key=${api_key}`)
                return response?.data.cast
            } catch (error) {
                console.log(error)
            }
        }
    }

    const { data: castData } = useQuery({
        queryKey: ['movieCredits', movieID, tvshowID],
        queryFn: fetchMovieCredits,
    })

    if (!castData || castData?.length === 0) {
        return null;
      }


    return (
        <div className="movie-cast-container">
            <div className="movie-credits-heading"><h5>Full Cast</h5></div>
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {castData?.map((people: CastData, index: number) => (
                        <div className='embla_slide people-card-container' key={index}>
                            {people?.profile_path && <div className='embla_slide_number cast-card'>
                                <div className='cast-profile-photo'><img src={`${image_url_200}${people?.profile_path}`} alt="" /></div>
                                <h6>{people?.name}</h6>
                                <p>{people?.character}</p>
                            </div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieCredits;
