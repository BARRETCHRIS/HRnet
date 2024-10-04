import { Link } from 'react-router-dom';
import './home.scss';
import React from 'react';

const Home = React.memo(() => {
    document.title = 'Home | Wealth Health';

    return (
        <main className="wrapper">
            <div className="home">
                <div className="home_content">
                    <h2>Welcome Wealth Health HRnet</h2>
                    <p className='home_content_txt'>
                        This is the employee management app. <br />
                        Please choose your action.
                    </p>
                    <div className='home_content_actions'>
                        <Link className='home_content_actions_btn' to='/create'>Create Employee</Link>
                        <Link className='home_content_actions_btn' to='/list'>View list Employee</Link>
                    </div>
                </div>
            </div>
        </main>
    );
});

export default Home;


// import { Link } from 'react-router-dom';
// import './home.scss';
// function Home(){
//     document.title = 'Home | Wealth Health';

//     return (
//         <main className="wrapper">
//             <div className="home">
//                 <div className="home_content">
//                     <h2>Welcome Wealth Health HRnet</h2>
//                     <p className='home_content_txt'>This is the employee management app. <br />Please choose your action.</p>
//                     <div className='home_content_actions'>
//                         <Link className='home_content_actions_btn' to='/create'>Create Employee</Link>
//                         <Link className='home_content_actions_btn' to='/list'>View list Employee</Link>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// }

// export default Home;