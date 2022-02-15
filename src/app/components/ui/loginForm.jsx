import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, logIn } from "../../store/users";

const LoginForm = () => {
    const history = useHistory();

    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});

    const loginError = useSelector(getAuthErrors());

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" }
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
        const redirect = history.location.state
            ? `${history.location.state.from.pathname}`
            : "/";
        console.log(data);
        dispatch(logIn({ payload: data, redirect }));

        history.push(
            history.location.state
                ? `${history.location.state.from.pathname}`
                : "/"
        );
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
            <CheckBoxField
                name="stayOn"
                value={data.stayOn}
                onChange={handleChange}
            >
                Оставаться в системе
            </CheckBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}
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

export default LoginForm;
