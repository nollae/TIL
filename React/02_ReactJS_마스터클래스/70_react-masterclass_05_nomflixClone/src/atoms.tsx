import { atom, selector } from 'recoil';
import { recoilPersist } from "recoil-persist";

export interface ILogin {
    email: string,
    password: string,
}

export interface ISignup {
    membership: string,
    email: string, 
    password: string,
}

const { persistAtom } = recoilPersist({
    key: "localStorage", //원하는 key 값 입력
    storage: localStorage,
})

export const loginState = atom<ILogin>({
    key: "login",
    default: {email: "", password: ""},
    effects_UNSTABLE: [persistAtom]
});

export const signupState = atom<ISignup>({
    key: "signup",
    default: {membership: "", email: "", password: ""},
    effects_UNSTABLE: [persistAtom]
});