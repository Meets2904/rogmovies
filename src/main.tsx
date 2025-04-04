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
