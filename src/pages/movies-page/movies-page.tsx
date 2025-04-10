import { useInfiniteQuery } from '@tanstack/react-query';
import '../../styles/movies-page/movies-page.css';
import { useEffect, useRef } from 'react';
import axiosInstance from '../../axios/axios-instance';
import { Star } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import MoviePageSkeletonCard from '../../components/ui/movie-page-skeleton-card/movie-page-skeleton-card';


type MoviesPageData = {
  id: number;
  poster_path: string,
  title: string,
  release_date: string | number,
  vote_average: number,
}

const MoviesPage = () => {
  const api_key = import.meta.env.VITE_API_KEY;
  const image_url_300 = import.meta.env.VITE_MOVIE_IMAGE_BASE_URL_WIDTH_300;

  
  const fetchUpcomingMoviesData = async ({ pageParam = 1 }: any) => {
    const { pathname } = location;
    const response = await axiosInstance.get(
      `${pathname}?language=en-US&page=${pageParam}&api_key=${api_key}`
    );
    console.log(response?.data);
    return response?.data;
  };

  const { pathname } = location;

  const {
    data: moviesData,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['MoviesPageData', pathname],
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className='movies-page container'>

      <div className='movies-page-heading'>
        {pathname == '/movie/now_playing' && <p>Now Playing Movies</p>}
        {pathname == '/movie/popular' && <p>Popular Movies</p>}
        {pathname == '/movie/top_rated' && <p>Top Rated Movies</p>}
        {pathname == '/movie/upcoming' && <p>Up-Coming Movies</p>}
      </div>

      <div className='movies-container'>
        {/* <MoviePageSkeletonCard length={50}/> */}
        {moviesData?.pages.map((page, index) => (
          <div key={index} className='each-movie-page'>
            {page?.results.map((movie: MoviesPageData, index: number) => (
              <div key={index} className='movies-card'>
                <div className='movie-card-poster'><NavLink to={`/movie/detail/${movie?.id}`}><img src={`${image_url_300}${movie?.poster_path}`} alt="" /></NavLink></div>
                <h6>{movie?.title}</h6>
                <div className='movie-date-page'>
                  <p>{movie?.release_date}</p>
                  <div className='movie-vote'><Star size={18} fill='orange' color='orange' /><span>{(movie?.vote_average).toFixed(2)}</span></div>
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

