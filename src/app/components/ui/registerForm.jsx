import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

import { getQualities } from "../../store/qualities";
import { useSelector, useDispatch } from "react-redux";
import { getProfessions } from "../../store/professions";
import { signUp } from "../../store/users";
// import { useProfessions } from "../../hooks/useProfession";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        name: "",
        qualities: [],
        license: false
    });
    const [errors, setErrors] = useState({});

    // const professions = useSelector(getProfessions());
    const professions = useSelector(getProfessions());
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));
    const qualities = useSelector(getQualities());
    const qualityList = qualities.map((q) => ({ label: q.name, value: q._id }));

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: { message: "Введите корректный email" }
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" },
            isCapitalSymbol: {
                message: "Пароль должен включать хотя бы 1 заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен включать хотя бы 1 цифру"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        name: {
            isRequired: { message: "Имя обязательно для заполнения" },
            min: {
                message: "Имя должно состоять минимум из 3 символов",
                value: 3
            }
        },
        profession: {
            isRequired: { message: "Профессия обязательна для заполнения" }
        },
        license: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
        }
    };

    useEffect(() => validate(), [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };

        console.log("newData", newData);
        dispatch(signUp(newData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Введите емаил"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Введите пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <TextField
                label="Введите имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
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
                    { name: "Female", value: "female" },
                    { name: "male", value: "male" },
                    { name: "other", value: "other" }
                ]}
                name="sex"
                onChange={handleChange}
                value={data.sex}
                label="Ваш пол"
            />
            <MultiSelectField
                options={qualityList}
                onChange={handleChange}
                name="qualities"
                label="Выберите качества"
                value={data.qualities}
            />
            <CheckBoxField
                value={data.license}
                onChange={handleChange}
                name="license"
                error={errors.license}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Отправить
            </button>
        </form>
    );
};

export default RegisterForm;
