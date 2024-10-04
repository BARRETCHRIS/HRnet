import './footer.scss';

import Logo from '../../assets/logo.webp';

function Footer(){
    return (
        <footer className="footer">
            <img src={Logo} alt="health wealth green mandala" className='footer_img' />
            <p className="footer_text">
                Copyright 2024 Wealth Health
            </p>
        </footer>
    )
}

export default Footer;