import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
    coinId: string;
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

function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
        fetchCoinHistory(coinId),
        {
            refetchInterval: 10000,
        }
    );

    const categories = data?.map((date) => date.time_open);
    return (
        <div>
            {isLoading ? (
                "Loading chart..."
            ) : (
                <ApexChart
                    type="line"
                    series={[
                        {
                            name: `${coinId}`,
                            data: data?.map((price) => price.close),
                        },
                    ]}
                    options={{
                        theme: {
                            mode: "dark",
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        grid: {
                            show: false,
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            axisBorder: {
                                show: false,
                            },
                            axisTicks: {
                                show: false,
                            },
                            type: "datetime",
                            categories: categories,
                            labels: {
                                show: false,
                            },
                        },
                        stroke: {
                            curve: "smooth",
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                gradientToColors: ["#C4E538"],
                                stops: [0, 100],
                            },
                        },
                        colors: ["#12CBC4"],
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
