function SocialCard ({name, link, icon : Icon }){
    return(
        <div className="social-container">
            <div className="social-container-icon">
                <a href={link} target="_blank" rel="noopener noreferrer" aria-label={name}>
                    <Icon size={24}/>
                    <span>{name}</span>
                </a>
            </div>
        </div>
    )
}

export default SocialCard; 