import React from "react";
import PropTypes from "prop-types";
const Search = ({ value, onChange }) => {
    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default Search;
Search.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};
