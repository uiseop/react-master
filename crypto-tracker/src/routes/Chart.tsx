import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
    coinId: string;
    coinName: string;
}

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart({ coinId, coinName }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
        {
            refetchInterval: 10000,
        }
    );

    const categories = data?.map((date) => date.time_open);
    const seriesData = data?.map((d) => ({
        x: d.time_open,
        y: [d.open.toFixed(3), d.high.toFixed(3), d.low.toFixed(3), d.close.toFixed(3)],
    }));
    return (
        <div>
            {isLoading ? (
                "Loading chart..."
            ) : (
                <ApexChart
                    type="candlestick"
                    series={[
                        {
                            data: seriesData,
                        },
                    ]}
                    options={{
                        title: {
                            text: `${coinName} chart`,
                            align: "left",
                        },
                        theme: {
                            mode: "dark",
                        },
                        chart: {
                            type: "candlestick",
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                            zoom: {
                                enabled: false,
                            },
                        },
                        grid: {
                            show: false,
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            type: "datetime",
                        },
                        plotOptions: {
                            candlestick: {
                                colors: {
                                    upward: "#3C90EB",
                                    downward: "#DF7D46",
                                },
                            },
                        },
                        tooltip: {
                            y: {
                                formatter: (value) => `$${value.toFixed(3)}`,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}

export default Chart;
