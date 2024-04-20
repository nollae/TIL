import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';

import { ReactComponent as LightMode } from '../assets/light-mode.svg';
import { ReactComponent as DarkMode } from '../assets/dark-mode.svg';

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color:${(props) => props.theme.accentColor};
    /* margin-left: auto; */
    font-weight: bold;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`; 

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

const ThemeWrapper = styled.div`
    cursor: pointer;
    width: 32px;
    margin-left: auto;
    margin-bottom: -10px;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

function Coins() {

    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins)

    return (
        <Container>
            {/* <Header>
                <Title>Top 100 Cyptos</Title>
                <ThemeWrapper>
                    <LightMode />
                </ThemeWrapper>
            </Header> */}
            {isLoading ? 
                <Loader>Loading ... </Loader>
                : 
                <CoinList>
                {data?.slice(0,100).map(coin => (
                    <Coin key={coin.id}>
                        <Link to={{
                            pathname: `/${coin.id}`,
                            state: { name: coin.name },
                        }}>
                            <Img 
                                src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                                // {`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                            />
                            {coin.name} &rarr;
                        </Link>
                    </Coin>
                ))}
                </CoinList>
            }
        </Container>
    );
}

export default Coins;