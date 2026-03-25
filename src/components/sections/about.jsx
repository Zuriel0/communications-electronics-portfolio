import "../../style/about.css";
import { FiCamera } from "react-icons/fi";


function About() {
    return(
    <section className="section-about"> 
        <div className="about-container">
            <h2>About Me</h2>
        </div>
        <div className="about-text-container">
            <p>I am a passionate Communications and Electronics Engineer dedicated to bridging the gap between hardware and software. With a strong foundation in electronic design, signal processing, and embedded systems, I thrive on creating robust solutions for complex technical challenges</p>
            <p>My expertise spans across designing intricate circuit layouts, developing efficient communication protocols, and programming microcontrollers to bring hardware to life. I believe in a holistic approach to engineering, where understanding the physical layer is just as important as the software that controls it.</p>
            <p>Whether it's developing IoT sensor networks, optimizing RF communication systems, or building autonomous control platforms, I am driven by a relentless curiosity and a commitment to technological innovation. I am constantly exploring new tools and methodologies to push the boundaries of what's possible in modern engineering.</p>
        </div>

        <div className="about-image-container">
            <FiCamera size={100} color="gray" />
        </div>
    </section>
  );
};

export default About;