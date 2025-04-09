import { useQuery } from '@tanstack/react-query';
import '../../styles/movie-reviews/movie-reviews.css';
import axiosInstance from '../../axios/axios-instance';
import ReactReadMoreReadLess from 'react-read-more-read-less';

type ProtoType ={
  movieID?: any
  tvshowID?: any
}

type MovieReviewData = {
  author: string;
  created_at: string;
  content: string;
}


const MovieReviews = (props: ProtoType) => {

  const api_key = import.meta.env.VITE_API_KEY;

  const fetchMovieReviews = async () => {
    if (props?.movieID) {
      try {
        const response = await axiosInstance.get(`movie/${props?.movieID}/reviews?language=en-US&page=1&api_key=${api_key}`)
        return response?.data.results
      } catch (error) {
        console.log(error)
      }
    }else if(props?.tvshowID){
      try {
        const response = await axiosInstance.get(`tv/${props?.tvshowID}/reviews?language=en-US&page=1&api_key=${api_key}`)
        return response?.data.results
      } catch (error) {
        console.log(error)
      }
    }
  }

  const { data: movieReviewsData } = useQuery({
    queryKey: ['movieReviewsData', props?.movieID, props?.tvshowID],
    queryFn: fetchMovieReviews,
  })



  const formatDate = (date: string) => {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  console.log("Reviews", movieReviewsData)

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
                <img src="../../../src/assets/images/review_profile.png" alt="" />
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
