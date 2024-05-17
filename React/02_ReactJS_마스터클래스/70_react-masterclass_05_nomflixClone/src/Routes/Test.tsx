import { Link, useHistory, useRouteMatch } from 'react-router-dom'; 
import { useState, useRef, useEffect } from 'react';

import { motion, useAnimation, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"; 

import { useForm } from 'react-hook-form';

import styled from 'styled-components';

import { IGetMoviesResult, getMovies, 
    getMoviesPopular, getMoviesTop,
    IGetMovieVideos, getMovieVideos,   
    IGetMovieDetails, getMovieDetails,
    IGetMovieCredits, getMovieCredits,
    IGetMoviesSimilar, getMoviesSimilar 
} from '../api';
import { makeImagePath, makeVideoPath } from '../utils';

import { useQuery } from 'react-query';

import ReactPlayer from 'react-player';

import Detail from './Detail';

import { userSelector, addFavoriteVideo, 
        removeFavoriteVideo, userState, 
        IUser, loginState,
        addVotedVideos, removeVotedVideos
    } from '../atoms';
import { useRecoilState, useSetRecoilState,useRecoilValue } from "recoil";
import { exit } from 'process';



const Body_Container = styled.div<{$isOpen?:boolean}>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    -webkit-locale: "ko-KR";
    width: 100%;
    z-index: 0;
    overflow: ${(props) => props.$isOpen ? "hidden" : "visible"};    
`;

const Header_Wrapper = styled(motion.div)`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    position: sticky;
    top: 0;
    height: auto;
    min-height: 70px;
    z-index: 1;    
`;

const Header_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    left: 0;
    position: relative;
    right: 0;
    top: 0;
    z-index: 1;
    background: transparent;    
`;

const Banner = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    overflow: auto;
`;

const Home_Header_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    align-items: center;
    display: flex;
    font-size: 1.2rem;
    padding: 0 4%;
    position: relative;
    transition: background-color .4s;
    background-image: linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent);
    z-index: 2;
    height: 68px;
    background-color: transparent;    
`;

const Home_Logo = styled.a`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    background-color: transparent;
    speak: none;
    font-family: nf-icon;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    line-height: 1;
    text-transform: none;
    transform: translateZ(0);
    color: #e50914;
    cursor: pointer;
    display: inline-block;
    margin-right: 5px;
    text-decoration: none;
    vertical-align: middle;
    font-size: 25px;    
`;

const _Logo = styled(motion.svg)`
  /* margin-right: 50px; */
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
`;

const Nav_Items_Container = styled.ul`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 1.2rem;
    align-items: center;
    display: flex;
    margin: 0;
    padding: 0;    
`;

const Nav_Tab_Wrapper = styled.li`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 1.2rem;
    list-style-type: none;
    margin-left: 18px;
    display: none;    
    a{
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        font-size: 1.2rem;
        list-style-type: none;
        background-color: transparent;
        color: #fff;
        cursor: pointer;
        text-decoration: none;
        align-items: center;
        display: flex;
        font-weight: 500;
        height: 100%;
    }
`;

const Nav_Item_Wrapper = styled.li`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 1.2rem;
    list-style-type: none;
    margin-left: 18px;
    display: block;
    a{
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        font-size: 0.75rem;
        list-style-type: none;
        background-color: transparent;
        text-decoration: none;
        outline: none;
        align-items: center;
        display: flex;
        height: 100%;
        position: relative;
        transition: color .4s;
        cursor: default;
        font-weight: 500;
        color: #fff;
    }
`;

const Nav_Items_Container2 = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 1.2rem;
    align-items: center;
    display: flex;
    flex-grow: 1;
    height: 100%;
    justify-content: flex-end;
    position: absolute;
    right: 4%;
    top: 0;   
`;

const Nav_Item_Wrapper2 = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 1.2rem;
    margin-right: 10px;    
`;

const Search_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 1.2rem;
    display: inline-block;
    vertical-align: middle;    
`;

const Search_Button = styled(motion.button)<{$isOpen:boolean}>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    color: inherit;
    font: inherit;
    margin: 0;
    overflow: visible;
    text-transform: none;
    -webkit-appearance: button;
    background: transparent;
    border: none;
    cursor: pointer;
    display: ${(props) => props.$isOpen ? "none" : "inline-block"};   
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        color: inherit;
        font: inherit;
        text-transform: none;
        cursor: pointer;
        fill: none;
        width: 24;
        height: 24;
        overflow: hidden;
        margin-right: 0;
    } 
`;

const Search_Input_Container = styled(motion.div)<{$isOpen:boolean}>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 1.2rem;
    align-items: center;
    background: rgba(0,0,0,.75);
    border: 1px solid hsla(0,0%,100%,.85);
    display: ${(props) => props.$isOpen ? "flex" : "none"};    
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        color: #fff;
        cursor: default;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        font-size: 1.2rem;
        fill: none;
        width: 40px;
        height: 24;
        overflow: hidden;
        padding: 0 6px;
        margin-right: 0;
    }
`;

const Search_Label = styled(motion.label)`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 1.2rem;
    clip: rect(1px,1px,1px,1px)!important;
    height: 1px!important;
    overflow: hidden!important;
    position: absolute!important;
    white-space: nowrap!important;
    width: 1px!important;    
`;

const Search_Input = styled(motion.input)`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    direction: ltr;
    font: inherit;
    margin: 0;
    background: transparent;
    border: none;
    box-sizing: border-box;
    color: #fff;
    display: inline-block;
    font-size: 14px;
    outline: none;
    padding: 7px 14px 7px 7px;
    width: 212px;
    height: 34px;
    line-height: 34px;
`;

const Search_Close_Button = styled(motion.span)`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    user-select: none;
    word-break: keep-all;
    speak: none;
    font-family: nf-icon;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    line-height: 1;
    text-transform: none;
    transform: translateZ(0);
    cursor: pointer;
    font-size: 13px;
    margin: 0 6px;   
    svg {
        flex-shrink: 0;
        transform: rotate(-45deg);
        width: 30px;
    }
`;

const Notice_Wrapper = styled.span`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 1.2rem;
    white-space: normal;
    position: relative;    
`;

const Notice_Button = styled.button`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    white-space: normal;
    color: inherit;
    font: inherit;
    margin: 0;
    overflow: visible;
    text-transform: none;
    -webkit-appearance: button;
    cursor: pointer;
    background-color: transparent;
    border: none;
    font-size: 1.5em;
    line-height: 1;
    margin-top: .2em;
    padding: 2px 6px 3px;
    position: relative;
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        white-space: normal;
        color: inherit;
        font: inherit;
        text-transform: none;
        cursor: pointer;
        font-size: 1.5em;
        line-height: 1;
        fill: none;
        width: 24;
        height: 24;
        overflow: hidden;
    }    
`;

const Account_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    display: block;
    font-size: 12px;
    position: relative;
    z-index: 0;    
`;

const Account_DropDown_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 12px;
    align-items: center;
    cursor: pointer;
    display: flex;
    width: 100%;
`;

const Account_Button_Wrapper = styled.a`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 12px;
    background-color: transparent;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    z-index: -1;
    display: block;
`;

const Account_Caret = styled.span<{$isOpen:boolean}>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 12px;
    cursor: pointer;
    border-color: #fff transparent transparent;
    border-style: solid;
    border-width: 5px 5px 0;
    height: 0;
    margin-left: 10px;
    transition: transform 367ms cubic-bezier(.21,0,.07,1);
    width: 0;    
    // open
    transform: ${(props) => props.$isOpen ? "rotate(180deg)" : "" };
`;

const Account_Button = styled.span`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    align-items: center;
    display: flex;
    position: relative;
    img {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        font-size: 12px;
        color: #fff;
        cursor: pointer;
        border: 0;
        border-radius: 4px;
        height: 32px;
        vertical-align: middle;
        width: 32px;
    }
`;

const Menu_Wrapper = styled.div<{$isOpen:boolean}>`
    display: ${(props) => props.$isOpen ? "" : "none"};
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    background-color: rgba(0,0,0,.9);
    border: 1px solid hsla(0,0%,100%,.15);
    box-sizing: border-box;
    color: #fff;
    cursor: default;
    font-size: 13px;
    line-height: 21px;
    margin-left: 0;
    padding: 0;
    position: absolute;
    right: 0;
    top: 52px;
    width: 220px;
    opacity: 0.35;
`;

const Menu_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    color: #fff;
    cursor: default;
    font-size: 13px;
    line-height: 21px;
    box-sizing: border-box;    
`;

const Menu_Block = styled.ul`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    color: #fff;
    font-size: 13px;
    line-height: 21px;
    box-sizing: border-box;
    cursor: default;
    height: auto;
    margin: 0;
    width: 100%;
    border-top: 1px solid hsla(0,0%,100%,.25);
    padding: 10px 0;
    display: block;    
`;

const Account_Menu_Container = styled.ul`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    color: #fff;
    font-size: 13px;
    line-height: 21px;
    box-sizing: border-box;
    cursor: default;
    display: block;
    height: auto;
    margin: 0;
    padding: 0;
    width: 100%;
    padding-bottom: 10px;
`;

const Menu_Item_Wrapper = styled.li`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    color: #fff;
    box-sizing: border-box;
    cursor: default;
    display: block;
    font-size: 13px;
    line-height: 16px;
    padding: 5px 10px;    
`;

const Menu_Item = styled.a`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    font-size: 13px;
    line-height: 16px;
    background-color: transparent;
    cursor: pointer;
    text-decoration: none;
    box-sizing: border-box;
    color: #fff;
    text-transform: none;
    width: 100%;
    align-items: center;
    display: flex;
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        font-size: 13px;
        line-height: 16px;
        cursor: pointer;
        text-transform: none;
        width: 40px;
        /* fill: none;
        width: 24;
        height: 24; */
        overflow: hidden;
        color: #b3b3b3;
        padding: 0 13px 0 5px;
    }    
`;

const Menu_Item_Title = styled.span`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    font-size: 13px;
    line-height: 16px;
    cursor: pointer;
    color: #fff;
    text-transform: none;
    box-sizing: border-box;    
`;

const Logout_Container = styled.ul`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    color: #fff;
    font-size: 13px;
    line-height: 21px;
    box-sizing: border-box;
    cursor: default;
    display: block;
    height: auto;
    margin: 0;
    width: 100%;
    border-top: 1px solid hsla(0,0%,100%,.25);
    padding: 10px 0;    
`;

const MainView_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    min-height: 1000px;
    position: relative;
    z-index: 0;    
`;

const MainView_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    /* overflow: hidden; */
    padding: 0 0 50px;
    z-index: 0;
    margin-top: -70px;    
`;

const Main_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    display: block;
    position: relative;
    z-index: 1;    
`;

const Main_Content_Wrapper = styled.div<{ $bgPhoto?: string }>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    background-color: #000;
    margin-bottom: 20px;
    padding-bottom: 40%;
    touch-action: pan-y;
    user-select: none;
    left: 0;
    position: relative;
    right: 0;
    top: 0;
    /* background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto}); */
`;

const Main_Content_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    user-select: none;
    background-color: #000;
    height: 56.25vw;
    position: absolute;
    width: 100%;
    z-index: 0;    
`;

const Main_Cotent_Img_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    user-select: none;
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    img {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        color: #fff;
        cursor: default;
        font-size: .85vw;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        user-select: none;
        border: 0;
        z-index: 5;
        background-position: 50%;
        background-size: cover;
        bottom: 0;
        left: 0;
        opacity: 1;
        position: absolute;
        right: 0;
        top: 0;
        transition: opacity .4s cubic-bezier(.665,.235,.265,.8) 0s;
        width: 100%;
    }
`;

const Main_Info_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    user-select: none;
    height: 100%;
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;    
`;

const Main_Info_Layer = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    user-select: none;
    bottom: 35%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    left: 4%;
    position: absolute;
    top: 0;
    /* width: 100%; */
    z-index: 10;
`;

const Main_Info_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    user-select: none;
    transition: transform 1.5s cubic-bezier(.165,.84,.44,1);
    width: 100%;    
`;

const Main_Title_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    user-select: none;
    transform-origin: left bottom;
    transform: scale(1) translate3d(0px, 0px, 0px);
    transition-duration: 1300ms;
    transition-delay: 0ms;    
`;

const Main_Title = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    user-select: none;
    transform-origin: left bottom;
    transform: scale(1) translate3d(0px, 0px, 0px);
    transition-duration: 1300ms;
    transition-delay: 0ms;

    font-size: 3rem;
    font-weight: 500;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, .45);
    /* background-color: rgba(0, 0, 0, 0.35); */
`;

const Main_Detail_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    user-select: none;
    transform: translate3d(0px, 0px, 0px);
    transition-duration: 1300ms;
    transition-delay: 0ms;
    opacity: 1;
    width: 36%;
