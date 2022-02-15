import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getQualitiesLoadingStatus,
    getQualitiesByIds
} from "../../store/qualities";

const QualitiesCard = ({ data }) => {
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesByIds = useSelector(getQualitiesByIds(data));

    if (!isLoading) {
        return (
            <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                    <h5 className="card-title">
                        <span>Qualities</span>
                    </h5>
                    <p className="card-text">
                        {qualitiesByIds.map((qual) => (
                            <span
                                key={qual._id}
                                className={"badge bg-" + qual.color}
                            >
                                {qual.name}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
        );
    } else return "Loading";
};
QualitiesCard.propTypes = {
    data: PropTypes.array
};

export default QualitiesCard;
