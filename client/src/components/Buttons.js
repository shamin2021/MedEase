import * as React from 'react';
import Button from '@mui/material/Button';

const Buttons = ({ variant, label, color, onClick }) => {

    return (
        <Button variant={variant} color={color} onClick={onClick}>{ label }</Button>  
    );
};

export default Buttons;