import { useState } from "react";
import "../../style/about.css";
import { FiCamera } from "react-icons/fi";

const images = import.meta.glob("../../assets/images/anxzu.png", { eager: true });
const anxzuImageUrl = images["../../assets/images/anxzu.png"]?.default;

function About() {
    const [imageError, setImageError] = useState(false);

    return(
    <section id="about" className="section-about"> 
        <div className="about-container">
            <h2>About Me</h2>
        </div>
        <div className="about-text-container">
            <p>I am an Electronics and Communications Engineer with a computing-oriented background and professional experience in telecom pre-sales, networking, infrastructure, frontend development, and technical support. Throughout my career, I have worked on connectivity solutions, LAN-to-LAN architectures, captive portal implementations, network equipment configuration, troubleshooting, and process automation tools.</p>
            <p>My profile combines expertise in networking, Linux server administration, databases, web development, and technical documentation, allowing me to contribute from both a technical and strategic perspective. I am a problem-solving professional who enjoys analyzing requirements and designing tailored technology solutions that align with business needs.</p>
            
        </div>

        <div className="about-image-container">
            {anxzuImageUrl && !imageError ? (
                <img 
                    src={anxzuImageUrl} 
                    alt="Profile Anxzu" 
                    className="profile-image" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={() => setImageError(true)} 
                />
            ) : (
                <FiCamera size={100} color="gray" />
            )}
        </div>
    </section>
  );
};

export default About;