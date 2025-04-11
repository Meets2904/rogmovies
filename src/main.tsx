import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './styles/style.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ProfilePage from './pages/profile-page/profile-page.tsx';
import LoginPage from './pages/login-page/login-page.tsx';
import HomePage from './pages/home-page/home-page.tsx';
import NotFoundPage from './pages/not-found-page/not-found-page.tsx';
import WatchListPage from './pages/watchlist-page/watchlist-page.tsx';
import MoviesPage from './pages/movies-page/movies-page.tsx';
import TvSeriesPage from './pages/tv-series-page/tv-series-page.tsx';
import MovieDetailPage from './pages/movie-detail-page/movie-detail-page.tsx';
import TvDetailPge from './pages/tv-detail-page/tv-detail-page.tsx';


const queryClient = new QueryClient();

const session_id = localStorage.getItem('sessionId');

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
        element: session_id ? <WatchListPage /> : <Navigate replace to={'/'}/>,
      },
      {
        path: 'movie/upcoming',
        element: <MoviesPage />,
      },
      {
        path: 'movie/now_playing',
        element: <MoviesPage/>
      },
      {
        path: '/movie/popular',
        element: <MoviesPage/>
      },
      {
        path: '/movie/top_rated',
        element: <MoviesPage/>
      },
      {
        path: '/tv/airing_today',
        element: <TvSeriesPage />
      },
      {
        path: '/tv/on_the_air',
        element: <TvSeriesPage />
      },
      {
        path: '/tv/popular',
        element: <TvSeriesPage />
      },
      {
        path: 'tv/top_rated',
        element: <TvSeriesPage />
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
    element: session_id ? <Navigate replace to={'/'}/> : <LoginPage/>
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