`;

const Main_Detail = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    user-select: none;
    color: #fff;
    font-size: 1.2vw;
    font-weight: 400;
    line-height: normal;
    text-shadow: 2px 2px 4px rgba(0,0,0,.45);
    width: 100%;
    margin: .5vw 0 0;
`;

const Main_Button_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    user-select: none;
    position: relative;
    z-index: 10;
    display: flex;
    line-height: 88%;
    margin-top: 1.5vw;
    white-space: nowrap;   
`;

const Main_Button_Wrapper = styled.a`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    user-select: none;
    line-height: 88%;
    white-space: nowrap;
    background-color: transparent;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    align-items: center;
    display: flex;
    justify-content: center;
    flex-shrink: 0;    
`;

const Main_Play_Button_Container = styled.button`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    margin: 0;
    overflow: visible;
    text-transform: none;
    -webkit-box-align: center;
    align-items: center;
    appearance: none;
    border: 0px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    opacity: 1;
    /* padding: 0.8rem; */
    position: relative;
    user-select: none;
    will-change: background-color, color;
    word-break: break-word;
    white-space: nowrap;
    margin-bottom: 1rem;
    margin-right: 1rem;
    background-color: white;
    color: black;
    margin-left: 0;
    padding-left: 0.75rem;
    padding-right: 1.4rem;
    &:hover{
        background-color: rgba(255, 255, 255, 0.75);
        /* background-color: rgba(109, 109, 110, 0.4) */
    }
`;

const Play_Button_Svg_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: black;
    line-height: 0;
`;

const Play_Button_Svg = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: black;
    line-height: 0;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    height: 1.1rem;
    width: 1.1rem;
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font: inherit;
        text-transform: none;
        cursor: pointer;
        user-select: none;
        word-break: break-word;
        white-space: nowrap;
        color: black;
        line-height: 0;
        fill: none;
        overflow: hidden;
        height: 100%;
        width: 100%;
    }
`;

const Play_Gap = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: black;
    box-sizing: border-box;
    display: flex;
    height: 100%;
    position: relative;
    width: 0.5rem;    
`;

const Play_Title = styled.span`
    -webkit-text-size-adjust: 100%;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: black;
    -webkit-font-smoothing: antialiased;
    display: block;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 2rem;    
`;

const Detail_Button_Wrapper = styled.button`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    margin: 0;
    overflow: visible;
    text-transform: none;
    -webkit-box-align: center;
    align-items: center;
    appearance: none;
    border: 0px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    opacity: 1;
    /* padding: 0.8rem; */
    position: relative;
    user-select: none;
    will-change: background-color, color;
    word-break: break-word;
    white-space: nowrap;
    margin-bottom: 1rem;
    margin-right: 1rem;
    background-color: rgba(109, 109, 110, 0.7);
    color: white;
    padding-left: 0.75rem;
    padding-right: 1.4rem;
    flex-shrink: 0;    
    &:hover {
        background-color: rgba(109, 109, 110, 0.4);
    }
`;

const Detail_Button_Svg_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: white;
    line-height: 0;
`;

const Detail_Button_Svg = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: white;
    line-height: 0;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    height: 1.1rem;
    width: 1.1rem;
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font: inherit;
        text-transform: none;
        cursor: pointer;
        user-select: none;
        word-break: break-word;
        white-space: nowrap;
        color: white;
        line-height: 0;
        fill: none;
        overflow: hidden;
        height: 100%;
        width: 100%;
    }    
`;

const Detail_Gap = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: white;
    box-sizing: border-box;
    display: flex;
    height: 100%;
    position: relative;
    width: 0.5rem; 
`;

const Detail_Title = styled.span`
    -webkit-text-size-adjust: 100%;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: white;
    -webkit-font-smoothing: antialiased;
    display: block;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 2rem;  
`;

const Detail_Backgound = styled.div<{$isOpen?:boolean}>`
    /* display: ${(props) => props.$isOpen ? "" : "none"}; */
    z-index: 99;
    overflow-y: auto;
    position: relative;
    top: 0;
    left: 0;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    opacity: 0.7;   
    div {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        color: #fff;
        cursor: default;
        user-select: none;
        font-size: .85vw;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        background-color: #000;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
    } 
`;

const Slide_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    z-index: 1;
    transition: transform .54s cubic-bezier(.5,0,.1,1) 0s;
    outline: 0;
    position: relative;
    box-sizing: border-box;
    margin: 8vw 0;
    padding: 0;    
`;

const Slide_Title_Wrapper = styled.h2`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    font-weight: 500;
    line-height: 1.3;
    margin: 0;
    a {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.3;
        background-color: transparent;
        cursor: pointer;
        color: #e5e5e5;
        display: inline-block;
        font-size: 1.4vw;
        font-weight: 500;
        margin: 0 4% .5em;
        min-width: 6em;
        text-decoration: none;
    }
`;

const Slide_Title = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    cursor: pointer;
    color: #e5e5e5;
    font-weight: 500;
    display: table-cell;
    font-size: 1.4vw;
    line-height: 1.25vw;
    vertical-align: bottom;    
    text-shadow: 2px 2px 4px rgba(0, 0, 0, .45);
`;

const Slide_More_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.3;
    cursor: pointer;
    color: #e5e5e5;
    font-size: 1.4vw;
    font-weight: 500;
    display: table-cell;
    vertical-align: bottom;    
`;

const Slide_More_Title = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    font-weight: 500;
    cursor: pointer;
    display: inline-block;
    font-size: .9vw;
    line-height: .8vw;
    margin-right: 4px;
    max-width: 0;
    opacity: 0;
    transition: max-width 1s,opacity 1s,transform .75s;
    vertical-align: bottom;
    white-space: nowrap;
    color: #54b9c5;
`;

const Slide_Content_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    position: relative;
    z-index: 0;
    transition: transform .54s cubic-bezier(.5,0,.1,1) 0s;
    /* height: 7.7rem; */
`;

const Slide_Layer_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    box-sizing: border-box;
    padding: 0;
    /* height: 7.7rem; */
`;

const Slide_Content_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    margin: 0;
    padding: 0 4%;
    position: relative;
    touch-action: pan-y;
    z-index: 2; 
    height: 7.7rem;
`;

const Pagination_Container = styled.ul`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    list-style-type: none;
    margin: -24px 0 12px;
    padding: 0;
    position: absolute;
    right: 4%;
    top: 0;
    display: block;
`;

const Pagination = styled.li<{$isActive:boolean}>`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    list-style-type: none;
    display: inline-block;
    height: 2px;
    margin-left: 1px;
    width: 12px;
    background-color: ${(props) => props.$isActive ? "#aaa" : "#4d4d4d"};    
`;

const Slider_Wrapper = styled(motion.div)`
    position: relative;
    width: 100%;

    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    padding-bottom: 1px;
    overflow-x: visible;
`;

const Slider_Container = styled(motion.div)`
    position: absolute;
    width: 100%;
    height: 100%;

    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    white-space: nowrap;    
`;

const Slider_Item_Wrapper = styled(motion.div)`
    width: 16.8%;

    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    box-sizing: border-box;
    display: inline-block;
    padding: 0 .2vw;
    position: relative;
    vertical-align: top;
    white-space: normal;
    z-index: 1;
    /* width: 25%; */
    padding-left: 0;   
    
    &:first-child {
        transform-origin: center left !important;
    }
    &:last-child {
        transform-origin: center right !important;
    }
`;

const Slider_Item_Container = styled.div`
    max-height: 140px;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    white-space: normal;
    position: relative;
    z-index: 1;
    display: block;    
`;

const Slider_Item = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    white-space: normal;
    background-color: transparent;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    display: block;
    /* background-color: #181818;  */
`;

const Slider_Img_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    white-space: normal;
    color: #fff;
    cursor: pointer;
    border-radius: .2vw;
    padding: 28.125% 0;
    height: 0;
    overflow: hidden;
    position: relative;
    width: 100%;  
    img {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        font-size: .85vw;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        white-space: normal;
        color: #fff;
        border: 0;
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        cursor: pointer;
        content-visibility : auto;
    }   
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        font-size: .85vw;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        white-space: normal;
        color: #fff;
        cursor: pointer;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        bottom: 0;
        left: 0;
        position: absolute;
        right: auto;
        top: 0;
        width: 50%;
    }
`;

const Slider_Img_Title = styled(motion.div)`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    white-space: normal;
    color: #fff;
    cursor: pointer;
    bottom: 0;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    border-radius: 4px;
    /* opacity: 0; */
    p {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        color: #fff;
        cursor: pointer;
        bottom: 0;
        box-sizing: border-box;
        font-size: 1.5em;
        font-weight: 500;
        left: 8%;
        margin: 0;
        overflow: hidden;
        padding: 0 0 4%;
        position: absolute;
        right: 8%;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, .45);
    }
`;

const Slider_Next_Wrapper = styled.span`
    /* height: 12rem; */
    height: 100%;

    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    bottom: 0;
    color: #fff;
    display: flex;
    justify-content: center;
    position: absolute;
    text-align: center;
    top: 0;
    width: 3.6%;
    z-index: 20;
    cursor: pointer;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    background: hsla(0,0%,8%,.5);    
    &:hover {
        background: hsla(0, 0%, 8%, .7);
        div > svg {
            fill: white;
        }
    }
`;

const Sldier_Next_Img = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    color: #fff;
    /* text-align: center; */
    cursor: pointer;
    /* speak: none;
    font-family: nf-icon;
    font-style: normal;
    font-variant: normal;
    font-weight: 400; */
    line-height: 1;
    text-transform: none;
    transform: translateZ(0);
    align-self: center;
    /* display: none; */
    /* font-size: 2.5vw; */
    height: auto;
    transition: transform .1s ease-out 0s;
    transform-origin: 45% 50%;    
    padding-left: 7px;
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font: inherit;
        text-transform: none;
        cursor: pointer;
        user-select: none;
        word-break: break-word;
        white-space: nowrap;
        color: white;
        line-height: 0;
        fill: none;
        overflow: hidden;
        height: 100%;
        width: 100%;
    }   
`;

const Content_Play_Wrapper = styled(motion.div)`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    box-sizing: inherit;
    align-items: center;
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    opacity: 0;
    /* 수정 */
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity .2s ease-in;
    /* &:hover{
        opacity: 1;
    } */
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        fill: none;
        box-sizing: inherit;
        overflow: hidden;
        background-color: rgba(30,30,20,.5);
        border: 1px solid #fff;
        border-radius: 2em;
        height: 3em;
        padding: .5em;
        width: 3em;
    }
`;


const Control_Button_Container = styled(motion.div)`
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 10px;
    opacity: 0;
    margin: 0;
    height: 4rem;

    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    cursor: auto;
    align-items: center;
    display: flex;
    margin-bottom: 1em;
    min-height: 2em;
    position: relative;
    z-index: 2;
    box-sizing: inherit; 
    background-color: #181818;  
`;

const Main_Title_Wrapper_ = styled(motion.div)`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    user-select: none;
    transform-origin: left bottom;
    transform: scale(1) translate3d(0px, 0px, 0px);
    transition-duration: 1300ms;
    transition-delay: 0ms;    
    background-color: #181818;  
    padding: 7px;
    padding-top: 15px;
    opacity: 0;
    margin: 0;
`;

const Main_Title_ = styled.div`
    text-align: center;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    font-size: .85vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    user-select: none;
    transform-origin: left bottom;
    transform: scale(1) translate3d(0px, 0px, 0px);
    transition-duration: 1300ms;
    transition-delay: 0ms;

    font-size: 1rem;
    font-weight: 500;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, .45);

    /* background-color: rgba(0, 0, 0, 0.35); */
`;

const Play_Button_Wrapper = styled.div`

    position: absolute;
    left: 5%;
    /* margin-right: 40px; */
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 16px;
    background-color: transparent;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    /* margin: .25em; */
    box-sizing: inherit;    
`;

const Play_Button_Container = styled.button`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    margin: 0;
    overflow: visible;
    text-transform: none;
    box-sizing: inherit;
    -webkit-box-align: center;
    align-items: center;
    appearance: none;
    border: 0px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    opacity: 1;
    /* padding: 0.8rem; */
    position: relative;
    user-select: none;
    will-change: background-color, color;
    word-break: break-word;
    white-space: nowrap;
    background-color: rgba(109, 109, 110, 0.7);
    color: white;
    padding-left: 1rem;
    padding-right: 1.2rem;
    max-height: 42px;
    min-height: 32px;    
    &:hover {
        /* background-color: #e6e6e6 !important;
        border-color: #fff; */
        background-color: rgba(109, 109, 110, 0.4);
    }
