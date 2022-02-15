import React from "react";
import PropTypes from "prop-types";
import Comments from "../../ui/comments";
import Loader from "../../../utils/loader";

import UserCard from "../../ui/userCard";
import MeetingsCard from "../../ui/meetingsCard";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";
import QualitiesCard from "../../../components/ui/qualitiesCard";

const UserPage = ({ userId }) => {
    const user = useSelector(getUserById(userId));

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingsCard value={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    } else {
        return <Loader />;
    }
};

export default UserPage;

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
