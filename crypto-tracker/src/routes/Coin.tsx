import {
    Route,
    Routes,
    useLocation,
    useParams,
    Link,
    useMatch,
} from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchInfos, fetchPrices } from "../api";
import { Helmet } from "react-helmet"

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
    align-self: flex-start;
    position: relative;
`;

const Header = styled(Link)`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
    display: block;
    text-align: center;
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Description = styled.p`
    margin: 20px 0;
`;

const TabContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 25px 0;
    gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 7px 0;
    border-radius: 10px;
    flex: 1;
    color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.textColor};
    a {
        display: block;
    }
`;

interface RouteState {
    name: string;
}

interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface IPriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

type RouteParams = {
    coinId: string;
};

function Coin() {
    const { coinId } = useParams() as RouteParams;
    const location = useLocation();
    const state = location.state as RouteState;
    // const priceMatch = location.pathname.endsWith("price");
    const priceMatch = useMatch("/:coinId/price");
    // const chartMatch = location.pathname.endsWith("chart");
    const chartMatch = useMatch("/:coinId/chart");
    /* const [info, setInfo] = useState<InfoData>();
    const [loading, setLoading] = useState(true);
    const [priceInfo, setPriceInfo] = useState<PriceData>();
    useEffect(() => {
        (async () => {
            const res = await fetch(
                `https://api.coinpaprika.com/v1/coins/${coinId}`
            );
            const infoData = await res.json();
            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();

            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
        })();
    }, [coinId]); */
    const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
        ["infos", coinId],
        () => fetchInfos(coinId)
    );
    const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(
        ["prices", coinId],
        () => fetchPrices(coinId),
        { refetchInterval: 5000 }
    );

    const loading = infoLoading || priceLoading;
    return (
        <Container>
            <Helmet>
                <title>{state?.name
                        ? state.name
                        : loading
                        ? "loading"
                        : infoData?.name}</title>
            </Helmet>
            <Header to="/">
                <Title>
                    {state?.name
                        ? state.name
                        : loading
                        ? "loading"
                        : infoData?.name}
                </Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>symbol:</span>
                            <span>{infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>price:</span>
                            <span>${priceData?.quotes.USD.price.toFixed(3)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>total_suply:</span>
                            <span>{priceData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max supply:</span>
                            <span>{priceData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    <TabContainer>
                        <Tab isActive={chartMatch !== null}>
                            <Link to="chart">Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to="price">Price</Link>
                        </Tab>
                    </TabContainer>
                    <Routes>
                        <Route
                            path="chart"
                            element={<Chart coinId={coinId} coinName={infoData!.name} />}
                        />
                        <Route path="price" element={<Price coinId={coinId} tickersData={priceData} />} />
                    </Routes>
                </>
            )}
        </Container>
    );
}

export default Coin;
