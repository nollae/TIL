import styled from 'styled-components';

import { IGetMovieVideos, getMoviesVideos } from '../api';
import { makeVideoPath } from '../utils';
import { useQuery } from 'react-query';

// import YouTube from 'react-youtube';
import ReactPlayer from 'react-player';
import { useEffect, useState } from 'react';


const Main_Wrapper = styled.div<{$isOpen?:boolean}>`
    /* display: ${(props) => props.$isOpen ? "" : "none"}; */
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
    display: flex;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    will-change: scroll-position;
    height: 100%;
    width: 100%;    
    z-index: 100;
    border: 10px solid red;
`;

const Main_Container = styled.div`
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
    will-change: transform;
    position: inherit;
    transform-origin: 50% 12.5%;
    top: 2em;
    width: 850px;
    opacity: 1;
    left: auto;
    transform: none;
    margin-bottom: 2em;
    min-width: 850px;
    /* z-index: 2;     */
`;

const Preview_Container = styled.div`
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
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    overflow: hidden;    
`;

const Preview_Video_Wrapper = styled.div`
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
    /* position: absolute; */
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const Preview_Video_Container = styled.div`
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
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden; 
    video {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        user-select: none;
        word-break: keep-all;
        font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
        line-height: 1.4;
        color: #fff;
        font-size: 16px;
        cursor: auto;
        display: inline-block;
        vertical-align: baseline;
        box-sizing: inherit;
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }   
`;

const Detail_Backgound = styled.div<{$isOpen?:boolean}>`
    /* display: ${(props) => props.$isOpen ? "" : "none"}; */
    z-index: 99;
    overflow-y: auto;
    position: relative;
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
        position: fixed;
        top: 0;
        width: 100%;
    } 
`;

interface IProps {
    isOpen:boolean,
    movieId?:number,
}

function Detail(props:IProps) {

    const { data, isLoading } = useQuery<IGetMovieVideos>(
        ["movies", "videos"],
        () => getMoviesVideos(props.movieId)
    );

    const [isWindow, setIsWindow] = useState<boolean>(false);

    useEffect(() => {
        setIsWindow(true);
    }, []);

    return (
        <>
                <Main_Wrapper tabIndex={-1}>
                    <Main_Container>
                        <Preview_Container>
                            {/* video */}
                            <Preview_Video_Wrapper>
                                <Preview_Video_Container>
                                    {
                                        isWindow &&
                                        <ReactPlayer 
                                            url={data?.results[0] && makeVideoPath(data?.results[0].key)}
                                        />
                                    }
                                    {/* <video controls>
                                        <source src={data?.results[0] && makeVideoPath(data?.results[0].key)} type="video/mp4" />
                                    </video> */}
                                </Preview_Video_Container>
                            </Preview_Video_Wrapper>
                        </Preview_Container>
                    </Main_Container>
                </Main_Wrapper>
                <Detail_Backgound $isOpen={props.isOpen} tabIndex={-1}>
                    <div tabIndex={-1}>
                    </div>
                </Detail_Backgound>
            
        </>
    );
}

export default Detail;