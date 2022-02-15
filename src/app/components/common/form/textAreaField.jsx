import React from "react";
import PropTypes from "prop-types";
const TextAreaField = ({ label, name, value, rows, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <textarea
                onChange={handleChange}
                className={`form-control${error ? " is-invalid" : ""}`}
                name={name}
                id={name}
                value={value}
                rows={rows}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    rows: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextAreaField;
