import { useState, useEffect } from "react";
import "../../style/layout/navbar.css";

function Navbar() {

        const [isScrolled, setIsScrolled] = useState(false);
        const [isBounceActive, setIsBounceActive] = useState(false);

        useEffect(() => {
        const handleScroll = () => {
        const shouldBeScrolled = window.scrollY > 12;

        setIsScrolled((prev) => {
            // activa rebote solo cuando pasa de false -> true
            if (!prev && shouldBeScrolled) {
            setIsBounceActive(true);

            setTimeout(() => {
                setIsBounceActive(false);
            }, 450);
            }

            return shouldBeScrolled;
        });
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navbarClasses = [
        "navbar-style",
        isScrolled ? "navbar--scrolled" : "",
        isBounceActive ? "navbar--bounce" : "",
    ]
        .join(" ")
        .trim();

    // State for the mobile menu
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    }

    const closeMenu = () => {
        setIsOpen(false);
    }

    return (
        <nav id="navbar" className={`${isOpen ? "navbar-style-open " : " "}` + navbarClasses}>

            <a href="#hero" onClick={closeMenu} className="navbar-logo">
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
                    <a href="#about" onClick={closeMenu}>About</a>
                </li>
                <li>
                    <a href="#skills" onClick={closeMenu}>Skills</a>
                </li>
                <li>
                    <a href="#projects" onClick={closeMenu}>Projects</a>
                </li>
                <li>
                    <a href="#experience" onClick={closeMenu}>Experience</a>
                </li>
                <li>
                    <a href="#contact" onClick={closeMenu}>Contact</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar