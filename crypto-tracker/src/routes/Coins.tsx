import { Link, useLocation, useMatch } from "react-router-dom";
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

const Nav = styled.nav<{ isActive: boolean }>`
    position: fixed;
    width: 300px;
    height: 100%;
    z-index: ${props => props.isActive ? 3 : 0};
    left: ${(props) => (props.isActive ? "0" : "-300px")};
    background-color: rgba(41, 48, 71, 0.7);
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    transition: left 0.4s ease;
`;

const CoinsList = styled.ul``;

const Coin = styled.li<{ isActive?: boolean }>`
    color: ${(props) => props.theme.bgColor};
    margin-bottom: 10px;
    border-radius: 15px;
    a {
        background-color: ${(props) =>
            props.isActive ? "rgba(255, 255, 255, 0.2)" : ""};
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
        color: ${(props) =>
            props.isActive ? props.theme.accentColor : props.theme.textColor};
        font-weight: bold;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
    & span {
        position: relative;
        top: -5px;
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

const Btn = styled.div<{ isActive: boolean }>`
    position: absolute;
    top: 15px;
    left: ${(props) => (props.isActive ? "345px" : "45px")};
    z-index: ${props => props.isActive ? 3 : 0};
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
    const isHomeMatch = useMatch("/");
    const [isActive, setIsActive] = useState(false);
    const { isLoading, data } = useQuery<CoinInterface[]>(
        "allCoins",
        fetchCoins
    );
    const {pathname} = useLocation();

    function openSidebar() {
        setIsActive((cur) => !cur);
    }
    return (
        <>
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Btn onClick={openSidebar} isActive={isActive}>
                <i className={isActive ? "fas fa-times" : "fas fa-bars"}></i>
            </Btn>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <Nav isActive={isActive}>
                    <CoinsList>
                        <Coin key="home" isActive={isHomeMatch !== null}>
                            <Link to="/">
                                <i className="fas fa-home"></i>Home
                            </Link>
                        </Coin>
                        {data?.slice(0, 100).map((coin, idx) => {
                            return (
                                <Coin key={coin.id} isActive={pathname.split("/")[1] === coin.id}>
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
                            );
                        })}
                    </CoinsList>
                </Nav>
            )}
        </>
    );
}

export default Coins;
