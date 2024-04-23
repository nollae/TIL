import { useRecoilState } from 'recoil';
import { IToDo, toDoState, Categories } from '../atoms';
import { ButtonHTMLAttributes } from 'react';

function ToDo({text , category, id}:IToDo) {

    const [toDos, setToDos] = useRecoilState(toDoState);

    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget:{name},
        } = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            const oldToDo = oldToDos[targetIndex];
            const newToDo = {text, id, category:name as any };

            return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex+1)];
        })
    };

    const handleDelete = (event:React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget:{name},
        } = event;

        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);

            return [...oldToDos.slice(0, targetIndex), ...oldToDos.slice(targetIndex+1)];
            
        })

    }


    return (
        <li>
            <span>
                {text}
            </span>
            {category !== Categories.DOING && <button name={Categories.DOING} onClick={onClick}>Doing</button>}
            {category !== Categories.TO_DO && <button name={Categories.TO_DO} onClick={onClick}>To Do</button>}
            {category !== Categories.DONE &&  <button name={Categories.DONE} onClick={onClick}>Done</button>}
            <button name={Categories.DELETE} onClick={handleDelete}>Del</button>
        </li>
    );
}

export default ToDo;