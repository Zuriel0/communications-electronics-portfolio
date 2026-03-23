function ContactFrom(){
    return(
        <div className="contactfrom-container">
            <div className="conatcfrom-input">
                <label className="input-contact-label" htmlFor="name">Name</label>
                <input className="input-contact" type="text" id="name" placeholder="Zuriel Macias"/>
            </div>
            <div className="conatcfrom-input">
                <label className="input-contact-label" htmlFor="email">Email</label>
                <input className="input-contact" type="email" id="email" placeholder="usuario@ejemplo.com"/>
            </div>
            <div className="conatcfrom-input">
                <label className="input-contact-label" htmlFor="message">Message</label>
                <textarea className="input-contact" id="message" rows={4} placeholder="How can I help you?"/>
            </div>
        </div>
    )
}

export default ContactFrom;