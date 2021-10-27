import Navigation from '../Navigation';
import LandingCloudsSvg from './LandingCloudsSvg';
import LandingGraphicLeft from './LandingGraphicLeft';
import LandingGraphicRight from './LandingGraphicRight';
import { NavLink, Link } from 'react-router-dom';
import './LandingPage.css'

function LandingPage() {
    return ( 
        <>
            <div className="landing-background" />
            <Navigation isLoaded={true}/>
            <LandingCloudsSvg className="landing-clouds-svg"/>
            <LandingGraphicLeft className="landing-graphic-left-svg" />
            <LandingGraphicRight className="landing-graphic-right-svg"/>
            <div className="landing-welcome-container">
                <h1 className="landing-header">
                    YOU NEED A LITTLE MORE DISCOURSE IN YOUR LIFE...
                </h1>
                <p className="landing-sub-header">...talk with others around the world, and hang out with the people you love!</p>
                <NavLink className="landing-action-button" to="/dashboard">Open Discourse</NavLink>
            </div>
            <div className="about-links-container">
                <p className="about-links-dev-name">Created By Jason Cahela</p>
                <a href="https://github.com/jcahela" target="_blank" rel="noreferrer">
                    <img className="about-links-image" src="https://cdn.discordapp.com/attachments/886336420552269847/889198252417761290/GitHub-Mark-Light-32px.png" alt="" />
                </a>
                <a href="https://www.linkedin.com/in/jason-cahela/" target="_blank" rel="noreferrer">
                    <img className="about-links-image" src="https://cdn.discordapp.com/attachments/886336420552269847/888542913594806272/768px-LinkedIn_logo_initials.png" alt="" />
                </a>
            </div>
        </>
     );
}

export default LandingPage;
