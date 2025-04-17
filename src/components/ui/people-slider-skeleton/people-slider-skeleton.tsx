import '../../../styles/people-slider-skeleton/people-slider-skeleton.css';
import { Skeleton, Stack } from '@mui/material';

type ProtoType = {
    length: number
}

const PeopleSliderSkeleton = ({ length }: ProtoType) => {
    return Array(length).fill(0).map((_, index) => (
        <Stack className='people-slider-skeleton-container' key={index}>
            <div className='people-slider-skeleton'>
                <Skeleton variant='rectangular' className='people-slider-skeleton-thumbnail' />
                <Skeleton variant='text' className='people-slider-skeleton-text' />
                <Skeleton variant='text' className='people-slider-skeleton-text' />
            </div>
        </Stack>
    ))
}

export default PeopleSliderSkeleton;
