import { useForm } from 'react-hook-form';

import React, { useEffect, useState } from 'react';

import { loginState } from '../atoms';
import { useRecoilState } from 'recoil';

import styled from 'styled-components';

import LoginHeader from '../Components/LoginHeader';

const Login_Screen_Container = styled.div`
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow: hidden;
    position: relative;
    z-index: 0;
`;

const BackGround_Wrapper = styled.div`
    background-size: cover;
    display: block;
    height: 100%;
    min-height: 100vh;
    overflow: hidden;
    position: absolute;
    width: 100%;
    z-index: -1;
    opacity: 0.5;
    pointer-events: none;
    img {
        min-height: 100%;
        min-width: 100%;
    }
`;

const Login_Wrapper = styled.div`
    margin-bottom: 50px !important;
    max-width: 450px;
    -webkit-box-flex: 1;
    flex-grow: 1;
    margin: 0 auto;
    padding: 0 5%;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
`;

const Login_Container = styled.div`
    min-height: 707px;
    padding: 48px 16px;
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin: 0;
    width: 100%;
`;

const Title_Wrapper = styled.header`
    text-align: left;
    h1 {
        margin-bottom: 28px !important;
        margin-block-start: 0;
        margin-block-end: 0;
        margin: 0;
        padding: 0;
        color: rgb(255, 255, 255);
        font-size: 2rem;
        font-weight: 700;
    }
`;

const Form_Container = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Email_Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    -webkit-box-flex: 1;
    flex-grow: 1;
`;

const Email_Container = styled.div`
    position: relative;
    display: inline-flex;
    flex-wrap: wrap;
    vertical-align: text-top;
`;

const Label_Common = styled.label`
    font-weight: 400;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.7);
    position: absolute;
    z-index: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition-property: top, font-size, line-height;
    transition-duration: 250ms;
    pointer-events: none;
    left: 1rem;
    right: 1rem;
    display: block; 
`;

const Email_Label = styled(Label_Common)<{$isEmailFocus?:boolean}>`
    font-size: ${(props) => props.$isEmailFocus ? "0.75rem" : "1rem"};
    transition-timing-function: ${(props) => props.$isEmailFocus ? "cubic-bezier(0.5, 0, 0.1, 1)" : "cubic-bezier(0.9, 0, 0.51, 1)"};
    top: ${(props) => props.$isEmailFocus ? "0.5rem" : "1rem"};
`;

const Email_Input_Container = styled.div`
    font-size: 1rem;
    font-weight: 400;
    color: rgb(255, 255, 255);
    fill: currentcolor;
    min-width: 12.5rem;
    padding: 0px;
    width: 100%;
    -webkit-box-align: center;
    align-items: center;
    display: inline-flex;
    gap: 2px;
    letter-spacing: normal;
    line-height: 100%;
    position: relative;
    text-align: left;
    z-index: 0;
`;

const Input_Common = styled.input`
    &:focus-visible {
        outline: 0;
    }
    line-height: 1.5 !important;
    font-size: 1rem !important;
    width: 100%;
    color: inherit;
    padding: 1.5rem 1rem 0.5rem;
    min-height: 16px;
    min-width: 16px;
    animation: animation-14hycbg;
    appearance: none;
    background: transparent;
    background-clip: padding-box;
    border: 0 solid transparent;
    font: inherit;
    letter-spacing: inherit;
    margin: 0;
    text-align: inherit;
    text-decoration: inherit;
    text-transform: inherit;
`;

const Email_Input = styled(Input_Common)<{$isEmailFocus?:boolean,}>`
    filter: opacity(${(props) => props.$isEmailFocus ? 100 : 0}%);
`;

const Input_Border_Common = styled.div`
    background: rgba(22, 22, 22, 0.7);
    border-width: 1px;
    border-style: solid;
    border-radius: 0.25rem;
    color: transparent;
    position: absolute;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    /* border: 1px solid black; */
    user-select: none;
`;

const Email_Input_Border = styled(Input_Border_Common)<{$isFocus?:boolean, $isEmailError?:boolean, $isValid?:boolean}>`
    outline: ${(props) => props.$isFocus ? "rgb(255, 255, 255) solid 0.125rem" : "none"};
    outline-offset: ${(props) => props.$isFocus ? "0.125rem" : "none"};
    border-color: ${(props) => props.$isEmailError ? "rgb(235, 57, 66)" : (props.$isValid) ? "rgb(43, 184, 113)" : "rgba(128, 128, 128, 0.7)"} ;