`;

const Play_Button_Svg_Wrapper_ = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: black;
    box-sizing: inherit;
    line-height: 0;    

`;

const Play_Button_Svg_ = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: black;
    line-height: 0;
    box-sizing: inherit;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    height: 1.2rem;
    width: 1.2rem;
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font: inherit;
        text-transform: none;
        cursor: pointer;
        user-select: none;
        word-break: break-word;
        white-space: nowrap;
        color: black;
        line-height: 0;
        fill: none;
        box-sizing: inherit;
        overflow: hidden;
        height: 100%;
        width: 100%;
    }
`;

const Play_Button_Gap = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: black;
    box-sizing: border-box;
    display: flex;
    height: 100%;
    position: relative;
    width: 0.5rem;    
`;

const Play_Title_ = styled.span`
    -webkit-text-size-adjust: 100%;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: black;
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    display: block;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 1.4rem;    
`;

const Wish_Button_Wrapper = styled.div`

    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    cursor: auto;
    margin: .25em;
    box-sizing: inherit;
    position: relative; 
    div {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        color: #fff;
        font-size: 16px;
        cursor: auto;
        box-sizing: inherit;
    }   
`;

const Wish_Button_Svg_Wrapper =styled.button`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    margin: 0;
    overflow: visible;
    text-transform: none;
    box-sizing: inherit;
    -webkit-box-align: center;
    align-items: center;
    appearance: none;
    cursor: pointer;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    opacity: 1;
    padding: 0rem;
    position: relative;
    user-select: none;
    will-change: background-color, color;
    word-break: break-word;
    white-space: nowrap;
    border-radius: 50%;
    /* padding-left: 0.8rem; */
    /* padding-right: 0.8rem; */
    border: 1px solid rgba(255, 255, 255, 0.7);
    color: white;
    background-color: rgba(42,42,42,.6);
    border-color: hsla(0,0%,100%,.5);
    border-width: 2px;
    max-height: 42px;
    max-width: 42px;
    min-height: 32px;
    min-width: 32px;
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: #fff;
    }
    div {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font: inherit;
        text-transform: none;
        cursor: pointer;
        user-select: none;
        word-break: break-word;
        white-space: nowrap;
        color: white;
        box-sizing: inherit;
        line-height: 0;
    }    
`;

const Wish_Button_Svg = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: white;
    line-height: 0;
    box-sizing: inherit;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    height: 1.2rem;
    width: 1.2rem;
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font: inherit;
        text-transform: none;
        cursor: pointer;
        user-select: none;
        word-break: break-word;
        white-space: nowrap;
        color: white;
        line-height: 0;
        fill: none;
        box-sizing: inherit;
        overflow: hidden;
        height: 100%;
        width: auto;
    }    
`;

const navVariants = {
    top: {
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
    scroll: {
      backgroundColor: "rgba(0, 0, 0, 1)",
    },
};

const rowVariants = {
    hidden: (back: boolean) => ({
        x: back ? -window.innerWidth + 50 : window.innerWidth - 50,
    }),
    visible: {
        x: 0,
    },
    exit: (back: boolean) => ({
        x: back ? window.innerWidth - 50 : -window.innerWidth + 50,
    }),
};

const boxVariants = {
    normal: {
      scale: 1,
      opacity: 1
    },
    hover: {
        zIndex: 99,
        scale: 1.3,
        y: -80,
        transition: {
            delay: 0.5,
            duaration: 0.1,
            type: "tween",
        },
    },
    exit: {
        scale: 0,
        opacity: 0,
    }
};


const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duaration: 0.1,
            type: "tween",
        }
    },
};

interface IForm {
    keyword: string;
}

const Mini_Modal_Wrapper = styled(motion.div)`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: default;
    user-select: none;
    font-size: 1vw;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    will-change: scroll-position;
    opacity: 0;
`;

const Mini_Modal_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    box-sizing: inherit;
    background-color: transparent;
    border-radius: 6px;
    color: #fff;
    font-size: 16px;
    overflow: hidden;
    position: absolute;
    will-change: transform;
    z-index: 2;
    /* left: -9999px; */
    left: 0;
    opacity: 1;
    /* top: -9999px; */
    top: 0;
    width: 237px;
`;

const Mini_Player_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    background-color: #000;
    position: relative;
    box-sizing: inherit;
    cursor: auto;
`;

const Mini_Image = styled(motion.div)`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    cursor: auto;
    box-sizing: inherit;
    height: 100%;
    padding-top: 56.3925%;
    width: 100%;
    position: static;
    img {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        color: #fff;
        font-size: 16px;
        cursor: auto;
        border: 0;
        box-sizing: inherit;
        background-size: cover;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        opacity: 1;
    }    
`;

const Mini_Info_Wrapper = styled(motion.div)`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    cursor: default;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    color: #fff;
    font-size: 16px;
    box-sizing: inherit;
    background-color: #181818;
    position: relative;
    opacity: 0;
`;

const Mini_Info_Layer = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 16px;
    color: #fff;
    box-sizing: inherit;
    padding: 1em;
    cursor: pointer;
    div {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        background-color: #181818;
        display: grid;
        position: relative;
        width: 100%;
        box-sizing: inherit;
        grid-template-columns: 100%;
    }
`;

const Mini_Control_Container = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    box-sizing: inherit;
`;

const Mini_Play_Wrapper = styled.a`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 16px;
    background-color: transparent;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    margin: .25em;
    box-sizing: inherit;
    button {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font: inherit;
        margin: 0;
        overflow: visible;
        text-transform: none;
        box-sizing: inherit;
        -webkit-box-align: center;
        align-items: center;
        appearance: none;
        border: 0px;
        cursor: pointer;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        opacity: 1;
        padding: 0.8rem;
        position: relative;
        user-select: none;
        will-change: background-color, color;
        word-break: break-word;
        white-space: nowrap;
        border-radius: 50%;
        color: black;
        padding-left: 0.8rem;
        padding-right: 0.8rem;
        background-color: #fff;
        border-width: 2px;
        max-height: 42px;
        max-width: 42px;
        min-height: 32px;
        min-width: 32px;
        div {
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            font: inherit;
            text-transform: none;
            cursor: pointer;
            user-select: none;
            word-break: break-word;
            white-space: nowrap;
            color: black;
            box-sizing: inherit;
            line-height: 0;
        }
    }    
`;

const Mini_Play_Button = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: black;
    line-height: 0;
    box-sizing: inherit;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    height: 1.8rem;
    width: 1.8rem;
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font: inherit;
        text-transform: none;
        cursor: pointer;
        user-select: none;
        word-break: break-word;
        white-space: nowrap;
        color: black;
        line-height: 0;
        fill: none;
        box-sizing: inherit;
        overflow: hidden;
        height: 100%;
        width: auto;
    }
`;

const Mini_Wish_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    margin: .25em;
    box-sizing: inherit;
    position: relative;
    div {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        box-sizing: inherit;
    }    
`;

const Mini_Wish_Button = styled.button`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    margin: 0;
    overflow: visible;
    text-transform: none;
    box-sizing: inherit;
    -webkit-box-align: center;
    align-items: center;
    appearance: none;
    cursor: pointer;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    opacity: 1;
    padding: 0.8rem;
    position: relative;
    user-select: none;
    will-change: background-color, color;
    word-break: break-word;
    white-space: nowrap;
    border-radius: 50%;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    border: 1px solid rgba(255, 255, 255, 0.7);
    color: white;
    background-color: rgba(42,42,42,.6);
    border-color: hsla(0,0%,100%,.5);
    border-width: 2px;
    max-height: 42px;
    max-width: 42px;
    min-height: 32px;
    min-width: 32px;    
    div {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font: inherit;
        text-transform: none;
        cursor: pointer;
        user-select: none;
        word-break: break-word;
        white-space: nowrap;
        color: white;
        box-sizing: inherit;
        line-height: 0;
    }
`;

const Mini_Wish_Svg = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: white;
    line-height: 0;
    box-sizing: inherit;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    height: 1.8rem;
    width: 1.8rem;
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font: inherit;
        text-transform: none;
        cursor: pointer;
        user-select: none;
        word-break: break-word;
        white-space: nowrap;
        color: white;
        line-height: 0;
        fill: none;
        box-sizing: inherit;
        overflow: hidden;
        height: 100%;
        width: auto;
    }    
`;

const Mini_Like_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    margin: .25em;
    box-sizing: inherit;
    position: relative;
    z-index: 1;    
    button {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font: inherit;
        margin: 0;
        overflow: visible;
        text-transform: none;
        box-sizing: inherit;
        -webkit-box-align: center;
        align-items: center;
        appearance: none;
        cursor: pointer;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        opacity: 1;
        padding: 0.8rem;
        position: relative;
        user-select: none;
        will-change: background-color, color;
        word-break: break-word;
        white-space: nowrap;
        border-radius: 50%;
        padding-left: 0.8rem;
        padding-right: 0.8rem;
        border: 1px solid rgba(255, 255, 255, 0.7);
        color: white;
        background-color: rgba(42,42,42,.6);
        border-color: hsla(0,0%,100%,.5);
        border-width: 2px;
        max-height: 42px;
        max-width: 42px;
        min-height: 32px;
        min-width: 32px;
        div {
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            font: inherit;
            text-transform: none;
            cursor: pointer;
            user-select: none;
            word-break: break-word;
            white-space: nowrap;
            color: white;
            box-sizing: inherit;
            line-height: 0;
        }
    }
`;

const Mini_Like_Svg = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: white;
    line-height: 0;
    box-sizing: inherit;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    height: 1.8rem;
    width: 1.8rem;
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font: inherit;
        text-transform: none;
        cursor: pointer;
        user-select: none;
        word-break: break-word;
        white-space: nowrap;
        color: white;
        line-height: 0;
        fill: none;
        box-sizing: inherit;
        overflow: hidden;
        height: 100%;
        width: auto;
    }
`;

const Mini_Detail_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    margin: .25em;
    margin-left: auto;
    box-sizing: inherit;
    position: relative;
    button {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font: inherit;
        margin: 0;
        overflow: visible;
        text-transform: none;
        box-sizing: inherit;
        -webkit-box-align: center;
        align-items: center;
        appearance: none;
        cursor: pointer;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        opacity: 1;
        padding: 0.8rem;
        position: relative;
        user-select: none;
        will-change: background-color, color;
        word-break: break-word;
        white-space: nowrap;
        border-radius: 50%;
        padding-left: 0.8rem;
        padding-right: 0.8rem;
        border: 1px solid rgba(255, 255, 255, 0.7);
        color: white;
        background-color: rgba(42,42,42,.6);
        border-color: hsla(0,0%,100%,.5);
        border-width: 2px;
        max-height: 42px;
        max-width: 42px;
        min-height: 32px;
        min-width: 32px;
        div {
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            font: inherit;
            text-transform: none;
            cursor: pointer;
            user-select: none;
            word-break: break-word;
            white-space: nowrap;
            color: white;
            box-sizing: inherit;
            line-height: 0;
        }
    }    
`;

const Mini_Detail_Svg = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font: inherit;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
    white-space: nowrap;
    color: white;
    line-height: 0;
    box-sizing: inherit;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    height: 1.8rem;
    width: 1.8rem;
    svg {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font: inherit;
        text-transform: none;
        cursor: pointer;
        user-select: none;
        word-break: break-word;
        white-space: nowrap;
        color: white;
        line-height: 0;
        fill: none;
        box-sizing: inherit;
        overflow: hidden;
        height: 100%;
        width: auto;
    }
`;

const Mini_Genre_Wrapper = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    box-sizing: inherit;
    margin-bottom: .5em;
    display: flex;
    flex-wrap: wrap;
    opacity: 0.0334;
`;

const Mini_Genre_Items = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-items: flex-start;
    margin: 0;
    padding: 0;
`;

const Mini_Genre_Item = styled.div`
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    word-break: keep-all;
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
    line-height: 1.4;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    box-sizing: inherit;
    align-items: center;
    display: flex;
    padding-right: .5vw;
    span {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        cursor: pointer;
        color: #fff;
        position: relative;
        text-shadow: 0 1px 1px rgba(0,0,0,.7);
        box-sizing: inherit;
        line-height: 1.4;
        font-size: inherit;
    }
`;


