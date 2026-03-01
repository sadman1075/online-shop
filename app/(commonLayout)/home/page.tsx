import Banner from '@/components/shared/Banner';
import { NewDropsCard } from '@/components/shared/NewDrops';
import { Reviews } from '@/components/shared/Review';
import React from 'react';

const page = () => {
    return (
        <div>
            <Banner></Banner>
            <NewDropsCard></NewDropsCard>
            <Reviews></Reviews>
        </div>
    );
};

export default page;