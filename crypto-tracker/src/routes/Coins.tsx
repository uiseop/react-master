import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Nav = styled.nav<{isActive: boolean}>`
    position: fixed;
    width: 300px;
    height: 100%;
    left: ${(props) => props.isActive ? "0" : "-300px"};
    background-color: rgba(41, 48, 71, 0.7);
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    transition: left 0.4s ease;
`;

const CoinsList = styled.ul`
    padding-top: 5px;
`;

const Coin = styled.li`
    color: ${(props) => props.theme.bgColor};
    margin-bottom: 10px;
    border-radius: 15px;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
        color: ${(props) => props.theme.textColor};
        font-weight: bold;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
    & span {
        position: relative;
        top: 3px;
        font-size: 5px;
        color: #e84118;
    }
    & i {
        font-size: 35px;
        margin-right: 15px;
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
    display: block;
    text-align: center;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

const blinkCursor = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const typing = keyframes`
    0% {
        width: 0;
    }
    100% {
        width: 857.083px;
    }
`;

const H1 = styled.h1`
    position: relative;
    text-transform: uppercase;
    color: #fff;
    font-size: 100px;
    font-weight: 700;
    overflow: hidden;
    white-space: nowrap;
    animation: ${typing} 3s steps(14);
    &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 5px;
        height: 100%;
        background: #fff;
        animation: ${blinkCursor} 1s linear infinite;
    }
`;

const Btn = styled.div<{isActive: boolean}>`
    position: absolute;
    top: 15px;
    left: ${(props) => props.isActive ? "345px" : "45px"};
    width: 45px;
    height: 45px;
    cursor: pointer;
    transition: left 0.4s ease;
    & i {
        font-size: 28px;
        line-height: 45px;
    }
`;

interface CoinInterface {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

function Coins() {
    /*const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const response = await fetch(
                "https://api.coinpaprika.com/v1/coins"
            );
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, []);*/
    const [isActive, setIsActive] = useState(false);
    const { isLoading, data } = useQuery<CoinInterface[]>(
        "allCoins",
        fetchCoins
    );

    function openSidebar() {
        setIsActive((cur) => !cur)
    }
    return (
        <>
            <Helmet>
                <title>코인</title>
            </Helmet>
            <H1>Crypto tracker</H1>
            <Btn onClick={openSidebar} isActive={isActive}>
                <i className={isActive ? "fas fa-times" : "fas fa-bars"}></i>
            </Btn>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <Nav isActive={isActive}>
                    <CoinsList>
                        <Coin key="home">
                            <Link to="/"><i className="fas fa-home"></i>Home</Link>
                        </Coin>
                        {data?.slice(0, 100).map((coin, idx) => (
                            <Coin key={coin.id}>
                                <Link
                                    to={`/${coin.id}`}
                                    state={{ name: coin.name }}
                                >
                                    <Img
                                        src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                                    />
                                    {coin.name}
                                    <span>{coin.symbol}</span>
                                </Link>
                            </Coin>
                        ))}
                    </CoinsList>
                </Nav>
            )}
        </>
    );
}

export default Coins;
