import Button from "../ui/button";

function Hero() {
    return (
        <section id="hero" className="hero-style">
            <h1 className="hero-title">Andres Zuriel Macias Rios</h1>
            <div className="hero-subtitle-container">
                <p className="hero-subtitle">Communications and Electronics Engineer</p>
                <p className="hero-subtitle-2">Designing technology, solving complex engineering</p>
                <p className="hero-subtitle-2">problems, and building innovative systems.</p>
            </div>
            <div className="hero-button-container">
                <Button text="View Projects" link="#" styloBtn="button-one" />
                <Button text="Contact" link="#" styloBtn="button-two" />
            </div>
        </section>
    );
}

export default Hero