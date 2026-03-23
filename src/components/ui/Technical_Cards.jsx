function Technical_Cards({icon : Icon, title, technologies}) {
    return (
        <div className="technical-card">
            <div className="icon">
                <div>
                    <Icon size={24}/>
                </div>
            </div>
            <div className="title">{title}</div>
            <div className="skill-tags">
                {technologies.map((tech, index) => (
                <span key={index} className="skill-tag">
                    {tech}
                </span>
                ))}
        </div>
        </div>
    );
}

export default Technical_Cards;
