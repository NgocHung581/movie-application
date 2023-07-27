import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

import userApi from "../../api/modules/user.api";
import InputField from "../../custom-fields/InputField";
import Alert from "./Alert";
import Button from "./Button";
import Spinner from "./Spinner";

const INPUTS = [
    {
        name: "username",
        placeholder: "Username",
        type: "text",
    },
    {
        name: "displayName",
        placeholder: "Display Name",
        type: "text",
    },
    {
        name: "password",
        placeholder: "Password",
        type: "password",
    },
    {
        name: "confirmPassword",
        placeholder: "Confirm Password",
        type: "password",
    },
];

function RegisterForm({ switchStateAction }) {
    const buttonClass = "w-full leading-7";

    const [isSignUpRequest, setIsSignUpRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const initialValues = {
        username: "",
        displayName: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(8, "Username minimum 8 characters.")
            .required("Username is required."),
        displayName: Yup.string()
            .min(8, "Display Name minimum 8 characters.")
            .required("Display Name is required."),
        password: Yup.string()
            .min(8, "Password minimum 8 characters.")
            .required("Password is required."),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Confirm Password not match")
            .min(8, "Confirm Password minimum 8 characters.")
            .required("Confirm Password is required."),
    });

    const handleSubmitForm = async (values, { resetForm }) => {
        setErrorMessage(undefined);
        setIsSignUpRequest(true);
        const { res, error } = await userApi.signUp(values);
        setIsSignUpRequest(false);

        if (res) {
            resetForm();
            switchStateAction();
            toast.success("Sign Up Successfully");
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
                            />
                        ))}

                        <div className="mt-8">
                            <Button
                                type="submit"
                                primary
                                lg
                                className={`${buttonClass} text-base`}
                                disabled={isSignUpRequest}
                            >
                                {isSignUpRequest ? <Spinner /> : "Sign Up"}
                            </Button>
                            <Button
                                type="button"
                                text
                                lg
                                className={`${buttonClass} dark:text-primary text-primary mt-2`}
                                onClick={switchStateAction}
                            >
                                Sign In
                            </Button>
                        </div>

                        {errorMessage && <Alert message={errorMessage} />}
                    </Form>
                );
            }}
        </Formik>
    );
}

RegisterForm.propTypes = {
    switchStateAction: PropTypes.func.isRequired,
};

export default RegisterForm;
