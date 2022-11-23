const Button = ({ onClick, loading, loadingText, buttonText, className }) => {
    const onClickHandler = () => {
        onClick()
    };

    return (
        <button onClick={onClickHandler} disabled={loading} className={className}>
            {loading ? loadingText : buttonText }
        </button>)
};

export default Button;