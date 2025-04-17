import { useNavigate } from 'react-router-dom'
import '../../styles/not-found-page/not-found-page.css'


const NotFoundPage = () => {

    const navigate = useNavigate();

    const handlePage = () => {
        navigate('/');
    }

    return (
        <section className='not-found-container container'>
            <div className='not-found-page'>
                <div className='not_found_image'>
                    <img src="/404_page.jpg" alt="" />
                </div>
                <h1>It seems like you are on wrong page!</h1>
                <button className='home-page-btn' onClick={handlePage}>Go to Home Page</button>
            </div>
        </section>
    )
}

export default NotFoundPage
