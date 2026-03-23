function Button({text, link, styloBtn}) {
    return (
        <a href={link} className={styloBtn}>
                {text}
        </a>
    );
}

export default Button