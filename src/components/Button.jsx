import React from 'react';
import '../style/Button.css';

const Button = ({ 
    children, 
    onClick, 
    variant = 'primary', 
    size = 'medium', 
    disabled = false,
    className = '',
    ...props 
}) => {
    const buttonClass = `btn btn-${variant} btn-${size} ${className}`.trim();

    return (
        <button
            className={buttonClass}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;