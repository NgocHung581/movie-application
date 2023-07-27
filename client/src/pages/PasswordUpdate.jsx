import { FastField, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import userApi from "../api/modules/user.api";
import Button from "../components/common/Button";
import Title from "../components/common/Title";
import InputField from "../custom-fields/InputField";
import { setUser } from "../redux/features/userSlice";
import { routesGen } from "../routes/routes";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import Spinner from "../components/common/Spinner";

const INPUTS = [
    {
        name: "password",
        type: "password",
        placeholder: "Old Password",
    },
    {
        name: "newPassword",
        type: "password",
        placeholder: "New Password",
    },
    {
        name: "confirmNewPassword",
        type: "password",
        placeholder: "Confirm New Password",
    },
];

function PasswordUpdate() {
    const [onRequest, setOnRequest] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        password: "",
        newPassword: "",
        confirmNewPassword: "",
    };

    const validationSchema = Yup.object({
        password: Yup.string()
            .min(8, "Password minimum 8 characters.")
            .required("Password is required."),
        newPassword: Yup.string()
            .min(8, "New Password minimum 8 characters.")
            .required("New Password is required."),
        confirmNewPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Confirm New Password not match")
            .min(8, "Confirm New Password minimum 8 characters.")
            .required("Confirm New Password is required."),
    });

    const handleSubmitForm = async (values, { resetForm }) => {
        if (onRequest) return;

        setOnRequest(true);

        const { res, error } = await userApi.passwordUpdate(values);

        setOnRequest(false);

        if (error) toast.error(error.message);
        if (res) {
            resetForm();
            navigate(routesGen.home);
            dispatch(setUser(null));
            dispatch(setAuthModalOpen(true));
            toast.success("Update Password Successfully! Please re-login");
        }
    };

    return (
        <div className="container mx-auto mt-20 p-4">
            <Title title="UPDATE PASSWORD" />

            <div className="max-w-md">
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmitForm}
                    validationSchema={validationSchema}
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

                                <Button
                                    type="submit"
                                    lg
                                    primary
                                    className="mt-4 w-full text-base"
                                    disabled={onRequest}
                                >
                                    {onRequest ? (
                                        <Spinner sm />
                                    ) : (
                                        "Update Password"
                                    )}
                                </Button>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default PasswordUpdate;
