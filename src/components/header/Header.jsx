import { Link } from 'react-router-dom';
import './header.scss';

function Header(){
    return (
        <header className='header'>
            <Link to="/" className='header_title'><h1 className='header_title_h1'>HRnet</h1></Link>
            <nav className='header_nav'>
                <Link to="/create">Create</Link>
                <Link to="/list">View List</Link>
            </nav>
        </header>
    )
}

export default Header;