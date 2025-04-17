import { Skeleton, Stack } from '@mui/material';
import '../../../styles/movie-skeleton-card/movie-skeleton-card.css'

type ProtoType = {
    length: number
}

const MovieSkeletonCard = ({ length }: ProtoType) => {
    return Array(length).fill(0).map((_, index) => (
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

export default MovieSkeletonCard;
