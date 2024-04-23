import { atom, selector } from 'recoil';
import { recoilPersist } from "recoil-persist";

export enum Categories {
    "TO_DO" = "TO_DO", 
    "DOING" = "DOING",
    "DONE" = "DONE",
    "DELETE" ="DELETE"
}

export interface IToDo {
    text: string;
    category: Categories;
    id: number;
}

const { persistAtom } = recoilPersist({
    key: "localStorage", //원하는 key 값 입력
    storage: localStorage,
})

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TO_DO,
    effects_UNSTABLE: [persistAtom],
});

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        const category = get(categoryState);

        if(category === Categories.TO_DO) 
            return toDos.filter((toDo) => toDo.category === Categories.TO_DO);
        if(category === Categories.DOING) 
            return toDos.filter((toDo) => toDo.category === Categories.DOING);
        if(category === Categories.DONE) 
            return toDos.filter((toDo) => toDo.category === Categories.DONE);

    }
})