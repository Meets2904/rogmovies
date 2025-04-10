import { useInfiniteQuery } from '@tanstack/react-query';
import '../../styles/tv-series-page/tv-series-page.css';
import axiosInstance from '../../axios/axios-instance';
import { Star } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';


type TvSeriesData = {
  id: number;
  poster_path: string,
  original_name: string,
  first_air_date: string | number,
  vote_average: number,
}

const TvSeriesPage = () => {
  const api_key = import.meta.env.VITE_API_KEY;
  const image_url_300 = import.meta.env.VITE_MOVIE_IMAGE_BASE_URL_WIDTH_300

  const fetchTopRatedTvData = async ({ pageParam = 1 }: any) => {
    const { pathname } = location;
    const response = await axiosInstance.get(`${pathname}?language=en-US&page=${pageParam}&api_key=${api_key}`);
    console.log(response?.data)
    return response?.data
  }

  const { pathname } = location;

  const { data: tvData, error, fetchNextPage, hasNextPage, isError, isLoading } = useInfiniteQuery({
    queryKey: ['tvSeriesPageData', pathname],
    queryFn: fetchTopRatedTvData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    }
  })

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
    return <div><p style={{color: 'white'}}>Loading...</p></div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className='top-rated-tv-page container'>

      <div className='top-rated-tv-page-heading'>
        {pathname == '/tv/airing_today' && <p>Airing Today Tv Series</p>}
        {pathname == '/tv/on_the_air' && <p>On The Air Tv Series</p>}
        {pathname == '/tv/popular' && <p>Popular Tv Series</p>}
        {pathname == '/tv/top_rated' && <p>Top-Rated Tv Series</p>}
      </div>

      <div className='all-top-rated-tv-container'>
        {tvData?.pages.map((page, index) => (
          <div key={index} className='top-rated-each-tv-page'>
            {page?.results.map((tv: TvSeriesData, index: number) => (
              <div key={index} className='top-rated-tv-card'>
                <div className='top-rated-tv-card-poster'><NavLink to={`/tv-show/detail/${tv?.id}`}><img src={`${image_url_300}${tv?.poster_path}`} alt="" /></NavLink></div>
                <h6>{tv?.original_name}</h6>
                <div className='top-rated-tv-date-page'>
                  <p>{tv?.first_air_date}</p>
                  <div className='top-rated-tv-vote'><Star size={18} fill='orange' color='orange' /><span>{(tv?.vote_average).toFixed(2)}</span></div>
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
  )
}

export default TvSeriesPage;
