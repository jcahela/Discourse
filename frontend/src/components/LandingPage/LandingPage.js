import './LandingPage.css'
import Navigation from '../Navigation';

function LandingPage() {
    return ( 
        <div className="landing-container">
            <Navigation isLoaded={true}/>
        </div>
     );
}

export default LandingPage;
