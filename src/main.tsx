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
import MovieDetailPage from './pages/movie-detail-page/movie-detail-page.tsx';
import { Analytics } from "@vercel/analytics/react" 
import { SpeedInsights } from "@vercel/speed-insights/react"


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
        path: '/approved',
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
        path: '/movie/:category',
        element: <MoviesPage />,
      },
      {
        path: '/tv/:list',
        element: <MoviesPage/>
      },
      {
        path: '/movie/detail/:movieID',
        element: <MovieDetailPage />
      },
      {
        path: '/tv-show/detail/:tvshowID',
        element: <MovieDetailPage />
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
      <Analytics />
      <SpeedInsights />
    </QueryClientProvider>
  </StrictMode>,
)
