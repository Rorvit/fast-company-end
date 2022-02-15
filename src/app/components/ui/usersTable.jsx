import React from "react";
import PropTypes from "prop-types";
import BookMark from "../common/bookmark";
import { Link } from "react-router-dom";
import Table from "../common/table";
import Profession from "./profession";
import QualitiesList from "./qualities";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookmark,
    ...rest
}) => {
    const columns = {
        count: {},
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList ids={user.qualities} />
        },
        professions: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookmark(user._id, user.bookmark)}
                />
            )
        }
    };
    return (
        //
        //   <Table
        //     onSort={onSort}
        //     selectedSort={selectedSort}
        //     columns={columns}
        //     data={users}
        //   />
        //   {/* <TableHeader {...{ onSort, selectedSort, columns }} />
        //   <TableBody {...{ columns, data: users }} /> */}
        //

        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};
export default UserTable;
UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    handleSort: PropTypes.func,
    selectedSort: PropTypes.object,
    onSort: PropTypes.func.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
};
