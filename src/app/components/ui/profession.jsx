import React from "react";
import PropTypes from "prop-types";
import {
    getProfession,
    getProfessionsLoadingStatus
} from "../../store/professions";
import { useSelector } from "react-redux";

const Profession = ({ id }) => {
    const prof = useSelector(getProfession(id));
    const profIsLoading = useSelector(getProfessionsLoadingStatus());

    if (!profIsLoading) {
        return <p className="text-secondary mb-1">{prof.name}</p>;
    } else return "Loading";
};

export default Profession;

Profession.propTypes = {
    id: PropTypes.string
};
