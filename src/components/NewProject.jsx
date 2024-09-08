import Input from "./Input";

const NewProject = () => {
    return <div>
        <menu>
            <button>Cancel</button>
            <button>Save</button>
        </menu>
        <div>
            <Input label="Title" />
            <Input label="Description" textarea />
            <Input label="Due Date" />
        </div>
    </div>
}

export default NewProject;