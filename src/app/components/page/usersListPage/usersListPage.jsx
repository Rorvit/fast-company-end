import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import Search from "../../common/form/search";

import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 8;
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [searchingName, setSearchingName] = useState("");

    const users = useSelector(getUsersList());
    const currentUserId = useSelector(getCurrentUserId());

    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());

    const handleDelete = (userId) => {
        console.log(userId);
    };

    const handleToggleBookmark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        console.log(newArray);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchingName]);

    const handleItemSelect = (item) => {
        if (searchingName !== "") setSearchingName("");
        setSelectedProf(item);
    };
    const handleSearchQuery = ({ target }) => {
        setSelectedProf(undefined);
        setSearchingName(target.value);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    function filterUsers(data) {
        const filteredUsers = searchingName
            ? data.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchingName.toLowerCase()) !== -1
              )
            : selectedProf
            ? data.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : data;
        return filteredUsers.filter((u) => u._id !== currentUserId);
    }
    const filteredUsers = filterUsers(users);

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <>
            <div className="d-flex">
                {professions && !professionsLoading && (
                    <div className="d-flex-flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            onItemSelect={handleItemSelect}
                            selectedItem={selectedProf}
                        />
                        <button
                            className="btn btn-secondary mt2"
                            onClick={clearFilter}
                        >
                            Очистить все
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <form>
                        <Search
                            value={searchingName.value}
                            onChange={handleSearchQuery}
                        />
                    </form>

                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookmark={handleToggleBookmark}
                        />
                    )}

                    <div className="d-flex justify-content-center">
                        <Pagination
                            currentPage={currentPage}
                            itemsCount={count}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

UsersListPage.propTypes = {
    users: PropTypes.array,
    index: PropTypes.number
};

export default UsersListPage;
