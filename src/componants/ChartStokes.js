import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useParams } from 'react-router-dom';
import useChartStokes from './useChartStokes';

const useStyles = makeStyles((theme) => ({
    show: {
        display: 'block'
    },
    hide: {
        display: 'none'
    }
}))

// const volumes = [[1546214400000, 2771364], [1545955200000, 2776504], [1545868800000, 3031426], [1545782400000, 2533238], [1545696000000, 0], [1545609600000, 2727316], [1545350400000, 2900468], [1545264000000, 4835738], [1545177600000, 3679684], [1545091200000, 2036946], [1545004800000, 7929444], [1544745600000, 4995460], [1544659200000, 2970086], [1544572800000, 4542604], [1544486400000, 3728702]]


const getConfig = (GU, volumes, ohlcs, stokeName, datasetCode) => (
    {
        yAxis: [{
            labels: {
                align: 'left'
            },
            height: '80%',
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'left'
            },
            top: '80%',
            height: '20%',
            offset: 0
        }],
        tooltip: {
            shape: 'square',
            headerShape: 'callout',
            borderWidth: 0,
            shadow: false,
            positioner: function (width, height, point) {
                var chart = this.chart,
                    position;

                if (point.isHeader) {
                    position = {
                        x: Math.max(
                            // Left side limit
                            chart.plotLeft,
                            Math.min(
                                point.plotX + chart.plotLeft - width / 2,
                                // Right side limit
                                chart.chartWidth - width - chart.marginRight
                            )
                        ),
                        y: point.plotY
                    };
                } else {
                    position = {
                        x: point.series.chart.plotLeft,
                        y: point.series.yAxis.top - chart.plotTop
                    };
                }

                return position;
            }
        },
        series: [{
            type: 'ohlc',
            id: 'aapl-ohlc',
            name: 'AAPL Stock Price',
            data: ohlcs
        }, {
            type: 'column',
            id: 'aapl-volume',
            name: 'AAPL Volume',
            data: volumes,
            yAxis: 1
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 800
                },
                chartOptions: {
                    rangeSelector: {
                        inputEnabled: false
                    }
                }
            }]
        }

        // rangeSelector: {
        //     selected: 5
        // },

        // title: {
        //     text: stokeName
        // },

        // yAxis: [
        //     {
        //         labels: {
        //             align: "right",
        //             x: -3
        //         },
        //         title: {
        //             text: datasetCode
        //         },
        //         height: "70%",
        //         lineWidth: 2,
        //         resize: {
        //             enabled: true
        //         }
        //     },
        //     {
        //         labels: {
        //             align: "right",
        //             x: -3
        //         },
        //         title: {
        //             text: "Volume"
        //         },
        //         top: "75%",
        //         height: "45%",
        //         offset: 0,
        //         lineWidth: 2
        //     }
        // ],

        // tooltip: {
        //     split: true
        // },

        // series: [
        //     {
        //         type: "candlestick",
        //         name: datasetCode,
        //         data: ohlcs,
        //         dataGrouping: {
        //             units: GU
        //         }
        //     },
        //     {
        //         type: "column",
        //         name: "Volume",
        //         data: volumes,
        //         yAxis: 1,
        //         dataGrouping: {
        //             units: GU
        //         }
        //     }
        // ]
    }
)

function ChartStokes(props) {
    // const location = useLocation();
    // console.log(props.match.params);
    // console.log(props);
    let { name } = useParams();
    // const { project } = props;
    const symbol = (name === ":name") ? 'BIOCON' : name;
    const classes = useStyles();

    const initialState = {
        query: name,
        results: [],
        loading: false,
        message: ''
    }

    const { chartData, setChartData } = useChartStokes(initialState);
    console.log(chartData);
    const { results, loading, message } = chartData;

    const [GU, setGU] = useState([]);
    const [volumes, setvolume] = useState([]);
    const [ohlcs, setohlc] = useState([]);

    useEffect(() => {
        setChartData({ ...chartData, query: symbol, loading: true })
    }, [symbol])

    useEffect(() => {
        if (results && results.data && results.data.length) {
            const newResultArray = [];
            // const data = results.data;
            results.data.map((item, ind) => {
                return newResultArray.push([
                    item[0], item[1], item[2], item[3], item[4], item[5]
                ])
            })
            newResultArray.length = 90;
            const volume = [];
            const ohlc = [];
            const groupingUnits = [
                [
                    "week", // unit name
                    [1] // allowed multiples
                ],
                ["month", [1, 2, 3, 4, 6]]
            ]

            for (let i = 0; i < newResultArray.length; i += 1) {
                ohlc.push([
                    Date.parse(newResultArray[i][0]), // the date
                    // data[i][0],
                    newResultArray[i][1], // open
                    newResultArray[i][2], // high
                    newResultArray[i][3], // low
                    newResultArray[i][4] // close
                ]);

                volume.push([
                    Date.parse(newResultArray[i][0]), // the date
                    // newResultArray[i][0],
                    newResultArray[i][5] // the volume
                ]);
            }
            setGU(groupingUnits);
            setvolume(volume);
            setohlc(ohlc);
        }
    }, [results])

    const chartConfig = getConfig(GU, volumes, ohlcs, results.name, results.dataset_code);

    return (
        <div>
            {
                <div className={`${loading ? [classes.show] : [classes.hide]}`}>loading ...</div>
            }
            {
                message && <p className={`${loading ? [classes.hide] : [classes.show]}`}>{message}</p>
            }
            {
                results.length !== 0 &&
                <div className={`${loading ? [classes.hide] : [classes.show]}`}>
                    <Typography variant="h6" align="left" style={{ paddingBottom: '25px' }}>
                        {results.name}
                    </Typography>
                    <div style={{ width: '100%' }}>
                        <HighchartsReact
                            highcharts={Highcharts}
                            constructorType={"stockChart"}
                            options={chartConfig}
                        />
                    </div>
                    {/* <p>
                        {GU && JSON.stringify(GU)}
                    </p>
                    <p>
                        {volumes && JSON.stringify(volumes)}
                    </p>
                    <p>
                        {ohlcs && JSON.stringify(ohlcs)}
                    </p> */}
                </div>
            }
        </div>
    )
}

export default ChartStokes