`;

const Error_Container_Common = styled.div`
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.53846;
    color: rgb(235, 57, 66);
    fill: currentcolor;
    margin-top: 0.375rem;
    width: 100%;
    svg {
        margin-right: 0.25rem;
        position: relative;
        top: 0.1875rem;
    }
`;

const Email_Error_Container = styled(Error_Container_Common)<{$isEmailError?:boolean}>`
    svg {
        display: ${(props) => props.$isEmailError ? "" : "none" };
    }
`;

interface IForm {
    email: string,
    password: string,
}

function Login(){
    // useForm hook
    const { register, watch, handleSubmit, formState:{errors, isValid, isValidating}, getValues, setValue, trigger, setFocus} = useForm<IForm>();
    const [login, setLogin] = useRecoilState(loginState);

    const onValid = (data:IForm) => {
        if(isValid){
            setLogin((items) => ({...data}));
        }
    }

    
    // 이메일
    const [isCmFocusEamil, setIsCmFocusEamil] = useState(false);
    const [isEmailFocus, setIsEmailFocus] = useState(false);
    const handleEmailFocus = () => {
        setIsEmailFocus(true);
        setIsCmFocusEamil(true);
    }

    useEffect(() => {
        // 이메일 Setting
        if(login.email) {
            setValue("email", login.email);
            handleEmailFocus();
            trigger();
            setFocus("email");
        }
    }, []);


    return (

        <Login_Screen_Container>
            {/* 배경 이미지 설정 */}
            <BackGround_Wrapper>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/d253acf4-a1e2-4462-a416-f78802dc2d85/df3e63de-ea64-4e5e-b42a-370630b4c8ee/KR-ko-20240429-POP_SIGNUP_TWO_WEEKS-perspective_WEB_e969cb3e-6c59-41db-82f3-8f4aa5209d72_small.jpg" alt="" />
            </BackGround_Wrapper>
            {/* 헤더 */}
            <LoginHeader />
            {/* 로그인  */}
            <Login_Wrapper>
                <Login_Container>
                    {/* 로그인 제목 */} 
                    <Title_Wrapper>
                        <h1>로그인</h1>
                    </Title_Wrapper>
                    {/* 로그인 양식 */}
                    <Form_Container onSubmit={handleSubmit(onValid)}>
                        {/* 이메일 */}
                        <Email_Wrapper>
                            <Email_Container>
                                <Email_Label 
                                    $isEmailFocus={isEmailFocus} 
                                    htmlFor="email"
                                >이메일 주소 또는 휴대폰 번호</Email_Label>
                                <Email_Input_Container>
                                    <Email_Input
                                        id="email"
                                        $isEmailFocus={isEmailFocus}
                                        onFocus={handleEmailFocus}
                                        {...register("email", { 
                                            required: "이메일 주소는 반드시 입력하셔야 합니다.",
                                            pattern:{
                                                value:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, 
                                                message:"이메일 주소를 정확히 입력하세요."
                                            },
                                            minLength: {
                                                value: 5,
                                                message: "이메일 주소는 반드시 입력하셔야 합니다."
                                            },
                                            maxLength: 50,
                                            onBlur: () => {
                                                if(!getValues("email"))
                                                    setIsEmailFocus(false);
                                                setIsCmFocusEamil(false);

                                            },
                                        })}
                                    />
                                    <Email_Input_Border 
                                        $isFocus={isCmFocusEamil} 
                                        $isEmailError={(errors?.email?.message) ? true : false} 
                                        $isValid={isValid} 
                                    />
                                </Email_Input_Container>
                                <Email_Error_Container
                                    $isEmailError={(errors?.email?.message) ? true : false}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img" data-icon="CircleXSmall" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z" fill="currentColor">
                                        </path>
                                    </svg>
                                    {errors?.email?.message}
                                </Email_Error_Container>
                            </Email_Container>
                        </Email_Wrapper>
                    </Form_Container>
                </Login_Container>

            </Login_Wrapper>
        </Login_Screen_Container>
        
    );
}

export default Login;