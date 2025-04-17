import { Skeleton, Stack } from '@mui/material';
import '../../../styles/movie-tv-skeleton/movie-tv-skeleton.css'

type ProtoType = {
    length?: number
}

const MovieTvDetailSkeleton = ({ length }: ProtoType) => {
    return Array(length).fill(0).map((_, index) => (
        <Stack className='movie-tv-skeleton-container' key={index}>
            <div className='movie-tv-skeleton'>
                <Skeleton variant='rectangular' className='movie-tv-skeleton-thumbnail' />
                <div className='movie-tv-details-skeleton-container'>
                    <Skeleton variant='text' className='movie-tv-skeleton-text' />
                    <Skeleton variant='text' className='movie-tv-skeleton-text' />
                    <div className='movie-tv-genre-skeleton'>
                        <Skeleton variant='text' className='movie-tv-skeleton-text' />
                        <Skeleton variant='text' className='movie-tv-skeleton-text' />
                        <Skeleton variant='text' className='movie-tv-skeleton-text' />
                        <Skeleton variant='text' className='movie-tv-skeleton-text' />
                    </div>
                    <Skeleton variant='text' className='movie-tv-overview-skeleton-text' />
                    <Skeleton variant='text' className='movie-tv-overview-skeleton-text' />
                    <Skeleton variant='text' className='movie-tv-overview-skeleton-text' />
                    <Skeleton variant='text' className='movie-tv-btn-skeleton-text' />
                </div>
            </div>
        </Stack>
    ))
}

export default MovieTvDetailSkeleton;
