import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useSelector, useDispatch } from "react-redux";
import {
    getQualities,
    getQualitiesLoadingStatus
} from "../../../store/qualities";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserData, updateUserData } from "../../../store/users";

const EditUserPage = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const currentUser = useSelector(getCurrentUserData());
    const [data, setData] = useState();
    const qualities = useSelector(getQualities());
    const professions = useSelector(getProfessions());

    const qualsLoading = useSelector(getQualitiesLoadingStatus());
    const profsLoading = useSelector(getProfessionsLoadingStatus());
    const [errors, setErrors] = useState({});

    const transformData = (dataList) => {
        return dataList.map((el) => ({ label: el.name, value: el._id }));
    };

    const professionsList = transformData(professions);
    const qualitiesList = transformData(qualities);

    const getQualitiesList = (qualIds) => {
        const qualitiesArray = [];
        for (const qid of qualIds) {
            for (const quality of qualities) {
                if (quality._id === qid) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(
            updateUserData({
                ...data,
                qualities: data.qualities.map((quality) => quality.value)
            })
        );
    };

    useEffect(() => {
        if (!qualsLoading && !profsLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: getQualitiesList(currentUser.qualities)
            });
        }
    }, [profsLoading, qualsLoading, currentUser, data]);

    useEffect(() => {
        if (data && isLoading) setIsLoading(false);
    }, [data]);

    const validatorConfog = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },

        name: {
            isRequired: {
                message: "Введите ваше имя"
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
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
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
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={transformData(data.qualities)}
                                options={qualitiesList}
                                onChange={handleChange}
                                values
                                name="qualities"
                                label="Выберите ваши качесвта"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
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