function Hover_Detail() {

    return (
        <Mini_Modal_Wrapper>
            <Mini_Modal_Container>
                {/* 상단 */}
                <Mini_Player_Container>
                    {/* 이미지 */}
                    <Mini_Image>
                        <img src={"https://occ-0-2218-325.1.nflxso.net/dnm/api/v6/Qs0…Ukm6bShuuDZpZs_2Pp5_xB1wVV7wLeI5SIO5M8.webp?r=5b9"}/>
                    </Mini_Image>
                    {/* 제목 */}
                    <p>제목입니다.</p>
                </Mini_Player_Container>
                {/* 내용 */}
                <Mini_Info_Wrapper>
                    <Link to={`movie/moviId`}>
                        <div>
                            <Mini_Info_Layer>
                                <div>
                                    {/* Contorl */}
                                    <Mini_Control_Container>
                                        {/* 재생 */}
                                        <Mini_Play_Wrapper>
                                            <button>
                                                <div>
                                                    <Mini_Play_Button>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="PlayStandard" aria-hidden="true">
                                                            <path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="currentColor">
                                                            </path>
                                                        </svg>
                                                    </Mini_Play_Button>
                                                </div>
                                            </button>
                                        </Mini_Play_Wrapper>
                                        {/* 관심있는 작품 */}
                                        <Mini_Wish_Wrapper>
                                            <div>
                                                <Mini_Wish_Button>
                                                    <div>
                                                        <Mini_Wish_Svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="PlusStandard" aria-hidden="true">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor">
                                                                </path>
                                                            </svg>
                                                        </Mini_Wish_Svg>
                                                    </div>
                                                </Mini_Wish_Button>
                                            </div>
                                        </Mini_Wish_Wrapper>
                                        {/* 좋아요 작품 */}
                                        <Mini_Like_Wrapper>
                                            <button>
                                                <div>
                                                    <Mini_Like_Svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="ThumbsUpStandard" aria-hidden="true">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.696 8.7732C10.8947 8.45534 11 8.08804 11 7.7132V4H11.8377C12.7152 4 13.4285 4.55292 13.6073 5.31126C13.8233 6.22758 14 7.22716 14 8C14 8.58478 13.8976 9.1919 13.7536 9.75039L13.4315 11H14.7219H17.5C18.3284 11 19 11.6716 19 12.5C19 12.5929 18.9917 12.6831 18.976 12.7699L18.8955 13.2149L19.1764 13.5692C19.3794 13.8252 19.5 14.1471 19.5 14.5C19.5 14.8529 19.3794 15.1748 19.1764 15.4308L18.8955 15.7851L18.976 16.2301C18.9917 16.317 19 16.4071 19 16.5C19 16.9901 18.766 17.4253 18.3994 17.7006L18 18.0006L18 18.5001C17.9999 19.3285 17.3284 20 16.5 20H14H13H12.6228C11.6554 20 10.6944 19.844 9.77673 19.5382L8.28366 19.0405C7.22457 18.6874 6.11617 18.5051 5 18.5001V13.7543L7.03558 13.1727C7.74927 12.9688 8.36203 12.5076 8.75542 11.8781L10.696 8.7732ZM10.5 2C9.67157 2 9 2.67157 9 3.5V7.7132L7.05942 10.8181C6.92829 11.0279 6.72404 11.1817 6.48614 11.2497L4.45056 11.8313C3.59195 12.0766 3 12.8613 3 13.7543V18.5468C3 19.6255 3.87447 20.5 4.95319 20.5C5.87021 20.5 6.78124 20.6478 7.65121 20.9378L9.14427 21.4355C10.2659 21.8094 11.4405 22 12.6228 22H13H14H16.5C18.2692 22 19.7319 20.6873 19.967 18.9827C20.6039 18.3496 21 17.4709 21 16.5C21 16.4369 20.9983 16.3742 20.995 16.3118C21.3153 15.783 21.5 15.1622 21.5 14.5C21.5 13.8378 21.3153 13.217 20.995 12.6883C20.9983 12.6258 21 12.5631 21 12.5C21 10.567 19.433 9 17.5 9H15.9338C15.9752 8.6755 16 8.33974 16 8C16 6.98865 15.7788 5.80611 15.5539 4.85235C15.1401 3.09702 13.5428 2 11.8377 2H10.5Z" fill="currentColor">
                                                            </path>
                                                        </svg>
                                                    </Mini_Like_Svg>
                                                </div>
                                            </button>
                                        </Mini_Like_Wrapper>
                                        {/* 상세 페이지로 가기 */}
                                        <Mini_Detail_Wrapper>
                                            <button>
                                                <div>
                                                    <Mini_Detail_Svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="ChevronDownStandard" aria-hidden="true">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 15.5859L19.2928 8.29297L20.7071 9.70718L12.7071 17.7072C12.5195 17.8947 12.2652 18.0001 12 18.0001C11.7347 18.0001 11.4804 17.8947 11.2928 17.7072L3.29285 9.70718L4.70706 8.29297L12 15.5859Z" fill="currentColor">
                                                            </path>
                                                        </svg>
                                                    </Mini_Detail_Svg>
                                                </div>
                                            </button>
                                        </Mini_Detail_Wrapper>
                                    </Mini_Control_Container>
                                    {/* 장르 */}
                                    <Mini_Genre_Wrapper>
                                        <div>
                                            <Mini_Genre_Items>
                                                <Mini_Genre_Item>
                                                    <span>감명을 주는</span>
                                                </Mini_Genre_Item>
                                                <Mini_Genre_Item>
                                                    <span>감명을 주는</span>
                                                </Mini_Genre_Item>
                                                <Mini_Genre_Item>
                                                    <span>감명을 주는</span>
                                                </Mini_Genre_Item>
                                            </Mini_Genre_Items>
                                        </div>
                                    </Mini_Genre_Wrapper>
                                </div>
                            </Mini_Info_Layer>
                        </div>
                    </Link>
                </Mini_Info_Wrapper>
            </Mini_Modal_Container>
        </Mini_Modal_Wrapper>
    );
}

