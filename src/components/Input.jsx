const Input = ({textarea, label, ...props}) => {
    return <p>
        <label htmlFor="">{label}</label>
        {textarea ? <textarea {...props}/> : <input type="text" {...props} />}
    </p>
}

export default Input;