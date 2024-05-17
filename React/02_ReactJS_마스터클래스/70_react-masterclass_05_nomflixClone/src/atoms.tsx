import { atom, selector  } from 'recoil';
import { recoilPersist } from "recoil-persist";

// 로그인
export interface ILogin {
    email: string,
    password: string,
}

// 회원가입
export interface ISignup {
    membership: string,
    email: string, 
    password: string,
}

// 사용자 정보
export interface IUser {
    email: string,
    muted: boolean,
    favoriteVideos: number[],
    votedVideos: number[],
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

export const userState = atom<IUser| null>({
    key: "user",
    default: null,
    effects_UNSTABLE: [persistAtom]
})

// 사용자가 로그인하고 로그인 정보가 갱신될 때 사용자 정보 업데이트
export const userSelector = selector({
    key: "userSelector",
    get: ({get}) => {
        const loginData = get(loginState);
        const user = get(userState);
        if(user !== null){
            return {
                ...user,
                email: loginData.email
            };
        }
        return null;
    },
    set: ({set, get}, newValue) => {
        set(userState, newValue)
    }
});

// 관심 있는 영상을 추가하는 함수
export const addFavoriteVideo = selector({
    key: "addFavoriteVideo",
    get: ({get}) => {
        return 0;
    },
    set: ({ get, set }, newValue) => {
        if (typeof newValue === 'number') {
            const user = get(userState);
            if (user !== null) {
                const updatedVideos = [...user.favoriteVideos];
                if (!updatedVideos.includes(newValue)) { // 중복된 값이 없을 때만 추가
                    updatedVideos.push(newValue);
                    const updatedUser = {
                        ...user,
                        favoriteVideos: [...user.favoriteVideos, newValue]
                    };
                    set(userState, updatedUser as IUser | null);
                }
            }
        }
    }
});

// 관심 있는 영상을 제거하는 함수
export const removeFavoriteVideo = selector({
    key: "removeFavoriteVideo",
    get: ({get}) => {
        return 0;
    },
    set: ({ get, set }, newValue) => {
        if (typeof newValue === 'number') {
            const user = get(userState);
            if (user !== null) {
                const updatedUser = {
                    ...user,
                    favoriteVideos: user.favoriteVideos.filter((id:number) => id !== newValue)
                };
                set(userState, updatedUser as IUser | null);
            }
        }
    }
});

// 좋아요 영상을 추가하는 함수 votedVideos
export const addVotedVideos = selector({
    key: "addVotedVideos",
    get: ({get}) => {
        return 0;
    },
    set: ({ get, set }, newValue) => {
        if (typeof newValue === 'number') {
            const user = get(userState);
            if (user !== null) {
                const updatedVideos = [...user.votedVideos];
                if (!updatedVideos.includes(newValue)) { // 중복된 값이 없을 때만 추가
                    updatedVideos.push(newValue);
                    const updatedUser = {
                        ...user,
                        votedVideos: [...user.votedVideos, newValue]
                    };
                    set(userState, updatedUser as IUser | null);
                }
            }
        }
    }
});

// 좋아요 영상을 제거하는 함수
export const removeVotedVideos = selector({
    key: "removeVotedVideos",
    get: ({get}) => {
        return 0;
    },
    set: ({ get, set }, newValue) => {
        if (typeof newValue === 'number') {
            const user = get(userState);
            if (user !== null) {
                const updatedUser = {
                    ...user,
                    votedVideos: user.votedVideos.filter((id:number) => id !== newValue)
                };
                set(userState, updatedUser as IUser | null);
            }
        }
    }
});

// 음소거 제어 함수
export const changeMute = selector({
    key: "changeMute",
    get: ({get}) => {
        return true;
    },
    set: ({ get, set }, newValue) => {
        if (typeof newValue === 'boolean') {
            const user = get(userState);
            if (user !== null) {
                const updatedUser = {
                    ...user,
                    muted: newValue
                };
                set(userState, updatedUser as IUser | null);
            }
        }
    }
});
