import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
    EmblaCarouselType,
    EmblaEventType,
    EmblaOptionsType
} from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {
    NextButton,
    PrevButton,
    usePrevNextButtons
} from './poster-embla-carousel-arrow-btn'
import { useDotButton } from './poster-embla-carousel-dot-btn'
import { Circle } from 'lucide-react'
import { CircularProgress } from '@mui/material'

const TWEEN_FACTOR_BASE = 0.52

const numberWithinRange = (number: number, min: number, max: number): number =>
    Math.min(Math.max(number, min), max)

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

const PosterEmblaCarousel: React.FC<PropType> = (props) => {
    const { options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const tweenFactor = useRef(0)
    const tweenNodes = useRef<HTMLElement[]>([])
    const [imageLoading, setImageLoading] = useState(true)

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
        tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
            return slideNode.querySelector('.embla__slide__number') as HTMLElement
        })
    }, [])

    const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
        tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
    }, [])

    const tweenScale = useCallback(
        (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
            const engine = emblaApi.internalEngine()
            const scrollProgress = emblaApi.scrollProgress()
            const slidesInView = emblaApi.slidesInView()
            const isScrollEvent = eventName === 'scroll'

            emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
                let diffToTarget = scrollSnap - scrollProgress
                const slidesInSnap = engine.slideRegistry[snapIndex]

                slidesInSnap.forEach((slideIndex) => {
                    if (isScrollEvent && !slidesInView.includes(slideIndex)) return

                    if (engine.options.loop) {
                        engine.slideLooper.loopPoints.forEach((loopItem) => {
                            const target = loopItem.target()

                            if (slideIndex === loopItem.index && target !== 0) {
                                const sign = Math.sign(target)

                                if (sign === -1) {
                                    diffToTarget = scrollSnap - (1 + scrollProgress)
                                }
                                if (sign === 1) {
                                    diffToTarget = scrollSnap + (1 - scrollProgress)
                                }
                            }
                        })
                    }

                    const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
                    const scale = numberWithinRange(tweenValue, 0, 1).toString()
                    const tweenNode = tweenNodes.current[slideIndex]
                    tweenNode.style.transform = `scale(${scale})`
                })
            })
        },
        []
    )

    useEffect(() => {
        if (!emblaApi) return

        setTweenNodes(emblaApi)
        setTweenFactor(emblaApi)
        tweenScale(emblaApi)

        emblaApi
            .on('reInit', setTweenNodes)
            .on('reInit', setTweenFactor)
            .on('reInit', tweenScale)
            .on('scroll', tweenScale)
            .on('slideFocus', tweenScale)
    }, [emblaApi, tweenScale])

    const images: string[] = ["/home-page-carousel/poster-1.jpg", "/home-page-carousel/poster-2.jpg", "/home-page-carousel/poster-3.jpg", "/home-page-carousel/poster-4.jpg", "/home-page-carousel/poster-5.jpg", "/home-page-carousel/poster-6.jpg"]

    const handleImageLoad = () => {
        setImageLoading(false)
    }

    const handleImageError = () => {
        setImageLoading(false)
    }

    return (
        <div className="embla">
            <div className='embla-heading'><h2>Latest Movies</h2></div>
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {
                        images.map((image, index) => (
                            <div key={index} className={`embla__slide`} style={{
                                opacity: index === selectedIndex ? 1 : 0.5,
                                transition: 'opacity 0.3s ease'
                            }}>
                                <div className={`embla__slide__number`}>
                                    {imageLoading && <div style={{ position: 'absolute', top: "45%", right: "47%" }}><CircularProgress /></div>}
                                    <img src={image} onLoad={handleImageLoad} onError={handleImageError} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>

                <div className='embla_dots'>
                    {scrollSnaps.map((_, index) => (
                        <Circle color='white' size={15}
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={'embla__dot'.concat(
                                index === selectedIndex ? ' embla__dot--selected' : ''
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PosterEmblaCarousel
