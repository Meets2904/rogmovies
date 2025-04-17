import { useQuery } from '@tanstack/react-query';
import '../../styles/movie-reviews/movie-reviews.css';
import axiosInstance from '../../axios/axios-instance';
import ReactReadMoreReadLess from 'react-read-more-read-less';
type ProtoType = {
  movieID?: any
  tvshowID?: any
}

type MovieReviewData = {
  author: string;
  created_at: string;
  content: string;
}


const MovieReviews = ({ movieID, tvshowID }: ProtoType) => {

  const api_key = import.meta.env.VITE_API_KEY;

  // Function to fetch movie reviews
  const fetchMovieReviews = async () => {
    if (movieID) {
      try {
        const response = await axiosInstance.get(`movie/${movieID}/reviews?language=en-US&page=1&api_key=${api_key}`)
        return response?.data.results
      } catch (error) {
        console.error(error)
      }
    } else if (tvshowID) {
      try {
        const response = await axiosInstance.get(`tv/${tvshowID}/reviews?language=en-US&page=1&api_key=${api_key}`)
        return response?.data.results
      } catch (error) {
        console.error(error)
      }
    }
  }

  // React Query For Movie Review Data
  const { data: movieReviewsData } = useQuery({
    queryKey: ['movieReviewsData', movieID, tvshowID],
    queryFn: fetchMovieReviews,
  })


  // Function to formate the date
  const formatDate = (date: string) => {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  if (!movieReviewsData || movieReviewsData?.length === 0) {
    return null;
  }


  return (
    <section className='review-section container'>
      <div className='review-section-heading'><h5>Reviews</h5></div>
      <div className='reviews-container'>
        {movieReviewsData?.map((review: MovieReviewData, index: number) => (
          <div className='review-card' key={index}>
            <div className='review-card-heading'>
              <img src="/profile-picture.png" alt="" />
              <div className='reviewer-details'>
                <h6>{review?.author}</h6>
                <p>{formatDate(review?.created_at)}</p>
              </div>
            </div>

            <div className='review-card-content'>
              <ReactReadMoreReadLess charLimit={300}
                readMoreText={"Read more ▼"}
                readLessText={"Read less ▲"}
                readMoreClassName="read-more-less--more"
                readLessClassName="read-more-less--less" className='truncate-string'>{review?.content}</ReactReadMoreReadLess>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MovieReviews;
