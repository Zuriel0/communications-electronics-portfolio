import {Social} from '../../data/social_profiles'
import SocialCard from '../ui/social_log_crd'
import ContactInfo from '../ui/Contac_Info'
import ContactFrom from '../ui/Contact_from'
import Button from '../ui/button'
import "../../style/contac.css";


function Contact (){
    return(
        <secction className="contact-section">
            <div className="contact-head">
                <div className="contact-title">
                    <h2>Get In Touch</h2>
                </div>
                <div className="contact-text">
                    <p>Have a project in mind or want to collaborate? Let's connect.</p>
                </div>
            </div>
            <div className="contact-body">
                <div className="contact-info-container">
                    <div className="contact-info">
                        <ContactInfo />
                    </div>
                    <div className="contact-social">
                        <div className="social-title">
                            <h3>Social Profiles</h3>
                        </div>
                        <div className="social-cards">
                            {Social.map((social) => (
                                <SocialCard key={social.id} icon={social.icon} link={social.link} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="contact-form">
                    <ContactFrom />
                    <Button text="Send Message" link="#" styloBtn="button-send" />
                </div>
            </div>
        </secction>
    )
}

export default Contact;