function Test() {

    const homeMatch = useRouteMatch("/home");
    const seriesMatch = useRouteMatch("/home/series");
    const moviesMatch = useRouteMatch("/home/movies");
    const latestMatch = useRouteMatch("/home/latest");

    
    // 상단 검색 Input 열림 
    const [searchOpen, setSearchOpen] = useState(false);

    const inputAnimation = useAnimation();
    const navAnimation = useAnimation();

    const { scrollY } = useScroll();

    const handleSearch = () => {
        if(searchOpen){
            // trigger the close animation
            inputAnimation.start({
                scaleX: 0,
            })
        }else{
            // trigger the open animation
            inputAnimation.start({
                scaleX: 1,
            })
        }

        setSearchOpen((prev) => !prev);
    };

    useMotionValueEvent(scrollY, "change", (value) => {
        if(value > 80){
            navAnimation.start("scroll");
        }else{
            navAnimation.start("top");
        }
    });

    const history = useHistory();
    const { register, handleSubmit } = useForm<IForm>();
    const onValid = (data:IForm) => {
      history.push(`/search?keyword=${data.keyword}`);
    }

    // account dropdown
    const [isOpenDrop, setIsOpenDrop] = useState(false);
    const handleDropDown = () => {
        setIsOpenDrop(!isOpenDrop);
    }


    // main view : now playing 데이터 가져오기
    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["movies", "nowPlaying"], 
        getMovies
    );

    // top rated 데이터 가져오기
    const { data : top , isLoading : topLoading } = useQuery<IGetMoviesResult>(
        ["movies", "top"], 
        getMoviesTop
    );

    // popular 데이터 가져오기
    const { data : popular , isLoading : popularLoading } = useQuery<IGetMoviesResult>(
        ["movies", "popular"], 
        getMoviesPopular
    );

    if(popular){
        popular.results.forEach((item, idx) => {
            item.idx = idx;
        })
    }


    // 영화 상세정보 모달 버튼 이벤트 
    const [movieInfo, setMovieInfo] = useState({movieId: data?.results[0].id, movieTitle: data?.results[0].title}); 

    const [isOpenMainDetail, setIsOpenMainDetail] = useState(false);
    const handleDetailInfo = (movieId?:number, movieTitle?:string) => {
        console.log("hihihihihi");
        if(movieId !== undefined && movieTitle !== undefined){
            setMovieInfo({
                movieId: movieId,
                movieTitle: movieTitle
            });
            setIsOpenMainDetail(!isOpenMainDetail);
            history.push(`/movies/${movieId}`);
        }
    }

     // 로그인 관리 
     const [login, setLogin] = useRecoilState(loginState);
     const [user, setUser] = useRecoilState<IUser | null>(userState);
     useEffect(() => {
        if(user === null){
            setUser((items) => ({
                email: login.email,
                muted: false,
                favoriteVideos: [],
                votedVideos: []
            }))
        }
     }, []);


    // slide 이벤트 관리
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const [isBack, setIsBack] = useState(false);

    const offset = 6;
    
    const increaseIndex = () => {
        if(data){
            // 원래 Row가 사라지기 전에 새로운 Row도 사라지는 것을 방지
            if(leaving) return;
            handleLeaving();
            setIsBack(false);
            
            // banner에서 이미 하나 사용하고 있으므로 -1을 해줘야 한다.
            const totalMovies = data.results.length - 1;
            // page가 0부터 시작하므로 -1을 해줘야 한다.
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1))
            
        }
    };
    
    const decreaseIndex = () => {
        if (data) {
            if (leaving) return;
            handleLeaving();
            setIsBack(true);
            
            const totalMovies = data.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            
            setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
            
        }
    };
    
    const [indexTop, setIndexTop] = useState(0);
    const [leavingTop, setLeavingTop] = useState(false);
    const [isBackTop, setIsBackTop] = useState(false);
    
    const offsetTop = 5;

    const increaseIndexTop = () => {
        if(popular){
            // 원래 Row가 사라지기 전에 새로운 Row도 사라지는 것을 방지
            if(leavingTop) return;
            handleLeavingTop();
            setIsBackTop(false);

            // popular.results = popular.results.slice(0,10);
            
            // banner에서 이미 하나 사용하고 있으므로 -1을 해줘야 한다.
            const totalMovies = 10;
            // page가 0부터 시작하므로 -1을 해줘야 한다.
            const maxIndex = Math.floor(totalMovies / offsetTop) - 1;
            
            setIndexTop((prev) => (prev === maxIndex ? 0 : prev + 1))

        }
    };

    const decreaseIndexTop = () => {
        if (popular) {
          if (leavingTop) return;
          handleLeavingTop();
          setIsBackTop(true);
            
        //   popular.results = popular.results.slice(0,10);

          const totalMovies = 10;
          const maxIndex = Math.floor(totalMovies / offsetTop) - 1;
          setIndexTop((prev) => (prev === 0 ? maxIndex : prev - 1));

        }
    };

    

    const handleLeaving = () => setLeaving((prev) => !prev);
    const handleLeavingTop = () => setLeavingTop((prev) => !prev);


    // 미니 모달 관리하기
    // video 데이터 가져오기

    // 관심있는 영화/TV 추가 이벤트
    const favList = user?.favoriteVideos;
    const [addFav, setAddFav] = useRecoilState(addFavoriteVideo);
    const [delFav, setDelFav] = useRecoilState(removeFavoriteVideo);
    const handleFavVideo = (movieId?: number) => {
        console.log("favorite");
        if (movieId !== undefined && movieId !== null){
            if(favList?.includes(movieId)){
                setDelFav(movieId);
            }else{
                setAddFav(movieId);
            }
        }
    }

    // 좋아요 투표한 영화/TV 추가 이벤트
    const votedList = user?.votedVideos;
    const [addVoted, setAddVoted] = useRecoilState(addVotedVideos);
    const [delVoted, setDelVoted] = useRecoilState(removeVotedVideos);
    const handleVotedVideo = (movieId?: number) => {
        if (movieId !== undefined && movieId !== null){
            if(votedList?.includes(movieId)){
                setDelVoted(movieId);
            }else{
                setAddVoted(movieId);
            }
        }
    }

    return (
        <Body_Container $isOpen={isOpenMainDetail}>
            {/* Header */}
            <Header_Wrapper
                variants={navVariants}
                animate={navAnimation} 
                initial={"top"}
            >
                <Header_Container>
                    <Banner></Banner>
                    <Home_Header_Container>
                        {/* Logo */}
                        <Home_Logo>
                            <_Logo 
                                xmlns="http://www.w3.org/2000/svg"
                                width="1024"
                                height="276.742"
                                viewBox="0 0 111 30">
                                <motion.path 
                                d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"
                                />
                            </_Logo>
                        </Home_Logo>
                        {/* Navigation */}
                        <Nav_Items_Container>
                            {/* <Nav_Tab_Wrapper>
                                <a href="/home">메뉴</a>
                            </Nav_Tab_Wrapper> */}
                            <Nav_Item_Wrapper>
                                <Link to="/home">
                                    홈 {homeMatch?.isExact}
                                </Link>
                            </Nav_Item_Wrapper>
                            <Nav_Item_Wrapper>
                                <Link to="/home/series">
                                    시리즈 {seriesMatch?.isExact}
                                </Link>
                            </Nav_Item_Wrapper>
                            <Nav_Item_Wrapper>
                                <Link to="/home/movies">
                                    영화 {moviesMatch?.isExact}
                                </Link>
                            </Nav_Item_Wrapper>
                            <Nav_Item_Wrapper>
                                <Link to="/home/latest">
                                    NEW! 요즘 대세 콘텐츠 {latestMatch?.isExact}
                                </Link>
                            </Nav_Item_Wrapper>
                        </Nav_Items_Container>
                        {/* Sub Navigation */}
                        <Nav_Items_Container2>
                            {/* Search */}
                            <Nav_Item_Wrapper2>
                                <Search_Wrapper>
                                    {/* input 열리기전 */}
                                    <Search_Button
                                        $isOpen={searchOpen}
                                        onClick={handleSearch}
                                        // animate={{ x: searchOpen ? -185 : 0}}
                                        transition={{ type:"linear" }}
                                    >
                                        <motion.svg 
                                            xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="MagnifyingGlassStandard" aria-hidden="true">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z" fill="currentColor">
                                            </path>
                                        </motion.svg>
                                    </Search_Button>
                                    {/* input 열린후 */}
                                    <Search_Input_Container
                                        $isOpen={searchOpen}
                                        animate={inputAnimation}
                                        initial={{ scaleX: 0 }}
                                        transition={{ type:"linear" }}
                                    >
                                        <motion.svg 
                                            onClick={handleSearch}
                                            transition={{ type:"linear" }}
                                            xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="MagnifyingGlassStandard" aria-hidden="true">
                                            <motion.path fillRule="evenodd" clipRule="evenodd" d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z" fill="currentColor">
                                            </motion.path>
                                        </motion.svg>
                                        <Search_Label htmlFor="searchInput" />
                                        <Search_Input 
                                            {...register(
                                                "keyword",
                                                { required: true, minLength: 1 }
                                            )}
                                            id="searchInput" placeholder="제목, 사람, 장르" />
                                        <Search_Close_Button>
                                            <motion.svg xmlns="http://www.w3.org/2000/svg" fill="none" width="36" height="36" viewBox="0 0 36 36" role="img" data-icon="PlusLarge" aria-hidden="true">
                                                <motion.path fillRule="evenodd" clipRule="evenodd" d="M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z" fill="currentColor">
                                                </motion.path>
                                            </motion.svg>
                                        </Search_Close_Button>
                                    </Search_Input_Container>
                                </Search_Wrapper>
                            </Nav_Item_Wrapper2>
                            {/* Notice */}
                            <Nav_Item_Wrapper2>
                                <Notice_Wrapper>
                                    <Notice_Button>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="BellStandard" aria-hidden="true">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.0002 4.07092C16.3924 4.55624 19 7.4736 19 11V15.2538C20.0489 15.3307 21.0851 15.4245 22.1072 15.5347L21.8928 17.5232C18.7222 17.1813 15.4092 17 12 17C8.59081 17 5.27788 17.1813 2.10723 17.5232L1.89282 15.5347C2.91498 15.4245 3.95119 15.3307 5.00003 15.2538V11C5.00003 7.47345 7.60784 4.55599 11.0002 4.07086V2H13.0002V4.07092ZM17 15.1287V11C17 8.23858 14.7614 6 12 6C9.2386 6 7.00003 8.23858 7.00003 11V15.1287C8.64066 15.0437 10.3091 15 12 15C13.691 15 15.3594 15.0437 17 15.1287ZM8.62593 19.3712C8.66235 20.5173 10.1512 22 11.9996 22C13.848 22 15.3368 20.5173 15.3732 19.3712C15.3803 19.1489 15.1758 19 14.9533 19H9.0458C8.82333 19 8.61886 19.1489 8.62593 19.3712Z" fill="currentColor">
                                            </path>
                                        </svg>
                                    </Notice_Button>
                                </Notice_Wrapper>
                            </Nav_Item_Wrapper2>
                            {/* Account */}
                            <Nav_Item_Wrapper2 onClick={handleDropDown}> 
                                <Account_Wrapper>
                                    <Account_DropDown_Wrapper>
                                        <Account_Button_Wrapper>
                                            <Account_Button>
                                                <img src="https://occ-0-3098-993.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABeWnT5_rTSlUpkNatPpA4X3lve97EV_XI1iiDbvKXbbd0OWJKM2SHClmtQB5o-VcefoMJ4C-tU2ZTx_TZfT3o-q-51gRGBI.png?r=a58" alt="" />
                                            </Account_Button>
                                        </Account_Button_Wrapper>
                                        <Account_Caret $isOpen={isOpenDrop} />
                                    </Account_DropDown_Wrapper>
                                    {/* menu */}
                                    <Menu_Wrapper $isOpen={isOpenDrop}>
                                        <Menu_Container>
                                            <Menu_Block />
                                            {/* About Account */}
                                            <Account_Menu_Container>
                                                {/* 프로필관리 */}
                                                <Menu_Item_Wrapper>
                                                    <Menu_Item>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="PencilStandard" aria-hidden="true">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M19.1213 1.7071C17.9497 0.535532 16.0503 0.53553 14.8787 1.7071L13.2929 3.29289L12.5858 4L1.58579 15C1.21071 15.3751 1 15.8838 1 16.4142V21C1 22.1046 1.89543 23 3 23H7.58579C8.11622 23 8.62493 22.7893 9 22.4142L20 11.4142L20.7071 10.7071L22.2929 9.12132C23.4645 7.94975 23.4645 6.05025 22.2929 4.87868L19.1213 1.7071ZM15.5858 7L14 5.41421L3 16.4142L3 19C3.26264 19 3.52272 19.0517 3.76537 19.1522C4.00802 19.2527 4.2285 19.4001 4.41421 19.5858C4.59993 19.7715 4.74725 19.992 4.84776 20.2346C4.94827 20.4773 5 20.7374 5 21L7.58579 21L18.5858 10L17 8.41421L6.70711 18.7071L5.29289 17.2929L15.5858 7ZM16.2929 3.12132C16.6834 2.73079 17.3166 2.73079 17.7071 3.12132L20.8787 6.29289C21.2692 6.68341 21.2692 7.31658 20.8787 7.7071L20 8.58578L15.4142 4L16.2929 3.12132Z" fill="currentColor">
                                                            </path>
                                                        </svg>
                                                        <Menu_Item_Title>프로필 관리</Menu_Item_Title>
                                                    </Menu_Item>
                                                </Menu_Item_Wrapper>
                                                {/* 계정 */}
                                                <Menu_Item_Wrapper>
                                                    <Menu_Item>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="UserStandard" aria-hidden="true">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5ZM17 5C17 7.76142 14.7614 10 12 10C9.23858 10 7 7.76142 7 5C7 2.23858 9.23858 0 12 0C14.7614 0 17 2.23858 17 5ZM4 21C4 16.5817 7.58172 13 12 13C16.4183 13 20 16.5817 20 21V21.5136C19.5678 21.5667 18.9844 21.6327 18.2814 21.6988C16.6787 21.8495 14.461 22 12 22C9.53901 22 7.32131 21.8495 5.71861 21.6988C5.01564 21.6327 4.43224 21.5667 4 21.5136V21ZM21.1508 23.3775C21.1509 23.3774 21.151 23.3774 21 22.3889L21.151 23.3774C21.6393 23.3028 22 22.8829 22 22.3889V21C22 15.4772 17.5228 11 12 11C6.47715 11 2 15.4772 2 21V22.3889C2 22.8829 2.36067 23.3028 2.84897 23.3774L3 22.3889C2.84897 23.3774 2.84908 23.3774 2.8492 23.3775L2.84952 23.3775L2.85043 23.3776L2.85334 23.3781L2.86352 23.3796L2.90103 23.3852C2.93357 23.3899 2.98105 23.3968 3.04275 23.4055C3.16613 23.4228 3.3464 23.4472 3.57769 23.4765C4.04018 23.535 4.7071 23.6126 5.5314 23.6901C7.1787 23.8449 9.461 24 12 24C14.539 24 16.8213 23.8449 18.4686 23.6901C19.2929 23.6126 19.9598 23.535 20.4223 23.4765C20.6536 23.4472 20.8339 23.4228 20.9573 23.4055C21.0189 23.3968 21.0664 23.3899 21.099 23.3852L21.1365 23.3796L21.1467 23.3781L21.1496 23.3776L21.1505 23.3775L21.1508 23.3775Z" fill="currentColor">
                                                            </path>
                                                        </svg>
                                                        <Menu_Item_Title>계정</Menu_Item_Title>
                                                    </Menu_Item>
                                                </Menu_Item_Wrapper>
                                                {/* 고객 센터 */}
                                                <Menu_Item_Wrapper>
                                                    <Menu_Item>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="CircleQuestionMarkStandard" aria-hidden="true">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM12 8C10.6831 8 10 8.74303 10 9.5H8C8 7.25697 10.0032 6 12 6C13.9968 6 16 7.25697 16 9.5C16 10.8487 14.9191 11.7679 13.8217 12.18C13.5572 12.2793 13.3322 12.4295 13.1858 12.5913C13.0452 12.7467 13 12.883 13 13V14H11V13C11 11.5649 12.1677 10.6647 13.1186 10.3076C13.8476 10.0339 14 9.64823 14 9.5C14 8.74303 13.3169 8 12 8ZM13.5 16.5C13.5 17.3284 12.8284 18 12 18C11.1716 18 10.5 17.3284 10.5 16.5C10.5 15.6716 11.1716 15 12 15C12.8284 15 13.5 15.6716 13.5 16.5Z" fill="currentColor">
                                                            </path>
                                                        </svg>
                                                        <Menu_Item_Title>고객 센터</Menu_Item_Title>
                                                    </Menu_Item>
                                                </Menu_Item_Wrapper>
                                            </Account_Menu_Container>
                                            {/* Logout */}
                                            <Logout_Container>
                                                <Menu_Item_Wrapper>
                                                    <Menu_Item>
                                                        넷플릭스에서 로그아웃
                                                    </Menu_Item>
                                                </Menu_Item_Wrapper>
                                            </Logout_Container>
                                        </Menu_Container>
                                    </Menu_Wrapper>
                                </Account_Wrapper>
                            </Nav_Item_Wrapper2>
                        </Nav_Items_Container2>
                    </Home_Header_Container>
                </Header_Container>
            </Header_Wrapper>
            {/* MainView */}
            <MainView_Wrapper>
                <MainView_Container>
                    {/* main content */}
                    <Main_Wrapper>
                        <Main_Content_Wrapper>
                            <Main_Content_Container>
                                <Main_Cotent_Img_Wrapper>
                                    <img src={makeImagePath(data?.results[0].backdrop_path || "")} />
                                </Main_Cotent_Img_Wrapper>
                                <Main_Info_Wrapper>
                                    <Main_Info_Layer>
                                        <Main_Info_Container>
                                            {/* Title */}
                                            <Main_Title_Wrapper>
                                                <Main_Title>
                                                    {data?.results[0].title}
                                                </Main_Title>
                                            </Main_Title_Wrapper>
                                            {/* Info : Detail */}
                                            <Main_Detail_Wrapper>
                                                <Main_Detail>
                                                    {data?.results[0].overview}
                                                </Main_Detail>
                                            </Main_Detail_Wrapper>
                                            <Main_Button_Container>
                                                {/* 재생 */}
                                                <Main_Button_Wrapper>
                                                    <Main_Play_Button_Container>
                                                        <Play_Button_Svg_Wrapper>
                                                            <Play_Button_Svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="PlayStandard" aria-hidden="true">
                                                                    <path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="currentColor">
                                                                    </path>
                                                                </svg>
                                                            </Play_Button_Svg> 
                                                        </Play_Button_Svg_Wrapper>
                                                        <Play_Gap />
                                                        <Play_Title>재생</Play_Title>
                                                    </Main_Play_Button_Container>
                                                </Main_Button_Wrapper>
                                                {/* 상세 정보 */}
                                                <Detail_Button_Wrapper onClick={() => handleDetailInfo(data?.results[0].id, data?.results[0].title)}>
                                                    <Detail_Button_Svg_Wrapper>
                                                        <Detail_Button_Svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="CircleIStandard" aria-hidden="true">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor">
                                                                </path>
                                                            </svg>
                                                        </Detail_Button_Svg> 
                                                    </Detail_Button_Svg_Wrapper>
                                                    <Detail_Gap />
                                                    <Detail_Title>상세 정보</Detail_Title>
                                                </Detail_Button_Wrapper>
                                            </Main_Button_Container>
                                        </Main_Info_Container>
                                    </Main_Info_Layer>            
                                </Main_Info_Wrapper>
                            </Main_Content_Container>
                        </Main_Content_Wrapper>                       
                    </Main_Wrapper>    
                    {/* slider content : now playing */}
                    <Slide_Container>
                        {/* title */}
                        <Slide_Title_Wrapper>
                            <Link to="#">
                                {/* title */}
                                <Slide_Title>
                                    지금 상영중인 영화
                                </Slide_Title>          
                                  {/* more */}  
                                <Slide_More_Container>
                                    <Slide_More_Title>모두 보기</Slide_More_Title>
                                </Slide_More_Container>
                            </Link>
                        </Slide_Title_Wrapper>
                        {/* content */}
                        <Slide_Content_Wrapper>
                            <div>
                                <Slide_Layer_Wrapper>
                                    <Slide_Content_Container>
                                        {/* 콘텐츠 더보기 */}
                                        <Slider_Next_Wrapper 
                                            onClick={decreaseIndex}
                                            style={{left:0}}
                                        >
                                            <Sldier_Next_Img>
                                                <svg fill="white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowBackIosIcon">
                                                    <path d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z">
                                                    </path>
                                                </svg>
                                            </Sldier_Next_Img>
                                        </Slider_Next_Wrapper>
                                        {/* pagination */}
                                        {/* <Pagination_Container>
                                            <Pagination $isActive={true}></Pagination>
                                            <Pagination $isActive={false}></Pagination>
                                            <Pagination $isActive={false}></Pagination>
                                            <Pagination $isActive={false}></Pagination>
                                        </Pagination_Container> */}
                                        {/* slider */}
                                        <Slider_Wrapper>
                                            <AnimatePresence
                                                initial={false}
                                                onExitComplete={handleLeaving}
                                                // mode="wait"
                                                custom={isBack}
                                                >
                                                <Slider_Container
                                                    custom={isBack}
                                                    variants={rowVariants} 
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    transition={{ type: "tween", duration: 0.7 }}
                                                    key={index}
                                                >
                                                    {/* slider item */}
                                                    {
                                                        data?.results
                                                        .slice(1)
                                                        .slice(offset*index, offset*index + offset)
                                                        .map((movie) => (
                                                            
                                                            <Slider_Item_Wrapper
                                                                layoutId={movie.id + ""}
                                                                key={movie.id} 
                                                                whileHover="hover"
                                                                initial="normal"
                                                                variants={boxVariants}
                                                                // onHoverStart={() => {}}
                                                                // onHoverEnd={() => handleClose(movie.id)}
                                                                transition={{ type: "tween" }}
                                                            >
                                                                {/* <div> */}
                                                                    <Slider_Item_Container>
                                                                        {/* <div> */}
                                                                            <Slider_Item>
                                                                                <Slider_Img_Container onClick={() => handleDetailInfo(movie.id, movie.title)}>
                                                                                    {/* img */}
                                                                                    <img 
                                                                                        decoding="async"
                                                                                        src={makeImagePath(movie.backdrop_path || movie.poster_path, "w500")} alt="" />
                                                                                    {/* title */}
                                                                                    <Content_Play_Wrapper variants={infoVariants}>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="PlayStandard" aria-hidden="true">
                                                                                            <path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="currentColor">
                                                                                            </path>
                                                                                        </svg>
                                                                                    </Content_Play_Wrapper>
                                                                                    <Slider_Img_Title>
                                                                                        <p>{movie.title}</p>
                                                                                    </Slider_Img_Title>
                                                                                </Slider_Img_Container>   
                                                                                {/* <Main_Title_Wrapper_ variants={infoVariants}>
                                                                                    <Main_Title_>
                                                                                        {movie.title}
                                                                                    </Main_Title_>
                                                                                </Main_Title_Wrapper_> */}
                                                                                <Control_Button_Container variants={infoVariants}>
                                                                                    {/* 재생 */}
                                                                                    <Play_Button_Wrapper>
                                                                                        <Play_Button_Container>
                                                                                            <Play_Button_Svg_Wrapper>
                                                                                                <Play_Button_Svg>
                                                                                                    <svg 
                                                                                                        style={{color: "white"}}
                                                                                                        xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="CircleIStandard" aria-hidden="true">
                                                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor">
                                                                                                        </path>
                                                                                                    </svg>
                                                                                                </Play_Button_Svg>
                                                                                            </Play_Button_Svg_Wrapper>
                                                                                            <Play_Button_Gap />
                                                                                            <Play_Title 
                                                                                                onClick={() => handleDetailInfo(movie.id, movie.title)}
                                                                                                style={{color: "white"}}>상세 정보</Play_Title>
                                                                                        </Play_Button_Container>
                                                                                    </Play_Button_Wrapper>

                                                                                    {/* 관심 */}
                                                                                    <Wish_Button_Wrapper 
                                                                                        style={{
                                                                                            position: "absolute",
                                                                                            right: "20%",
                                                                                        }}
                                                                                        onClick={() => handleFavVideo(movie?.id)} key={"wish"} >
                                                                                        <Wish_Button_Svg_Wrapper>
                                                                                            <Wish_Button_Svg>
                                                                                                {/* not wish */}
                                                                                                <svg 
                                                                                                    style={{display: movie?.id !== undefined ? favList?.includes(movie?.id) ? "none" : "" : ""}}
                                                                                                    xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="PlusStandard" aria-hidden="true">
                                                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor">
                                                                                                    </path>
                                                                                                </svg>
                                                                                                {/* wish */}
                                                                                                <svg 
                                                                                                    style={{display: movie?.id !== undefined ? favList?.includes(movie?.id) ? "" : "none" : ""}}
                                                                                                    xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="CheckmarkStandard" aria-hidden="true">
                                                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor">
                                                                                                    </path>
                                                                                                </svg>
                                                                                            </Wish_Button_Svg>
                                                                                        </Wish_Button_Svg_Wrapper>
                                                                                    </Wish_Button_Wrapper>
                                                                                    {/* 좋아요 */}
                                                                                    <Wish_Button_Wrapper 
                                                                                        style={{
                                                                                            position: "absolute",
                                                                                            right: "2%",
                                                                                        }}
                                                                                        onClick={() => handleVotedVideo(movie?.id)}  key={"like"}>
                                                                                        <Wish_Button_Svg_Wrapper>
                                                                                            <Wish_Button_Svg>
                                                                                                {/* not like */}
                                                                                                <svg 
                                                                                                    style={{display: movie?.id !== undefined ? votedList?.includes(movie?.id) ? "none" : "" : ""}}
                                                                                                    xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="ThumbsUpStandard" aria-hidden="true">
                                                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.696 8.7732C10.8947 8.45534 11 8.08804 11 7.7132V4H11.8377C12.7152 4 13.4285 4.55292 13.6073 5.31126C13.8233 6.22758 14 7.22716 14 8C14 8.58478 13.8976 9.1919 13.7536 9.75039L13.4315 11H14.7219H17.5C18.3284 11 19 11.6716 19 12.5C19 12.5929 18.9917 12.6831 18.976 12.7699L18.8955 13.2149L19.1764 13.5692C19.3794 13.8252 19.5 14.1471 19.5 14.5C19.5 14.8529 19.3794 15.1748 19.1764 15.4308L18.8955 15.7851L18.976 16.2301C18.9917 16.317 19 16.4071 19 16.5C19 16.9901 18.766 17.4253 18.3994 17.7006L18 18.0006L18 18.5001C17.9999 19.3285 17.3284 20 16.5 20H14H13H12.6228C11.6554 20 10.6944 19.844 9.77673 19.5382L8.28366 19.0405C7.22457 18.6874 6.11617 18.5051 5 18.5001V13.7543L7.03558 13.1727C7.74927 12.9688 8.36203 12.5076 8.75542 11.8781L10.696 8.7732ZM10.5 2C9.67157 2 9 2.67157 9 3.5V7.7132L7.05942 10.8181C6.92829 11.0279 6.72404 11.1817 6.48614 11.2497L4.45056 11.8313C3.59195 12.0766 3 12.8613 3 13.7543V18.5468C3 19.6255 3.87447 20.5 4.95319 20.5C5.87021 20.5 6.78124 20.6478 7.65121 20.9378L9.14427 21.4355C10.2659 21.8094 11.4405 22 12.6228 22H13H14H16.5C18.2692 22 19.7319 20.6873 19.967 18.9827C20.6039 18.3496 21 17.4709 21 16.5C21 16.4369 20.9983 16.3742 20.995 16.3118C21.3153 15.783 21.5 15.1622 21.5 14.5C21.5 13.8378 21.3153 13.217 20.995 12.6883C20.9983 12.6258 21 12.5631 21 12.5C21 10.567 19.433 9 17.5 9H15.9338C15.9752 8.6755 16 8.33974 16 8C16 6.98865 15.7788 5.80611 15.5539 4.85235C15.1401 3.09702 13.5428 2 11.8377 2H10.5Z" fill="currentColor">
                                                                                                    </path>
                                                                                                </svg>
                                                                                                {/* like */}
                                                                                                <svg 
                                                                                                    style={{display: movie?.id !== undefined ? votedList?.includes(movie?.id) ? "" : "none" : ""}}
                                                                                                    xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="ThumbsUpFillStandard" aria-hidden="true">
                                                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.407 6.25579L13.313 5.50407C13.1342 4.07353 11.9181 3 10.4764 3C10.2133 3 10 3.21331 10 3.47644V6.7132C10 6.90062 9.94733 7.08427 9.848 7.2432L7.90742 10.3481C7.64516 10.7677 7.23665 11.0752 6.76086 11.2112L4.72528 11.7928C4.29598 11.9154 4 12.3078 4 12.7543V18.3161C4 18.6938 4.30618 19 4.68387 19C5.874 19 7.04352 19.3106 8.07684 19.9011L8.25 20C9.39679 20.6553 10.6947 21 12.0156 21H13H16H16.5C17.3284 21 18 20.3284 18 19.5C18 19.1158 17.8556 18.7654 17.6181 18.5H18C18.8284 18.5 19.5 17.8284 19.5 17C19.5 16.4601 19.2147 15.9868 18.7867 15.7226C19.478 15.5888 20 14.9804 20 14.25C20 13.4216 19.3284 12.75 18.5 12.75H18.3294C18.7336 12.4813 19 12.0217 19 11.5C19 10.6716 18.3284 10 17.5 10H13.125L13.407 7.74421C13.4688 7.24999 13.4688 6.75001 13.407 6.25579Z" fill="currentColor">
                                                                                                    </path>
                                                                                                </svg>
                                                                                            </Wish_Button_Svg>
                                                                                        </Wish_Button_Svg_Wrapper>
                                                                                    </Wish_Button_Wrapper>

                                                                                </Control_Button_Container>
                                                                            </Slider_Item>

                                                                        {/* </div> */}
                                                                        {/* <div></div> */}
                                                                    </Slider_Item_Container>
                                                                {/* </div> */}

                                                            </Slider_Item_Wrapper>
                                                            
                                                        ))
                                                    }

                                                </Slider_Container>
                                            </AnimatePresence>
                                        </Slider_Wrapper>
                                        {/* 콘텐츠 더보기 */}
                                        <Slider_Next_Wrapper 
                                            onClick={increaseIndex}
                                            style={{right:0}}
                                        >
                                            <Sldier_Next_Img style={{transform: "rotate(-180deg)"}} >
                                                <svg fill="white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowBackIosIcon">
                                                    <path d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z">
                                                    </path>
                                                </svg>
                                            </Sldier_Next_Img>
                                        </Slider_Next_Wrapper>
                                    </Slide_Content_Container>
                                </Slide_Layer_Wrapper>
                            </div>
                        </Slide_Content_Wrapper>
                    </Slide_Container>
                    {/* slider content : popular */}
                    <Slide_Container>
                        {/* title */}
                        <Slide_Title_Wrapper>
                            <Link to="#">
                                {/* title */}
                                <Slide_Title>
                                    요즘 Top 10 영화 
                                </Slide_Title>          
                                  {/* more */}  
                                <Slide_More_Container>
                                    <Slide_More_Title>모두 보기</Slide_More_Title>
                                </Slide_More_Container>
                            </Link>
                        </Slide_Title_Wrapper>
                        {/* content */}
                        <Slide_Content_Wrapper>
                            <div>
                                <Slide_Layer_Wrapper>
                                    <Slide_Content_Container>
                                        {/* 콘텐츠 더보기 */}
                                        <Slider_Next_Wrapper 
                                            onClick={decreaseIndexTop}
                                            style={{left:0}}
                                        >
                                            <Sldier_Next_Img>
                                                <svg fill="white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowBackIosIcon">
                                                    <path d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z">
                                                    </path>
                                                </svg>
                                            </Sldier_Next_Img>
                                        </Slider_Next_Wrapper>
                                        {/* slider */}
                                        <Slider_Wrapper>
                                            <AnimatePresence
                                                initial={false}
                                                onExitComplete={handleLeavingTop}
                                                // mode="wait"
                                                custom={isBackTop}
                                                >
                                                <Slider_Container
                                                    custom={isBackTop}
                                                    variants={rowVariants} 
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    transition={{ type: "tween", duration: 0.7 }}
                                                    key={indexTop}
                                                >
                                                    {/* slider item */}
                                                    {
                                                        popular?.results
                                                        .slice(0, 10)
                                                        .slice(offsetTop*indexTop, offsetTop*indexTop + offsetTop)
                                                        .map((movie) => (
                                                            
                                                            <Slider_Item_Wrapper
                                                                style={{
                                                                    width: "20.1%",
                                                                }}
                                                                layoutId={movie.id + "_pouplar"}
                                                                key={movie.id + "_pouplar"} 
                                                                whileHover="hover"
                                                                initial="normal"
                                                                variants={boxVariants}
                                                                // onHoverStart={() => {}}
                                                                // onHoverEnd={() => handleClose(movie.id)}
                                                                transition={{ type: "tween" }}
                                                            >
                                                                {/* <div> */}
                                                                    <Slider_Item_Container>
                                                                        {/* <div> */}
                                                                            <Slider_Item>
                                                                                <Slider_Img_Container onClick={() => handleDetailInfo(movie.id, movie.title)}>
                                                                                    {
                                                                                        (movie.idx === 0) ?
                                                                                        (<svg id="rank-1" width="100%" height="100%" viewBox="-20 0 70 154">
                                                                                            <path stroke="#595959"  strokeWidth="4" d="M35.377 152H72V2.538L2 19.362v30.341l33.377-8.459V152z">
                                                                                            </path>
                                                                                        </svg>)
                                                                                        :
                                                                                        (movie.idx === 1) 
                                                                                        ?
                                                                                        (<svg id="rank-2" width="100%" height="100%" viewBox="0 0 80 154">
                                                                                            <path stroke="#595959" strokeWidth="4" d="M3.72 152H113v-30.174H50.484l4.355-3.55 29.453-24.012c5.088-4.124 9.748-8.459 13.983-13.004 4.16-4.464 7.481-9.339 9.972-14.629 2.449-5.203 3.678-11.113 3.678-17.749 0-9.428-2.294-17.627-6.875-24.645-4.597-7.042-10.941-12.494-19.07-16.376C77.803 3.957 68.496 2 58.036 2 47.591 2 38.37 4.023 30.347 8.06c-8.015 4.032-14.457 9.578-19.352 16.654-4.492 6.493-7.389 13.803-8.693 21.952h34.055c1.236-3.52 3.398-6.52 6.459-8.97 3.54-2.834 8.277-4.224 14.147-4.224 5.93 0 10.552 1.537 13.76 4.681 3.181 3.12 4.791 7.024 4.791 11.594 0 4.151-1.16 7.934-3.468 11.298-2.192 3.194-5.987 7.124-11.405 11.84L3.72 122.465V152z">
                                                                                            </path>
                                                                                        </svg>)
                                                                                        :
                                                                                        (movie.idx === 2)
                                                                                        ?
                                                                                        (<svg id="rank-3" width="100%" height="100%" viewBox="0 0 80 154">
                                                                                            <path stroke="#595959" strokeWidth="4" d="M3.809 41.577h33.243c1.3-2.702 3.545-4.947 6.674-6.72 3.554-2.015 7.83-3.01 12.798-3.01 5.555 0 10.14 1.11 13.723 3.376 3.839 2.427 5.782 6.283 5.782 11.315 0 4.553-1.853 8.395-5.473 11.38-3.547 2.926-8.18 4.37-13.821 4.37H41.44v28.366h16.77c5.572 0 10.275 1.227 14.068 3.711 4.02 2.633 6.071 6.581 6.071 11.616 0 5.705-1.943 9.975-5.853 12.562-3.658 2.42-8.292 3.61-13.863 3.61-5.205 0-9.82-.94-13.827-2.836-3.698-1.75-6.32-4.272-7.785-7.529H2.33c2.096 12.089 7.761 21.65 17.028 28.78C29.242 148.175 42.594 152 59.476 152c10.706 0 20.175-1.783 28.42-5.337 8.185-3.528 14.575-8.486 19.208-14.884 4.595-6.346 6.896-13.938 6.896-22.837 0-6.952-1.93-13.494-5.81-19.666-3.815-6.07-9.68-10.367-17.683-12.908l-5.46-1.735 5.353-2.04c6.659-2.538 11.667-6.338 15.083-11.412 3.431-5.096 5.142-10.806 5.142-17.181 0-8.471-2.262-15.778-6.787-21.985-4.574-6.275-10.7-11.17-18.408-14.696C77.683 3.775 69.109 2 59.687 2 44.084 2 31.515 5.816 21.91 13.415c-9 7.119-15.025 16.486-18.101 28.162z">
                                                                                            </path>
                                                                                        </svg>)
                                                                                        :
                                                                                        (movie.idx === 3)
                                                                                        ?
                                                                                        (<svg id="rank-4" width="100%" height="100%" viewBox="0 0 81 154" >
                                                                                            <path stroke="#595959" strokeWidth="4" d="M72 152h35.333v-30.977H128V92.497h-20.667V2H69.89L2 92.712v28.311h70V152zM36.202 92.188l35.93-47.998v47.998h-35.93z">
                                                                                            </path>
                                                                                        </svg>)
                                                                                        :
                                                                                        (movie.idx === 4)
                                                                                        ?
                                                                                        (<svg id="rank-5" width="100%" height="100%" viewBox="0 0 81 154">
                                                                                            <path stroke="#595959" strokeWidth="4" d="M105.588 32.174V2H13.534l-8.3 88.357h32.463c2.145-2.362 4.866-4.254 8.143-5.675 3.585-1.554 7.543-2.328 11.859-2.328 6.247 0 11.418 1.745 15.418 5.255 4.061 3.564 6.104 8.37 6.104 14.265 0 6.041-2.044 10.89-6.121 14.387-3.999 3.43-9.162 5.132-15.401 5.132-4.299 0-8.17-.694-11.601-2.095-3.11-1.268-5.577-2.946-7.368-5.042H2.592c3.308 11.593 9.782 20.623 19.46 27.164C32.472 148.464 45.64 152 61.602 152c10.12 0 19.294-1.99 27.548-5.966 8.198-3.949 14.711-9.718 19.572-17.335 4.844-7.59 7.278-16.95 7.278-28.123 0-9.182-2.013-17.314-6.032-24.431-4.02-7.118-9.514-12.7-16.51-16.775-6.99-4.072-14.849-6.109-23.612-6.109-11.06 0-20.099 3.483-27.234 10.461l-3.892 3.806 3.273-35.354h63.595z">
                                                                                            </path>
                                                                                        </svg>)
                                                                                        :
                                                                                        (movie.idx === 5)
                                                                                        ?
                                                                                        (<svg id="rank-6" width="100%" height="100%" viewBox="0 0 81 154">
                                                                                            <path stroke="#595959" strokeWidth="4" d="M79.482 38.192h35.551c-3.284-10.945-8.963-19.573-17.048-25.938C89.323 5.434 77.531 2 62.545 2 50.756 2 40.35 4.86 31.277 10.577c-9.064 5.712-16.198 14.09-21.412 25.178C4.63 46.893 2 60.425 2 76.365c0 14.416 2.356 27.344 7.059 38.798 4.667 11.368 11.573 20.34 20.734 26.956C38.904 148.7 50.225 152 63.816 152a61.513 61.513 0 0019.922-3.278 53.546 53.546 0 0017.378-9.792c5.154-4.33 9.255-9.64 12.314-15.947 3.042-6.273 4.57-13.556 4.57-21.868 0-8.812-2.062-16.636-6.182-23.51-4.134-6.897-9.643-12.293-16.55-16.212-6.905-3.917-14.48-5.874-22.76-5.874-14.546 0-25.34 4.55-32.569 13.63l-4.003 5.03.443-6.413c.874-12.636 3.56-21.85 8.168-27.654 4.69-5.907 10.885-8.9 18.421-8.9 4.26 0 7.826.734 10.685 2.24 2.445 1.287 4.396 2.867 5.829 4.74zM62.605 123c-5.825 0-10.902-1.894-15.136-5.655C43.173 113.528 41 108.603 41 102.71c0-5.881 2.164-10.864 6.44-14.818C51.674 83.975 56.762 82 62.604 82c5.847 0 10.906 1.98 15.074 5.905C81.878 91.859 84 96.837 84 102.71c0 5.885-2.131 10.805-6.35 14.622-4.167 3.77-9.214 5.668-15.045 5.668z">
                                                                                            </path>
                                                                                        </svg>)
                                                                                        :
                                                                                        (movie.idx === 6)
                                                                                        ?
                                                                                        (<svg id="rank-7" viewBox="0 0 78 154" width="100%" height="100%" >
                                                                                            <path stroke="#595959" strokeWidth="4" d="M113,2 L2,2 L2,33.4022989 L75.9665929,33.4022989 L21.22571,152 L60.28102,152 L113,32.7672283 L113,2 Z">
                                                                                            </path>
                                                                                        </svg>)
                                                                                        :
                                                                                        (movie.idx === 7)
                                                                                        ?
                                                                                        (<svg id="rank-8" width="100%" height="100%" viewBox="0 0 77 154">
                                                                                            <path stroke="#595959" strokeWidth="4" d="M59.5 152c11.335 0 21.358-1.72 30.077-5.15 8.637-3.397 15.361-8.258 20.213-14.586 4.805-6.267 7.21-13.876 7.21-22.899 0-7.326-2.261-14.07-6.813-20.29-4.548-6.214-10.837-10.658-18.922-13.35l-5.4-1.799 5.338-1.975c7.238-2.678 12.572-6.683 16.066-12.018 3.53-5.388 5.284-11.178 5.284-17.414 0-7.912-2.133-14.839-6.405-20.84-4.3-6.042-10.403-10.825-18.345-14.351C79.816 3.78 70.386 2 59.5 2S39.184 3.781 31.197 7.328c-7.942 3.526-14.044 8.309-18.345 14.351-4.272 6.001-6.405 12.928-6.405 20.84 0 6.236 1.755 12.026 5.284 17.414 3.494 5.335 8.828 9.34 16.066 12.018l5.338 1.975-5.4 1.798c-8.085 2.693-14.374 7.137-18.922 13.351C4.261 95.295 2 102.04 2 109.365c0 9.023 2.405 16.632 7.21 22.899 4.852 6.328 11.576 11.19 20.213 14.586 8.72 3.43 18.742 5.15 30.077 5.15zm.5-89c-5.6 0-10.334-1.515-14.125-4.56C41.985 55.313 40 51.183 40 46.21c0-5.244 1.976-9.518 5.875-12.65C49.666 30.515 54.4 29 60 29s10.334 1.515 14.125 4.56C78.025 36.694 80 40.968 80 46.212c0 4.973-1.985 9.103-5.875 12.228C70.334 61.485 65.6 63 60 63zm-.5 62c-6.255 0-11.556-1.613-15.836-4.856-4.41-3.343-6.664-7.816-6.664-13.25 0-5.298 2.258-9.698 6.664-13.038C47.944 90.613 53.245 89 59.5 89c6.255 0 11.556 1.613 15.836 4.856 4.406 3.34 6.664 7.74 6.664 13.038 0 5.434-2.254 9.907-6.664 13.25C71.056 123.387 65.755 125 59.5 125z">
                                                                                            </path>
                                                                                        </svg>)
                                                                                        :
                                                                                        (movie.idx === 8)
                                                                                        ?
                                                                                        (<svg id="rank-9" viewBox="0 0 71 154" width="100%" height="100%" >
                                                                                            <path stroke="#595959" strokeWidth="4" d="M40.0597376,115.807692 L4.47328474,115.807692 C7.45109332,126.586242 13.4362856,135.15497 22.4670906,141.582071 C32.2129251,148.518048 44.5640134,152 59.5759717,152 C78.2141671,152 92.5105725,145.697944 102.6454,133.074799 C112.853557,120.360322 118,101.543854 118,76.5769231 C118,62.1603327 115.678843,49.3016297 111.046669,37.9886125 C106.453069,26.7698049 99.6241767,17.9802976 90.5435117,11.5767831 C81.5017862,5.20072813 70.1375399,2 56.3957597,2 C49.4158116,2 42.68229,3.15952329 36.1849549,5.47966815 C29.7045526,7.79376647 23.8782903,11.1932931 18.6948526,15.6846002 C13.5316746,20.1583529 9.45923583,25.508367 6.46782377,31.7491046 C3.4928156,37.95562 2,45.0644366 2,53.0961538 C2,61.9117395 4.02797967,69.7019439 8.0788911,76.5056791 C12.1434539,83.3323424 17.5832537,88.6925139 24.4218542,92.6108203 C31.2518358,96.5241882 38.8590885,98.4807692 47.2791519,98.4807692 C55.0853554,98.4807692 61.6095996,97.3619306 66.8547126,95.1478231 C72.0569983,92.9517941 76.4513169,89.5970183 80.0605818,85.0622151 L84.0584687,80.039134 L83.6207883,86.4440446 C82.74746,99.2241219 80.0984349,108.438199 75.5533003,114.10687 C70.9310132,119.871766 64.7726909,122.788462 57.2438163,122.788462 C52.8691399,122.788462 49.1904302,122.100251 46.212535,120.692834 C43.5930338,119.454801 41.5307848,117.825945 40.0597376,115.807692 Z M57.5,31 C63.3657106,31 68.4419893,32.9364861 72.6299874,36.7826253 C76.8609583,40.6682294 79,45.6186068 79,51.5 C79,57.3813932 76.8609583,62.3317706 72.6299874,66.2173747 C68.4419893,70.0635139 63.3657106,72 57.5,72 C51.6342894,72 46.5580107,70.0635139 42.3700126,66.2173747 C38.1390417,62.3317706 36,57.3813932 36,51.5 C36,45.6186068 38.1390417,40.6682294 42.3700126,36.7826253 C46.5580107,32.9364861 51.6342894,31 57.5,31 Z">
                                                                                            </path>
                                                                                        </svg>)
                                                                                        :
                                                                                        (movie.idx === 9)
                                                                                        ?
                                                                                        (<svg id="rank-10" width="100%" height="100%" viewBox="0 0 140 154">
                                                                                            <path stroke="#595959" strokeWidth="4" d="M34.757 151.55h35.869V2.976L2 19.687v30.14l32.757-8.41v110.132zm105.53 3.45c12.394 0 23.097-3.12 32.163-9.353 9.093-6.25 16.11-15.047 21.066-26.43C198.5 107.766 201 94.196 201 78.5c0-15.698-2.5-29.266-7.484-40.716-4.955-11.384-11.973-20.18-21.066-26.431C163.384 5.119 152.681 2 140.287 2c-12.393 0-23.096 3.12-32.162 9.353-9.093 6.25-16.11 15.047-21.066 26.43-4.984 11.45-7.484 25.02-7.484 40.717 0 15.698 2.5 29.266 7.484 40.716 4.955 11.384 11.973 20.18 21.066 26.431 9.066 6.234 19.769 9.353 32.162 9.353zm0-31.368c-7.827 0-13.942-4.147-18.15-12.178-4.053-7.736-6.047-18.713-6.047-32.954s1.994-25.218 6.047-32.954c4.208-8.03 10.323-12.178 18.15-12.178 7.827 0 13.943 4.147 18.15 12.178 4.053 7.736 6.048 18.713 6.048 32.954s-1.995 25.218-6.047 32.954c-4.208 8.03-10.324 12.178-18.15 12.178z">
                                                                                            </path>
                                                                                        </svg>)
                                                                                        : null 
                                                                                    }

                                                                                    {/* img */}
                                                                                    <img 
                                                                                        style={{
                                                                                            objectFit: "cover",
                                                                                            width:"50%",
                                                                                            cursor: "pointer",
                                                                                            left: "auto",
                                                                                            height: "100%"
                                                                                        }}
                                                                                        decoding="async"
                                                                                        src={makeImagePath(movie.poster_path || movie.poster_path, "w500")} alt="" />
                                                                                    {/* title */}
                                                                                    {/* <Content_Play_Wrapper variants={infoVariants}>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="PlayStandard" aria-hidden="true">
                                                                                            <path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="currentColor">
                                                                                            </path>
                                                                                        </svg>
                                                                                    </Content_Play_Wrapper> */}
                                                                                    {/* <Slider_Img_Title>
                                                                                        <p>{movie.title}</p>
                                                                                    </Slider_Img_Title> */}
                                                                                </Slider_Img_Container>   
                                                                                {/* <Main_Title_Wrapper_ variants={infoVariants}>
                                                                                    <Main_Title_>
                                                                                        {movie.title}
                                                                                    </Main_Title_>
                                                                                </Main_Title_Wrapper_> */}
                                                                                <Control_Button_Container variants={infoVariants}>
                                                                                    {/* 재생 */}
                                                                                    <Play_Button_Wrapper>
                                                                                        <Play_Button_Container>
                                                                                            <Play_Button_Svg_Wrapper>
                                                                                                <Play_Button_Svg>
                                                                                                    <svg 
                                                                                                        style={{color: "white"}}
                                                                                                        xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="CircleIStandard" aria-hidden="true">
                                                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor">
                                                                                                        </path>
                                                                                                    </svg>
                                                                                                </Play_Button_Svg>
                                                                                            </Play_Button_Svg_Wrapper>
                                                                                            <Play_Button_Gap />
                                                                                            <Play_Title 
                                                                                                onClick={() => handleDetailInfo(movie.id, movie.title)}
                                                                                                style={{color: "white"}}>상세 정보</Play_Title>
                                                                                        </Play_Button_Container>
                                                                                    </Play_Button_Wrapper>

                                                                                    {/* 관심 */}
                                                                                    <Wish_Button_Wrapper 
                                                                                        style={{
                                                                                            position: "absolute",
                                                                                            right: "20%",
                                                                                        }}
                                                                                        onClick={() => handleFavVideo(movie?.id)} key={"wish"} >
                                                                                        <Wish_Button_Svg_Wrapper>
                                                                                            <Wish_Button_Svg>
                                                                                                {/* not wish */}
                                                                                                <svg 
                                                                                                    style={{display: movie?.id !== undefined ? favList?.includes(movie?.id) ? "none" : "" : ""}}
                                                                                                    xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="PlusStandard" aria-hidden="true">
                                                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor">
                                                                                                    </path>
                                                                                                </svg>
                                                                                                {/* wish */}
                                                                                                <svg 
                                                                                                    style={{display: movie?.id !== undefined ? favList?.includes(movie?.id) ? "" : "none" : ""}}
                                                                                                    xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="CheckmarkStandard" aria-hidden="true">
                                                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor">
                                                                                                    </path>
                                                                                                </svg>
                                                                                            </Wish_Button_Svg>
                                                                                        </Wish_Button_Svg_Wrapper>
                                                                                    </Wish_Button_Wrapper>
                                                                                    {/* 좋아요 */}
                                                                                    <Wish_Button_Wrapper 
                                                                                        style={{
                                                                                            position: "absolute",
                                                                                            right: "2%",
                                                                                        }}
                                                                                        onClick={() => handleVotedVideo(movie?.id)}  key={"like"}>
                                                                                        <Wish_Button_Svg_Wrapper>
                                                                                            <Wish_Button_Svg>
                                                                                                {/* not like */}
                                                                                                <svg 
                                                                                                    style={{display: movie?.id !== undefined ? votedList?.includes(movie?.id) ? "none" : "" : ""}}
                                                                                                    xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="ThumbsUpStandard" aria-hidden="true">
                                                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.696 8.7732C10.8947 8.45534 11 8.08804 11 7.7132V4H11.8377C12.7152 4 13.4285 4.55292 13.6073 5.31126C13.8233 6.22758 14 7.22716 14 8C14 8.58478 13.8976 9.1919 13.7536 9.75039L13.4315 11H14.7219H17.5C18.3284 11 19 11.6716 19 12.5C19 12.5929 18.9917 12.6831 18.976 12.7699L18.8955 13.2149L19.1764 13.5692C19.3794 13.8252 19.5 14.1471 19.5 14.5C19.5 14.8529 19.3794 15.1748 19.1764 15.4308L18.8955 15.7851L18.976 16.2301C18.9917 16.317 19 16.4071 19 16.5C19 16.9901 18.766 17.4253 18.3994 17.7006L18 18.0006L18 18.5001C17.9999 19.3285 17.3284 20 16.5 20H14H13H12.6228C11.6554 20 10.6944 19.844 9.77673 19.5382L8.28366 19.0405C7.22457 18.6874 6.11617 18.5051 5 18.5001V13.7543L7.03558 13.1727C7.74927 12.9688 8.36203 12.5076 8.75542 11.8781L10.696 8.7732ZM10.5 2C9.67157 2 9 2.67157 9 3.5V7.7132L7.05942 10.8181C6.92829 11.0279 6.72404 11.1817 6.48614 11.2497L4.45056 11.8313C3.59195 12.0766 3 12.8613 3 13.7543V18.5468C3 19.6255 3.87447 20.5 4.95319 20.5C5.87021 20.5 6.78124 20.6478 7.65121 20.9378L9.14427 21.4355C10.2659 21.8094 11.4405 22 12.6228 22H13H14H16.5C18.2692 22 19.7319 20.6873 19.967 18.9827C20.6039 18.3496 21 17.4709 21 16.5C21 16.4369 20.9983 16.3742 20.995 16.3118C21.3153 15.783 21.5 15.1622 21.5 14.5C21.5 13.8378 21.3153 13.217 20.995 12.6883C20.9983 12.6258 21 12.5631 21 12.5C21 10.567 19.433 9 17.5 9H15.9338C15.9752 8.6755 16 8.33974 16 8C16 6.98865 15.7788 5.80611 15.5539 4.85235C15.1401 3.09702 13.5428 2 11.8377 2H10.5Z" fill="currentColor">
                                                                                                    </path>
                                                                                                </svg>
                                                                                                {/* like */}
                                                                                                <svg 
                                                                                                    style={{display: movie?.id !== undefined ? votedList?.includes(movie?.id) ? "" : "none" : ""}}
                                                                                                    xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="ThumbsUpFillStandard" aria-hidden="true">
                                                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.407 6.25579L13.313 5.50407C13.1342 4.07353 11.9181 3 10.4764 3C10.2133 3 10 3.21331 10 3.47644V6.7132C10 6.90062 9.94733 7.08427 9.848 7.2432L7.90742 10.3481C7.64516 10.7677 7.23665 11.0752 6.76086 11.2112L4.72528 11.7928C4.29598 11.9154 4 12.3078 4 12.7543V18.3161C4 18.6938 4.30618 19 4.68387 19C5.874 19 7.04352 19.3106 8.07684 19.9011L8.25 20C9.39679 20.6553 10.6947 21 12.0156 21H13H16H16.5C17.3284 21 18 20.3284 18 19.5C18 19.1158 17.8556 18.7654 17.6181 18.5H18C18.8284 18.5 19.5 17.8284 19.5 17C19.5 16.4601 19.2147 15.9868 18.7867 15.7226C19.478 15.5888 20 14.9804 20 14.25C20 13.4216 19.3284 12.75 18.5 12.75H18.3294C18.7336 12.4813 19 12.0217 19 11.5C19 10.6716 18.3284 10 17.5 10H13.125L13.407 7.74421C13.4688 7.24999 13.4688 6.75001 13.407 6.25579Z" fill="currentColor">
                                                                                                    </path>
                                                                                                </svg>
                                                                                            </Wish_Button_Svg>
                                                                                        </Wish_Button_Svg_Wrapper>
                                                                                    </Wish_Button_Wrapper>

                                                                                </Control_Button_Container>
                                                                            </Slider_Item>

                                                                        {/* </div> */}
                                                                        {/* <div></div> */}
                                                                    </Slider_Item_Container>
                                                                {/* </div> */}

                                                            </Slider_Item_Wrapper>
                                                            
                                                        ))
                                                    }

                                                </Slider_Container>
                                            </AnimatePresence>
                                        </Slider_Wrapper>
                                        {/* 콘텐츠 더보기 */}
                                        <Slider_Next_Wrapper 
                                            onClick={increaseIndexTop}
                                            style={{right:0}}
                                        >
                                            <Sldier_Next_Img style={{transform: "rotate(-180deg)"}} >
                                                <svg fill="white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowBackIosIcon">
                                                    <path d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z">
                                                    </path>
                                                </svg>
                                            </Sldier_Next_Img>
                                        </Slider_Next_Wrapper>
                                    </Slide_Content_Container>
                                </Slide_Layer_Wrapper>
                            </div>
                        </Slide_Content_Wrapper>
                    </Slide_Container>
                </MainView_Container>                                
            </MainView_Wrapper>
        {/* Popup */}
        {
            isOpenMainDetail && 
            <>
                <Detail 
                    onModalClose={setIsOpenMainDetail}
                    isOpen={isOpenMainDetail} 
                    movieId={movieInfo.movieId} 
                    title={movieInfo.movieTitle} 
                />
            </>
        }
        </Body_Container>
        
    );
}

export default Test;