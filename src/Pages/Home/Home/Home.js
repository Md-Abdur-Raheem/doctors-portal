import React from 'react';
import Navigation from '../../Shared/Navigation/Navigation';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import HeroBanner from '../HeroBanner/HeroBanner';
import Services from '../Services/Services';

const Home = () => {
    return (
        <div>
            <Navigation></Navigation>
            <HeroBanner></HeroBanner>
            <Services></Services>
            <AppointmentBanner></AppointmentBanner>
        </div>
    );
};

export default Home;