import { Skeleton, Stack } from '@mui/material';
import '../../../styles/movie-page-skeleton-card/movie-page-skeleton-card.css'

type ProtoType = {
    length: number
}

const MoviePageSkeletonCard = (props: ProtoType) => {
    return Array(props?.length).fill(0).map((_, index) => (
        <Stack className='movie-page-skeleton-container' key={index}>
            <div className='movie-page-skeleton'>
                <Skeleton variant='rectangular' className='movie-page-skeleton-thumbnail' />
                <Skeleton variant='text' className='movie-page-skeleton-text' />
                <div className='movie-page-date-skeleton'>
                    <Skeleton variant='text' className='movie-page-skeleton-text' />
                    <Skeleton variant='text' className='movie-page-skeleton-text' />
                </div>
            </div>
        </Stack>
    ))
}

export default MoviePageSkeletonCard;
