import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getQualitiesLoadingStatus,
    getQualitiesByIds
} from "../../../store/qualities";

const QualitiesList = ({ ids }) => {
    const qualsLoading = useSelector(getQualitiesLoadingStatus());
    const qualsArray = useSelector(getQualitiesByIds(ids));

    if (!qualsLoading) {
        return (
            <>
                {qualsArray.map((qual) => (
                    <span key={qual._id} className={"badge bg-" + qual.color}>
                        {qual.name}
                    </span>
                ))}
            </>
        );
    } else {
        return "Loading...";
    }
};
QualitiesList.propTypes = {
    ids: PropTypes.array
};

export default QualitiesList;
