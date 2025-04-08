import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './styles/style.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProfilePage from './pages/profile-page/profile-page.tsx';
import LoginPage from './pages/login-page/login-page.tsx';
import HomePage from './pages/home-page/home-page.tsx';
import NotFoundPage from './pages/not-found-page/not-found-page.tsx';
import WatchListPage from './pages/watchlist-page/watchlist-page.tsx';
import UpcomingMoviesPage from './pages/upcoming-movies-page/upcoming-movies-page.tsx';
import TopRatedTvPage from './pages/top-rated-tv-series-page/top-rated-tv-page.tsx';
import MovieDetailPage from './pages/movie-detail-page/movie-detail-page.tsx';
import TvDetailPge from './pages/tv-detail-page/tv-detail-page.tsx';


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        path: '/',
        element: <HomePage/>
      },
      {
        path: '/profile',
        element: <ProfilePage/>
      },
      {
        path: '/approved',
        element: <HomePage />,
      },
      {
        path: '/watchlist-page',
        element: <WatchListPage />,
      },
      {
        path: '/upcoming-movies-page',
        element: <UpcomingMoviesPage />,
      },
      {
        path: '/top-rated-tv-series',
        element: <TopRatedTvPage />
      },
      {
        path: '/movie/detail/:movieID',
        element: <MovieDetailPage />
      },
      {
        path: '/tv-show/detail/:tvshowID',
        element: <TvDetailPge />
      },
    ]
  },
  {
    path: '/login',
    element: <LoginPage/> 
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
