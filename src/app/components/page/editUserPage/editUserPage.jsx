import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/ validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radio.Field";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";

const EditUserPage = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser, updateUser } = useAuth();
    const [data, setData] = useState();
    const { professions, isLoading: profsLoading } = useProfessions();
    const { qualities, isLoading: qualsLoading } = useQualities();
    const [errors, setErrors] = useState({});

    const getQualities = (elements) => {
        const qualitiesQrray = [];
        for (const elem of elements) {
            for (const qualy in qualities) {
                if (elem.value === qualities[qualy]._id) {
                    qualitiesQrray.push(qualities[qualy]);
                }
            }
        }
        return qualitiesQrray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        updateUser({
            ...data,
            qualities: data.qualities.map((quality) => quality.value)
        });
        history.push(`/users/${currentUser._id}`);
    };

    const transformData = (data) => {
        return data.map((qual) => ({ label: qual.name, value: qual._id }));
    };

    const professionsList = transformData(professions);
    const qualitiesList = transformData(qualities);

    useEffect(() => {
        if (!qualsLoading && !profsLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: getQualities(currentUser.qualities)
            });
        }
    }, [profsLoading, qualsLoading, currentUser, data]);

    useEffect(() => {
        if (data && isLoading) setIsLoading(false);
    }, [data]);

    const validatorConfog = {
        email: {
            isRequired: {
                message: "?????????????????????? ?????????? ?????????????????????? ?????? ????????????????????"
            },
            isEmail: {
                message: "Email ???????????? ??????????????????????"
            }
        },

        name: {
            isRequired: {
                message: "?????????????? ???????? ??????"
            }
        }
    };
    useEffect(() => validate(), [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfog);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="??????"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="?????????????????????? ??????????"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="???????????? ???????? ??????????????????"
                                defaultOption="Choose..."
                                name="profession"
                                options={professionsList}
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="???????????????? ?????? ??????"
                            />
                            <MultiSelectField
                                defaultValue={transformData(data.qualities)}
                                options={qualitiesList}
                                onChange={handleChange}
                                values
                                name="qualities"
                                label="???????????????? ???????? ????????????????"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                ????????????????
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
