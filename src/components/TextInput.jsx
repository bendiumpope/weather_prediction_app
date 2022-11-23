const TextInput = ({ placeholder, label, type, disabled, value, name, onChange }) => {

    const onChangeHandler = (event) => {
        onChange(event);
    };

    return (
        <div>
            <label>{label}</label>
            <input placeholder={placeholder} type={type} disabled={disabled} value={value} name={name} onChange={onChangeHandler} />
        </div>
    )
};

export default TextInput;