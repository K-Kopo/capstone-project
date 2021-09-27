import React from 'react';
import "./Footer.scss";
import {FaFacebookF} from "react-icons/fa";
import {FaInstagramSquare} from "react-icons/fa";
import {FaTwitter} from "react-icons/fa";



const Footer = () => {
    return (
        <section className="footer">
            <article className="footer__main">
                <ul className="footer__main--list">
                    <li className="footer__main--list--item">Inquiries: secondhelpings@gmail.com</li>
                    <a href="https://www.facebook.com"><li className="footer__main--list--item"><FaFacebookF/></li></a>
                    <a href="https://www.instagram.com"><li className="footer__main--list--item"><FaInstagramSquare /></li></a>
                    <a href="https://www.twitter.com"><li className="footer__main--list--item"><FaTwitter /></li></a>
                </ul>
            </article>
            
        </section>
    );
};

export default Footer;