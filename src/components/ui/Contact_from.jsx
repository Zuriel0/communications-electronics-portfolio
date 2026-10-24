import Text from "../../i18n/Text.jsx";
import useTranslation from "../../i18n/useTranslation.js";
function ContactFrom(){
  const { t } = useTranslation();
    return(
        <div className="contactfrom-container">
            <div className="conatcfrom-input">
                <label className="input-contact-label" htmlFor="name"><Text>{"Name"}</Text></label>
                <input className="input-contact" type="text" id="name" placeholder={t("Zuriel Macias")}/>
            </div>
            <div className="conatcfrom-input">
                <label className="input-contact-label" htmlFor="email"><Text>{"Email"}</Text></label>
                <input className="input-contact" type="email" id="email" placeholder={t("usuario@ejemplo.com")}/>
            </div>
            <div className="conatcfrom-input">
                <label className="input-contact-label" htmlFor="message"><Text>{"Message"}</Text></label>
                <textarea className="input-contact" id="message" rows={4} placeholder={t("How can I help you?")}/>
            </div>
        </div>
    )
}

export default ContactFrom;