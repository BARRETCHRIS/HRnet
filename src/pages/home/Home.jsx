import { Link } from 'react-router-dom';

import './home.scss';

import HomeImg from '../../assets/home_img.jpg';

function Home(){
    document.title = 'Home | Wealth Health';

    return (
        <main className="wrapper">
            <div className="home">
                <div className="home_content">
                    <h2>Welcome Wealth Health HRnet</h2>
                    <p>This is the employee management app. <br />Please choose your action.</p>
                    <div className='home_content_actions'>
                        <Link to='/create'>Create Employee</Link>
                        <Link to='/list'>View list Employee</Link>
                    </div>
                </div>
                <img className='home_img' src={HomeImg} alt="a drawing of a team, plants and money" /> 
            </div>
        </main>
    )
}

export default Home;