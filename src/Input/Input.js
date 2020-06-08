import React from 'react';

import './Input.scss';

const Input = (props) => {
    let input;
    switch (props.elType) {
        case ('radio'):
            input = <input className={`quiz-input ${props.disabled ? 'danger' : ''}`} disabled={props.disabled} type="radio" id={props.id} name={props.name} value={props.id} required />;
            break;
        case ('checkbox'):
            input = <input className={`quiz-input ${props.disabled ? 'danger' : ''}`} type="checkbox" id={props.id} name={props.id} value={props.value} required />;
            break;
        default:
            input = <input className={`quiz-input ${props.disabled ? 'danger' : ''}`} type="radio" id={props.id} name={props.name} value={props.id} required />;
    }
    return (
        <div onClick={props.onClick} className={`div-input ${props.disabled ? 'danger' : ''}`}>

            <label onClick={props.onClick} style={{ width: '40rem' }} className='quiz-label ' htmlFor={props.id}>{input}{props.label}</label>
        </div>
    );
}

export default Input;