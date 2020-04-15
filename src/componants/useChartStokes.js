import { useState, useEffect } from 'react';
import axios from 'axios';

function useChartStokes(initialState) {
    const [chartData, setChartData] = useState(initialState);
    const { query } = chartData;

    const featchData = (symbol) => {
        axios.get(`https://www.quandl.com/api/v3/datasets/XNSE/${symbol}.json?api_key=PhqysWJTYVsNtSkCixxj`)
            .then((res) => {
                console.log(res.data.dataset);
                const setMessage = res && res.status === 200
                    ? '' : 'No more result found. Please try a new search';
                setChartData({query: query, results: res.data.dataset, loading: false, message: setMessage})
            })
            .catch((error) => {
                console.log("Error happened:" + error.message);
                setChartData({ loading: false, results: [], query: '', message: error.message });
            })
    }

    useEffect(() => {
        featchData(query);
    }, [query])

    return { chartData, setChartData }
}

export default useChartStokes
