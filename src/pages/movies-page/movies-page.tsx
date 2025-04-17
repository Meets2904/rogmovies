import { useInfiniteQuery } from '@tanstack/react-query';
import '../../styles/movies-page/movies-page.css';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../../axios/axios-instance';
import { Star } from 'lucide-react';
import { NavLink, useParams } from 'react-router-dom';
import MoviePageSkeletonCard from '../../components/ui/movie-page-skeleton-card/movie-page-skeleton-card';
import { CircularProgress } from '@mui/material';


type MoviesPageData = {
  id: number;
  poster_path: string,
  title: string,
  release_date: string | number,
  vote_average: number,
  original_name: string,
  first_air_date: string | number,
}

const MoviesPage = () => {
  const [imageLoading, setImageLoading] = useState(true)
  const api_key = import.meta.env.VITE_API_KEY;
  const image_url_300 = import.meta.env.VITE_MOVIE_IMAGE_BASE_URL_WIDTH_300;
  const params = useParams();

  // Function to fetch movies data
  const fetchUpcomingMoviesData = async ({ pageParam = 1 }: any) => {
    if (params?.category) {
      try {
        const response = await axiosInstance.get(
          `movie/${params?.category}?language=en-US&page=${pageParam}&api_key=${api_key}`
        );
        return response?.data;
      } catch (error) {
        console.error(error)
      }
    } else if (params?.list) {
      try {
        const response = await axiosInstance.get(
          `tv/${params?.list}?language=en-US&page=${pageParam}&api_key=${api_key}`
        );
        return response?.data;
      } catch (error) {
        console.error(error)
      }
    }
  };

  const {
    data: moviesData,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['MoviesPageData', params?.category, params?.list],
    queryFn: fetchUpcomingMoviesData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });

  // Ref for the "loader" div that will trigger fetching more data
  const loaderRef = useRef(null);

  // IntersectionObserver to load more data when reaching the bottom of the page
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage(); // Fetch next page when the loader is in view
        }
      },
      {
        rootMargin: '100px', // Trigger when 100px from the bottom
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current); // Observe the loader
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current); // Clean up observer
      }
    };
  }, [fetchNextPage, hasNextPage]);


  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageLoading(false)
  }

  const { pathname } = location


  return (
    <section className='movies-page container'>

      <div className='movies-page-heading'>
        {pathname == '/movie/now_playing' && <p>Now Playing Movies</p>}
        {pathname == '/movie/popular' && <p>Popular Movies</p>}
        {pathname == '/movie/top_rated' && <p>Top Rated Movies</p>}
        {pathname == '/movie/upcoming' && <p>Up-Coming Movies</p>}
        {pathname == '/tv/airing_today' && <p>Airing Today Tv Series</p>}
        {pathname == '/tv/on_the_air' && <p>On The Air Tv Series</p>}
        {pathname == '/tv/popular' && <p>Popular Tv Series</p>}
        {pathname == '/tv/top_rated' && <p>Top-Rated Tv Series</p>}
      </div>

      {isError && <div style={{ color: 'white', fontSize: '25px' }}>Currently Data Is Not Available</div>}
      <div className='movies-container'>
        {moviesData?.pages.map((page, index) => (
          <div key={index} className='each-movie-page'>
            {isLoading && <MoviePageSkeletonCard length={page?.results.length} />}
            {page?.results.map((movie: MoviesPageData, index: number) => (
              movie?.poster_path && <div key={index} className='movies-card'>
                <div className='movie-card-poster'>
                  <NavLink to={`${params?.category ? `/movie/detail/${movie?.id}` : `/tv-show/detail/${movie?.id}`}`}>
                    {imageLoading && <div style={{ position: 'absolute', top: "45%", right: "40%" }}><CircularProgress /></div>}
                    <img src={`${image_url_300}${movie?.poster_path}`} onLoad={handleImageLoad} onError={handleImageError} alt={movie?.title} />
                  </NavLink>
                </div>
                <h6>{movie?.title || movie?.original_name || 'NA'}</h6>
                <div className='movie-date-page'>
                  <p>{movie?.release_date || movie?.first_air_date || 'NA'}</p>
                  <div className='movie-vote'><Star size={18} fill='orange' color='orange' className='star' /><span>{(movie?.vote_average).toFixed(2) || 'NA'}</span></div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {hasNextPage &&
        (<div ref={loaderRef} style={{ height: '20px', backgroundColor: 'transparent' }} />)
      }
    </section>
  );
};

export default MoviesPage;

