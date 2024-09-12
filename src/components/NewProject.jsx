import Input from "./Input";
import Modal from "./Modal";
import { useRef } from 'react';

const NewProject = ({ onAdd, onCancel }) => {

    const title = useRef();
    const description = useRef();
    const dueDate = useRef();
    const modalRef = useRef();

    const handleSave = () => {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;
        if (enteredTitle.trim() === '' ||
            enteredDescription.value?.trim() === '' ||
            enteredDueDate.value?.trim() === '') {
            modalRef.current?.open()
            console.log('open')
            return
        }
        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        });
    }

    const handleCancel = () => {
        onCancel();
    }

    return (
        <>
            <Modal ref={modalRef} buttonCaption="Cancel">
                <h2 className="text-xl font-bold text-stone-700 mb-4 ">Invalid Input</h2>
                <p className='text-stone-600 mb-4'>Ooops ... looks like you forgot to enter a value.</p>
                <p className='text-stone-600 mb-4'>Please make sure you provide a valid value for every input field.</p>
                </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <button
                        className="text-stone-800 hover:text-stone-950"
                        onClick={handleCancel}
                    >Cancel</button>
                    <button
                        className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </menu>
                <div>
                    <Input type="text" ref={title} label="Title" />
                    <Input ref={description} label="Description" textarea />
                    <Input type="date" ref={dueDate} label="Due Date" />
                </div>
            </div>
        </>
    )
}

export default NewProject;