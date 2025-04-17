// import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import '../../styles/poster-embla-carousel/poster-embla-carousel-base.css';
import '../../styles/poster-embla-carousel/poster-embla-carousel-embla.css'
import PosterEmblaCarousel from '../../components/ui/poster-carousel-home-page/poster-embla-carousel';
import TrendingEmblaSlider from '../../components/trending-embla-slider/trending-embla-slider';
import MoviesTVSlider from '../../components/movies-tv-embla-slider/movies-tv-slider';
import PeopleSlider from '../../components/people-slider/people-slider';

const HomePage = () => {

    // Home Page Carousel
    const options: EmblaOptionsType = { loop: true }
    const slide_count = 5
    const slides = Array.from(Array(slide_count).keys())

    // Trending Movies and Series Slider
    const trending_options: EmblaOptionsType = { dragFree: true }
    const trending_slide_count = 20
    const trending_slides = Array.from(Array(trending_slide_count).keys())

    // Movies Tv Slider
    const movies_tv_slider_options: EmblaOptionsType = { dragFree: true }
    const movies_tv_slider_slide_count = 20
    const movies_tv_slider_slides = Array.from(Array(movies_tv_slider_slide_count).keys())

    // Trending People Slider
    const trending_people_options: EmblaOptionsType = { dragFree: true }
    const trending_people_slide_count = 20
    const trending_people_slides = Array.from(Array(trending_people_slide_count).keys())


    return (
        <>
            <PosterEmblaCarousel slides={slides} options={options} />
            <TrendingEmblaSlider slides={trending_slides} options={trending_options} />
            <MoviesTVSlider slides={movies_tv_slider_slides} options={movies_tv_slider_options} path={'movie/upcoming'} />
            <PeopleSlider slides={trending_people_slides} options={trending_people_options} />
            <MoviesTVSlider slides={movies_tv_slider_slides} options={movies_tv_slider_options} path={'tv/top_rated'} />
        </>
    )
}

export default HomePage
