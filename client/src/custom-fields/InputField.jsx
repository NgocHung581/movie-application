import PropTypes from "prop-types";

function InputField({
    form,
    field,
    type = "text",
    placeholder = "",
    disabled = false,
}) {
    const { name } = field;
    const { touched, errors } = form;

    const isError = touched[name] && errors[name];

    const inputClass = `bg-transparent border-2 ${
        isError
            ? "dark:border-[#a82e25] dark:focus:border-secondary border-secondary focus:border-[#a82e25]"
            : "dark:border-[#ffffff3b] border-[#c4c4c4] dark:hover:border-white hover:border-black dark:focus:border-[#468149] focus:border-[#468149]"
    } rounded w-full py-3 px-[14px] transition-300`;
    const errorMessageClass =
        "text-start mt-2 mx-[14px] text-sm text-secondary font-medium";

    return (
        <div className="mt-6 first:mt-0">
            <input
                {...field}
                type={type}
                className={inputClass}
                placeholder={placeholder}
                disabled={disabled}
            />
            {isError && <p className={errorMessageClass}>{errors[name]}</p>}
        </div>
    );
}

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

export default InputField;
