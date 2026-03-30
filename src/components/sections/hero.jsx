import Button from "../ui/button";
import "../../style/hero.css";

function Hero() {
    return (
        <section id="hero" className="hero-style">
            <h1 className="hero-title">Andres Zuriel Macias Rios</h1>
            <div className="hero-subtitle-container">
                <p className="hero-subtitle">Communications and Electronics Engineer</p>
                <p className="hero-subtitle-2">Designing technology, solving engineering problems, and building innovative systems.</p>
            </div>
            <div className="hero-button-container">
                <Button text="View Projects" link="#projects" styloBtn="button-one" />
                <Button text="Contact" link="#contact" styloBtn="button-two" />
            </div>
        </section>
    );
}

export default Hero