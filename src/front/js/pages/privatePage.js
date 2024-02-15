import React from 'react';
import PrivatePage from '../component/privatePageComponent.js';
import '../../styles/privatePageBg.css';

const PrivatePageContainer = () => {
    const user = {
        first_name: 'John',
        last_name: 'Doe',
        saved_trips: 'Paris, London',
        xp_points: 100,
    };

    return (

        <div className='minheight'>
            <PrivatePage user={user} />
        </div>

    );
}

export default PrivatePageContainer;
