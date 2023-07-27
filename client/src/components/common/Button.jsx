import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Button({
    primary,
    text = false,
    lg = false,
    children,
    href,
    to,
    onClick,
    className,
    disabled,
    ...props
}) {
    let Component = "button";

    if (href) {
        Component = "a";
        props.href = href;
    } else if (to) {
        Component = Link;
        props.to = to;
    }

    const primaryBtnClass = primary ? "btn-primary" : "";
    const textBtnClass = text ? "btn-text" : "";
    const lgBtnClass = lg ? "btn-lg" : "";
    const disabledClass = disabled ? "btn-disabled" : "";

    const classes = `btn ${primaryBtnClass} ${textBtnClass} ${lgBtnClass} ${disabledClass} ${className}`;

    return (
        <Component
            onClick={onClick}
            {...props}
            className={classes}
            disabled={disabled}
        >
            {children}
        </Component>
    );
}

Button.propTypes = {
    primary: PropTypes.bool,
    text: PropTypes.bool,
    children: PropTypes.node.isRequired,
    href: PropTypes.string,
    to: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    lg: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default Button;
