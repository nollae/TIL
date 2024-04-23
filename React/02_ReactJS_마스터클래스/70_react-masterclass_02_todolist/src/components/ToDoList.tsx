import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import CreateToDo from './CreateToDo';
import { categoryState, toDoSelector, toDoState, Categories } from '../atoms';
import ToDo from './ToDo';
import {styled} from 'styled-components';

const Wrapper = styled.div`
    padding: 0px 2rem;
    max-width: 30rem;
    margin: 0px auto;
`;

const Header = styled.header`
    height: 8rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
`;

const Title = styled.h1`
    font-size: 2.4rem;
    font-weight: 700;
    color: ${(props) => props.theme.titleColor};
`;

const CategoryWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: 3rem;
    gap: 0.6rem;
`;

const CategoryButtonWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-direction: column;
    border-radius: 0.7rem;
    overflow-wrap: anywhere;
    overflow: hidden;
`;

const CategoryButton = styled.button<{$isActive:boolean}>`
    width: 100%;
    height: 100%;
    border: ${(props) => props.$isActive ? "0.2rem solid "+ props.theme.titleColor  : "none"};
    border-radius: 0.7rem;
    font-size: 0.9rem;
    color: ${(props) => props.$isActive ? props.theme.titleColor :"rgb(34, 34, 34)"};
    font-weight: ${(props) => props.$isActive ? "700" :"0"};;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    gap: 0.2rem;
    background-color: ${(props) => props.$isActive ? "rgb(226, 232, 249)" : "white"};
    transition: background-color 0.3s ease 0s;

    &:hover {
        background-color: ${(props) => props.disabled ? "" : "rgb(239, 239, 239)"};
        cursor: ${(props) => props.disabled ? "" : "pointer"};
    }
`;

const Hr = styled.hr`
    margin: 2rem auto;
`;



function ToDoList(){
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };
    return (
        <Wrapper>
            <Header>
                <Title>To-Do-List</Title>
            </Header>
            <CategoryWrapper>
                <CategoryButtonWrapper>
                    <CategoryButton $isActive={true} disabled={true} >To Do</CategoryButton>
                </CategoryButtonWrapper>
                <CategoryButtonWrapper>
                    <CategoryButton $isActive={false}>Doing</CategoryButton>
                </CategoryButtonWrapper>
                <CategoryButtonWrapper>
                    <CategoryButton $isActive={false}>Done</CategoryButton>
                </CategoryButtonWrapper>
                <CategoryButtonWrapper>
                    <CategoryButton $isActive={false}>Add+</CategoryButton>
                </CategoryButtonWrapper>
            </CategoryWrapper>

            <Hr />
            <select value={category} onInput={onInput}>
                <option value={Categories.TO_DO} >To Do</option>
                <option value={Categories.DOING} >Doing</option>
                <option value={Categories.DONE} >Done</option>
            </select>
            <CreateToDo />
            {toDos?.map(toDo => <ToDo  key={toDo.id} {...toDo} />)}
        </Wrapper>
    );
}

export default ToDoList;