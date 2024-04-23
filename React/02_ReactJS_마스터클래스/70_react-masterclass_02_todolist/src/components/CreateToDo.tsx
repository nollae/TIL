import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryState, toDoState } from '../atoms';

interface IForm {
    toDo: string;
}

function CreateToDo() {

    const category = useRecoilValue(categoryState);

    const [toDos, setToDos] = useRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();

    const handleValid = ({toDo}:IForm) => {
        setToDos((oldToDos) => [
            { text: toDo, id: Date.now(), category },
            ...oldToDos,
          ]);
        setValue("toDo", "");
    };

    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input {...register("toDo",
                    {
                        required: "Please Write a To Do",
                    })} 
                    placeholder="Write a to do" 
            />
            <button>Add</button>
        </form>
    );
}

export default CreateToDo;