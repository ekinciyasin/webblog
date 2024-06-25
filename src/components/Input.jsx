import React from 'react';

function Input(props) {
    const { id,label, error, onChange, type } = props;
    return (
        <div className="form-group">
            <label htmlFor="name" className="form-label">{label}</label>
            <input onChange={onChange} type={type? type : "text"}
                   className={error ? "form-control is-invalid" : "form-control"} id={id}
                   placeholder="Name eingeben"/>

            <div className="invalid-feedback">
                {error}
            </div>
        </div>
    );
}

export default Input;