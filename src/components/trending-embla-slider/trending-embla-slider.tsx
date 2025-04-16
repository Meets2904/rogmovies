import { useState } from 'react'
import '../../styles/trending-embla-slider/trending-embla-slider.css'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import axiosInstance from '../../axios/axios-instance'
import { Star } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { NavLink } from 'react-router-dom'
import MovieSkeletonCard from '../ui/movie-skeleton-card/movie-skeleton-card'
import { CircularProgress } from '@mui/material'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

type TrendingMovieData = {
  id: number;
  poster_path: string;
  title: string;
  release_date: string | number;
  vote_average: number;
}

const TrendingEmblaSlider = (props: PropType) => {

  const { options } = props
  const [emblaRef] = useEmblaCarousel(options)
  const [timeFrame, setTimeFrame] = useState('day');
  const [imageLoading, setImageLoading] = useState(true)
  const api_key = import.meta.env.VITE_API_KEY;
  const image_url_300 = import.meta.env.VITE_MOVIE_IMAGE_BASE_URL_WIDTH_300;

  const fetchTrendingItemsByDay = async () => {
    if (timeFrame == 'day') {
      try {
        const response = await axiosInstance.get(`trending/movie/day?language=en-US&page=1&api_key=${api_key}`)
        console.log("Treding Items Data For Today", response?.data.results)
        const data = response?.data.results;
        return data;
      } catch (error) {
        console.log(error)
      }
    } else if (timeFrame == 'week') {
      try {
        const response = await axiosInstance.get(`trending/movie/week?language=en-US&page=1&api_key=${api_key}`)
        console.log("Treding Items Data For This Week", response?.data.results)
        const data = response?.data.results
        return data;
      } catch (error) {
        console.log(error)
      }
    }
  }

  const { isLoading, isError, data: trendingData } = useQuery({
    queryKey: ['trendingItemsData', timeFrame],
    queryFn: fetchTrendingItemsByDay,
  })

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageLoading(false)
  }



  return (
    <section className='trending-section-container container'>
      <div className='trending-movies-heading'>
        <h3>Trending Movies & TV Shows</h3>
        <div className='day-week-toggle-btn'>
          <button className={`day-btn ${timeFrame == 'day' ? 'clicked' : ''}`} onClick={() => setTimeFrame('day')}>Today</button>
          <button className={`week-btn ${timeFrame == 'week' ? 'clicked' : ''}`} onClick={() => setTimeFrame('week')}>This Week</button>
        </div>
      </div>

      {isError && <div style={{ color: 'white', fontSize: '25px' }}>Currently Data Is Not Available</div>}
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {isLoading && <MovieSkeletonCard length={20} />}
          {trendingData?.map((movie: TrendingMovieData, index: number) => (
            <div className='embla_slide movie-card-container' key={index}>
              <div className='embla_slide_number upcoming-movie-card'>
                <div className='upcoming-movie-poster'><NavLink to={`/movie/detail/${movie?.id}`}>
                  {imageLoading && <div style={{ position: 'absolute', top: "45%", right: "40%" }}><CircularProgress /></div>}
                  <img src={`${image_url_300}${movie?.poster_path}`} onLoad={handleImageLoad} onError={handleImageError} alt="" />
                </NavLink></div>
                <h6>{movie?.title || 'NA'}</h6>
                <div className='upcoming-movie-date'>
                  <p>{movie?.release_date || 'NA'}</p>
                  <div className='upcoming-movie-vote'><Star size={18} fill='orange' color='orange' className='star' /><span>{movie?.vote_average || 'NA'}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingEmblaSlider
