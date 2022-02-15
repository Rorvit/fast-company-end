import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../API";
import EditForm from "../../ui/editForm";

const EditPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (user) {
        return <EditForm user={user} />;
    }
    return (
        <div className="spinner-border m-5" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export default EditPage;
EditPage.propTypes = {
    userId: PropTypes.string.isRequired
};
