import { Link, useLocation } from 'react-router-dom';
import './header.scss';
import React from 'react';

const Header = React.memo(() => {
    const location = useLocation();

    return (
        <header className='header'>
            <Link to="/" className='header_title'>
                <h1 className='header_title_h1'>HRnet</h1>
            </Link>
            <nav className='header_nav'>
                <Link className={`${location.pathname === '/create' ? 'active' : ''}`} to="/create">Create</Link>
                <Link className={`${location.pathname === '/list' ? 'active' : ''}`} to="/list">View List</Link>
            </nav>
        </header>
    );
});

export default Header;

// import { Link, useLocation } from 'react-router-dom';
// import './header.scss';

// function Header(){
//     const location = useLocation();

//     return (
//         <header className='header'>
//             <Link to="/" className='header_title'><h1 className='header_title_h1'>HRnet</h1></Link>
//             <nav className='header_nav'>
//                 <Link className={`${location.pathname === '/create' ? 'active' : ''}`} to="/create">Create</Link>
//                 <Link className={`${location.pathname === '/list' ? 'active' : ''}`} to="/list">View List</Link>
//             </nav>
//         </header>
//     )
// }

// export default Header;