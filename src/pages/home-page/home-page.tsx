// import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import '../../styles/poster-embla-carousel/poster-embla-carousel-base.css';
import '../../styles/poster-embla-carousel/poster-embla-carousel-embla.css'
import PosterEmblaCarousel from '../../components/ui/poster-carousel-home-page/poster-embla-carousel';
import UpcomingMoviesSlider from '../../components/upcoming-movies-embla-slider/upcoming-movies-slider';
import TrendingEmblaSlider from '../../components/trending-embla-slider/trending-embla-slider';
import TopRatedTvSlider from '../../components/top-rated-tv-slider/top-rated-tv-slider';
import TrendingPeopleSlider from '../../components/trending-people-slider/trending-people-slider';

const HomePage = () => {

    // Home Page Carousel
    const OPTIONS: EmblaOptionsType = { loop: true }
    const SLIDE_COUNT = 5
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

    // Trending Movies and Series Slider
    const trending_options: EmblaOptionsType = { dragFree: true }
    const trending_slide_count = 20
    const trending_slides = Array.from(Array(trending_slide_count).keys())

    // Upcoming Movies Slider
    const upcomin_options: EmblaOptionsType = { dragFree: true }
    const upcoming_slide_count = 20
    const upcoming_slides = Array.from(Array(upcoming_slide_count).keys())

    // Trending People Slider
    const trending_people_options: EmblaOptionsType = { dragFree: true }
    const trending_people_slide_count = 20
    const trending_people_slides = Array.from(Array(trending_people_slide_count).keys())

    // Top Rated TV Series Slider
    const top_rated_tv_options: EmblaOptionsType = { dragFree: true }
    const top_rated_tv_slide_count = 20
    const top_rated_tv_slides = Array.from(Array(top_rated_tv_slide_count).keys())

    return (
        <>
            <PosterEmblaCarousel slides={SLIDES} options={OPTIONS}/>
            <TrendingEmblaSlider slides={trending_slides} options={trending_options}/>
            <UpcomingMoviesSlider slides={upcoming_slides} options={upcomin_options}/>
            <TrendingPeopleSlider slides={trending_people_slides} options={trending_people_options}/>
            <TopRatedTvSlider slides={top_rated_tv_slides} options={top_rated_tv_options} />
        </>
    )
}

export default HomePage
