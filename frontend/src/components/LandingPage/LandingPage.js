import Navigation from '../Navigation';
import LandingCloudsSvg from './LandingCloudsSvg';
import LandingGraphicLeft from './LandingGraphicLeft';
import LandingGraphicRight from './LandingGraphicRight';
import './LandingPage.css'

function LandingPage() {
    return ( 
        <div className="landing-container">
            <Navigation isLoaded={true}/>
            <LandingCloudsSvg className="landing-clouds-svg"/>
            <LandingGraphicLeft className="landing-graphic-left-svg" />
            <LandingGraphicRight className="landing-graphic-right-svg"/>
            <h1 className="landing-header">
                YOU NEED A LITTLE MORE DISCOURSE IN YOUR LIFE...
            </h1>
            <p className="landing-sub-header">...talk with others around the world, and hang out with the people you love!</p>
        </div>
     );
}

export default LandingPage;
