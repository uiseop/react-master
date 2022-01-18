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

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
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
    color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
    a {
        display: block;
    }
`;

interface RouteState {
    name: string;
}

interface InfoData {
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

interface PriceData {
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

function Coin() {
    const { coinId } = useParams();
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();
    const state = location.state as RouteState;
    const priceMatch = location.pathname.endsWith("price");
    const chartMatch = location.pathname.endsWith("chart");
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
    }, [coinId]);

    return (
        <Container>
            <Header to="/">
                <Title>
                    {state?.name
                        ? state.name
                        : loading
                        ? "loading"
                        : info?.name}
                </Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>rank:</span>
                            <span>{info?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>symbol:</span>
                            <span>{info?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>open source:</span>
                            <span>{info?.open_source ? "Yes" : "No"}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{info?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>total_suply:</span>
                            <span>{priceInfo?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max supply:</span>
                            <span>{priceInfo?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    <TabContainer>
                        <Tab isActive={chartMatch}>
                            <Link to="chart">Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch}>
                            <Link to="price">Price</Link>
                        </Tab>
                    </TabContainer>
                    <Routes>
                        <Route path="chart" element={<Chart />} />
                        <Route path="price" element={<Price />} />
                    </Routes>
                </>
            )}
        </Container>
    );
}

export default Coin;
