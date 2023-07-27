import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

import userApi from "../../api/modules/user.api";
import InputField from "../../custom-fields/InputField";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setUser } from "../../redux/features/userSlice";
import Button from "./Button";
import Spinner from "./Spinner";
import Alert from "./Alert";

const INPUTS = [
    {
        name: "username",
        placeholder: "Username",
        type: "text",
    },
    {
        name: "password",
        placeholder: "Password",
        type: "password",
    },
];

function LoginForm({ switchStateAction }) {
    const dispatch = useDispatch();

    const buttonClass = "w-full leading-7";

    const [isLoginRequest, setIsLoginRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(8, "Username minimum 8 characters.")
            .required("Username is required."),
        password: Yup.string()
            .min(8, "Password minimum 8 characters.")
            .required("Password is required."),
    });

    const handleSubmitForm = async (values, { resetForm }) => {
        setErrorMessage(undefined);
        setIsLoginRequest(true);
        const { res, error } = await userApi.signIn(values);
        setIsLoginRequest(false);

        if (res) {
            resetForm();
            dispatch(setUser(res));
            dispatch(setAuthModalOpen(false));
            toast.success("Sign In Successfully");
        }

        if (error) setErrorMessage(error.message);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmitForm}
        >
            {({ handleSubmit }) => {
                return (
                    <Form onSubmit={handleSubmit}>
                        {INPUTS.map((input, index) => (
                            <FastField
                                key={index}
                                name={input.name}
                                component={InputField}
                                type={input.type}
                                placeholder={input.placeholder}
                                disabled={isLoginRequest}
                            />
                        ))}

                        <div className="mt-8">
                            <Button
                                type="submit"
                                primary
                                lg
                                className={`${buttonClass} text-base`}
                                disabled={isLoginRequest}
                            >
                                {isLoginRequest ? <Spinner /> : "Sign in"}
                            </Button>
                            <Button
                                type="button"
                                text
                                lg
                                className={`${buttonClass} dark:text-primary text-primary mt-2`}
                                onClick={switchStateAction}
                            >
                                Sign up
                            </Button>
                        </div>

                        {errorMessage && <Alert message={errorMessage} />}
                    </Form>
                );
            }}
        </Formik>
    );
}

LoginForm.propTypes = {
    switchStateAction: PropTypes.func.isRequired,
};

export default LoginForm;
