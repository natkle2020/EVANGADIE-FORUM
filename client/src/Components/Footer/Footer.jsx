import "../../Components/Footer/Footer.module.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
 import  logo from "../../../assets/logo2.png";
 


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Social */}
        <div className="footer-section logo-social">
          <img src={logo} alt="Evangadi Logo" className="footer-logo" />
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        {/* Useful Links */}
        <div className="footer-section">
          <h4>Useful Link</h4>
          <ul>
            <li><a href="https://www.evangadi.com/explained" target="_blank" rel="noreferrer">How it works</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>Evangadi Networks</p>
          <p>support@evangadi.com</p>
          <p>+1-202-386-2702</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
