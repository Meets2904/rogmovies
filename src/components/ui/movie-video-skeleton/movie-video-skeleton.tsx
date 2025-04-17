import '../../../styles/movie-video-skeleton/movie-video-skeleton.css'
import { Skeleton, Stack } from '@mui/material';

type ProtoType = {
    length: number
}

const MovieVideoSkeleton = ({ length }: ProtoType) => {
    return Array(length).fill(0).map((_, index) => (
        <Stack className='movie-video-skeleton-container' key={index}>
            <div className='movie-video-skeleton'>
                <Skeleton variant='rectangular' className='movie-video-skeleton-box' />
            </div>
        </Stack>
    ))
}

export default MovieVideoSkeleton;
