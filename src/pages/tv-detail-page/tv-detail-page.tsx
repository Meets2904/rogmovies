import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios/axios-instance';
import '../../styles/movie-detail-page/movie-detail-page.css'
import MovieCredits from '../../components/movie-credits/movie-credits';
import { EmblaOptionsType } from 'embla-carousel';
import MovieVideos from '../../components/movie-videos/movie-videos';
import MovieReviews from '../../components/movie-reviews/movie-reviews';
import MovieRecommendations from '../../components/movie-recommendations/movie-recommendations';
import AddWatchlistBtn from '../../components/ui/add-to-watchlist-btn/add-to-watchlist-btn';

// Movie Credits Slider
const movie_cast_options: EmblaOptionsType = { dragFree: true }
const movie_cast_slide_count = 20
const movie_cast_slides = Array.from(Array(movie_cast_slide_count).keys())

// Movie Videos Slider
const movie_videos_options: EmblaOptionsType = { align: 'start' }
const movie_videos_slide_count = 6
const movie_videos_slides = Array.from(Array(movie_videos_slide_count).keys())

// Movie Recommendations Slider
const movie_recommendations_options: EmblaOptionsType = { dragFree: true }
const movie_recommendations_slide_count = 20
const movie_recommendations_slides = Array.from(Array(movie_recommendations_slide_count).keys())

const TvDetailPge = () => {
  const params = useParams();
  const api_key = import.meta.env.VITE_API_KEY;
  const background_image_url = import.meta.env.VITE_BACKGROUND_IMAGE_URL;
  const image_url_300 = import.meta.env.VITE_MOVIE_IMAGE_BASE_URL_WIDTH_300;

  const fetchTvShowDetails = async () => {
    try {
      const response = await axiosInstance.get(`tv/${params?.tvshowID}?language=en-US&api_key=${api_key}`)
      return response?.data
    } catch (error) {
      console.log(error)
    }
  }

  const { data: tvDetailsData} = useQuery({
    queryKey: ['tvShowDetails', params?.tvshowID],
    queryFn: fetchTvShowDetails,
  })

  console.log(tvDetailsData)

  return (
    <section className='movie-details-section'>
            <div className='movie-background-poster'>
                <img src={`${background_image_url}${tvDetailsData?.backdrop_path}`} alt="" />
            </div>
            <div className='movie-detail-page-container container'>
                <div className='movie-detail-card'>
                    <div className='movie-detail-card-poster'><img src={`${image_url_300}${tvDetailsData?.poster_path}`} alt="" /></div>
                    <div className='movie-details'>
                        <h2>{tvDetailsData?.original_name}</h2>
                        <p className='movie-release-date'>{tvDetailsData?.release_date}</p>
                        <div className='movie-genre-container'>{tvDetailsData?.genres.map((genre: any, index: number) => (
                            <p key={index}>{genre?.name}</p>
                        ))}</div>
                        <p className='movie-overview-detail'>{tvDetailsData?.overview}</p>
                        <AddWatchlistBtn tvshowID={params?.tvshowID}/>
                    </div>
                </div>

                <div className='movie-full-cast'>
                    <MovieCredits  tvshowID={params?.tvshowID} slides={movie_cast_slides} options={movie_cast_options}/>
                </div>

                <div className='movie-videos'>
                        <MovieVideos tvshowID={params?.tvshowID} slides={movie_videos_slides} options={movie_videos_options}/>
                </div>

                <div className='movie-reviews'>
                        <MovieReviews tvshowID={params?.tvshowID}/>
                </div>

                <div className='movie-recommendations'>
                        <MovieRecommendations tvshowID={params?.tvshowID} slides={movie_recommendations_slides} options={movie_recommendations_options}/>
                </div>
            </div>
        </section>
  )
}

export default TvDetailPge;
