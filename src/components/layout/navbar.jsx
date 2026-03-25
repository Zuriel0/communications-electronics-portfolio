import { useState } from "react";
import "../../style/layout/navbar.css";

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    }

    const closeMenu = () => {
        setIsOpen(false);
    }

    return (
        <nav id="navbar" className={`navbar-style ${isOpen ? "navbar-style-open" : ""}`}>

            <a href="#" className="navbar-logo">
                <h2 className="navbar-logo-yes">
                    Andres Zuriel Macias Rios</h2>
                <h2 className= "navbar-logo-none">
                    AZ
                </h2>
            </a>
            
            <button
                onClick={toggleMenu}
                className="menu-toggle"
                aria-label="Abrir"
                aria-expanded={isOpen}
            >
                <span className="nav-line"></span>
                <span className="nav-line"></span>
                <span className="nav-line"></span>
            </button>
            
            <ul className={`navbar-menu ${isOpen ? "navbar-menu-open" : ""}`}>
                <li>
                    <a href="#" onClick={closeMenu}>About</a>
                </li>
                <li>
                    <a href="#" onClick={closeMenu}>Skills</a>
                </li>
                <li>
                    <a href="#" onClick={closeMenu}>Projects</a>
                </li>
                <li>
                    <a href="#" onClick={closeMenu}>Experience</a>
                </li>
                <li>
                    <a href="#" onClick={closeMenu}>Contact</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar