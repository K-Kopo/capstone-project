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
                    <li className="footer__main--list--item"><FaFacebookF/></li>
                    <li className="footer__main--list--item"><FaInstagramSquare /></li>
                    <li className="footer__main--list--item"><FaTwitter /></li>
                </ul>
            </article>
            
        </section>
    );
};

export default Footer;