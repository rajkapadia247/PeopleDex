import { type FunctionComponent } from "react";
import "./Footer.css";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="#" className="footer-link">Terms</a>
        <a href="#" className="footer-link">Privacy</a>
        <a href="#" className="footer-link">Docs</a>
        <a href="#" className="footer-link">Contact Support</a>
        <a href="#" className="footer-link">Manage cookies</a>
        <a href="#" className="footer-link">Do not share my personal information</a>
      </div>
    </footer>
  );
};

export default Footer;
