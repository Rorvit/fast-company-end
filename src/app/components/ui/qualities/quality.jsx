import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getQualities,
    getQualitiesLoadingStatus
} from "../../../store/qualities";

const Qualitie = ({ id }) => {
    const qualities = useSelector(getQualities());
    const isLoading = useSelector(getQualitiesLoadingStatus());

    const qual = (id) => qualities.find((q) => q._id === id);

    if (!isLoading) {
        return <span className={"badge bg-" + qual.color}>{qual.name}</span>;
    } else return "Loading";
};

Qualitie.propTypes = {
    id: PropTypes.string
};
export default Qualitie;
