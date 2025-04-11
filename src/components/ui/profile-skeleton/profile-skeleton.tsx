import '../../../styles/profile-skeleton/profile-skeleton.css';
import { Skeleton, Stack } from '@mui/material';


const ProfileSkeleton = () => {
    return (
        <Stack className='profile-page-skeleton-container'>
            <div className='profile-page-skeleton'>
                <Skeleton variant='rectangular' className='profile-page-skeleton-thumbnail' />
                <Skeleton variant='text' className='profile-page-skeleton-text' />
                <Skeleton variant='text' className='profile-page-skeleton-text' />
                <Skeleton variant='text' className='profile-page-skeleton-text' />
                <Skeleton variant='text' className='profile-page-skeleton-text' />
            </div>
        </Stack>
    )
}

export default ProfileSkeleton;
