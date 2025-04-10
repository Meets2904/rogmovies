import React from 'react'
import { Skeleton, Stack } from '@mui/material';
import '../../../styles/movie-page-skeleton-card/movie-page-skeleton-card.css'

type ProtoType = {
    length: number
}

const MoviePageSkeletonCard = (props: ProtoType) => {
    return Array(props?.length).fill(0).map((_, index) => (
        <Stack className='movie-skeleton-container' key={index}>
            <div className='movie-skeleton'>
                <Skeleton variant='rectangular' className='movie-skeleton-thumbnail' />
                <Skeleton variant='text' className='movie-skeleton-text' />
                <div className='movie-date-skeleton'>
                    <Skeleton variant='text' className='movie-skeleton-text' />
                    <Skeleton variant='text' className='movie-skeleton-text' />
                </div>
            </div>
        </Stack>
    ))
}

export default MoviePageSkeletonCard;
