import React from 'react';

const FormInput = ({ handleChange, label, ...otherProps }) => (
    <div className='group'>
        {
            label ? 
            (<label className={`${otherProps.value.length ? 'shrink' : '' } form-input-label`}>
                {label}
            </label>)
            : null
        }
        <br />
        <input className='form-input' onChange={handleChange} {...otherProps} />
    </div>
)

export default FormInput;