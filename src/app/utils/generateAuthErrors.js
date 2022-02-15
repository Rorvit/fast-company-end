export default function generateAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Email или пароль введены некорректно";
        case "EMAIL_EXISTS":
            return "Пользователь с таким email уже существует";

        default:
            return "Слишком много попыток входа, попробуйте позже";
    }
}
