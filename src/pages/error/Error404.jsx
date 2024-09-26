import { Link } from 'react-router-dom';
import './error404.scss';

function Error404(){
    document.title = 'Error | Wealth Health';
    return (
        <main className="wrapper">
            <div className='content_error'>
                <h2>404<br />Oops! The page you are requesting doesn't exist.</h2>
                <Link to="/" className=''>
                    Return to home page
                </Link>
            </div>
        </main>
    )
}

export default Error404;