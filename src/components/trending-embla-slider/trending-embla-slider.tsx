import { useState } from 'react'
import '../../styles/trending-embla-slider/trending-embla-slider.css'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import axiosInstance from '../../axios/axios-instance'
import { Star } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

type TrendingMovieData = {
  poster_path: string;
  title: string;
  release_date: string | number;
  vote_average: number;
}

const TrendingEmblaSlider = (props: PropType) => {

  const { options } = props
  const [emblaRef] = useEmblaCarousel(options)
  const [timeFrame, setTimeFrame] = useState('day');
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

  const { isLoading, error, data: trendingData } = useQuery({
    queryKey: ['trendingItemsData'],
    queryFn: fetchTrendingItemsByDay,
  })


  return (
    <section className='trending-section-container container'>
      <div className='trending-movies-heading'>
        <h3>Trending Movies & TV Shows</h3>
        <div className='day-week-toggle-btn'>
          <button className={`day-btn ${timeFrame == 'day' ? 'clicked' : ''}`} onClick={() => setTimeFrame('day')}>Today</button>
          <button className={`week-btn ${timeFrame == 'week' ? 'clicked' : ''}`} onClick={() => setTimeFrame('week')}>This Week</button>
        </div>
      </div>

      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {trendingData?.map((movie: TrendingMovieData, index: number) => (
            <div className='embla_slide movie-card-container' key={index}>
              <div className='embla_slide_number upcoming-movie-card'>
                <div className='upcoming-movie-poster'><img src={`${image_url_300}${movie?.poster_path}`} alt="" /></div>
                <h6>{movie?.title}</h6>
                <div className='upcoming-movie-date'>
                  <p>{movie?.release_date}</p>
                  <div className='upcoming-movie-vote'><Star size={18} fill='orange' color='orange' /><span>{movie?.vote_average}</span></div>
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
