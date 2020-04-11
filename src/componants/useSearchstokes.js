import { useState, useEffect } from 'react'
import axios from 'axios';

function useSearchstokes(initialState, initialStockState) {

    const [searchState, setSearchState] = useState(initialState);
    const { query } = searchState;

    // the useState Hook does not have a second callback argument, as it is there in class based components.
    // that is why we need to use the useEffect

    // How to cancel Request if a subsequent request is made? Below is the answer

    // let source = axios.CancelToken.source();
    // The issue is that if you make the first request and then make the second request, 
    // the second request is returned first and then the first request is returned. This 
    // makes the search results inaccurate depending on the time taken to complete the queries.

    // The way I can think about how to do this is to issue a cancel token for every request, 
    // and before a request is made, the system will try to cancel any previous requests.

    const fetchSearchResult = async (query, source) => {
        // const searchURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=QO4N61CAIXS9VR17`;
        // const searchURL = `https://api-v2.intrinio.com/securities/search?query=${query}&api_key=OjE3ZThmMmU3MGFiNGU3ZjcyYTFlOGEzNWNjZmM4ZWY2`;
        // const searchURL = `https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/ajaxCompanySearch.jsp?search=${query}`;

        await axios.get('./niftyfivehundredlist.json', {
            cancelToken: source.token,
            timeout: 10000
        })
            .then((res) => {
                // const resultNotfound = res && !res.data.length
                //     ? 'No more result found. Please try a new search'
                //     : ''
                const filteredResult = res.data.filter((data) => {
                    let companyName = data['Company Name'].toLowerCase();
                    return companyName.indexOf(query.toLowerCase()) !== -1
                })
                // console.log("Filter Result " + filteredResult);
                const resultNotfound = res && !filteredResult.length
                    ? 'No more result found. Please try a new search'
                    : ''
                setSearchState({ query: query, results: filteredResult, loading: false, message: resultNotfound });
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    console.log(`request cancelled:${error.message}`);
                } else {
                    setSearchState({ loading: false, results: [], query: '', message: 'Failed to fetch the data. please check network' });
                    console.log("another error happened:" + error.message);
                }
            })

        // axios.get('./niftyfivehundredlist.json')
        //     .then((res) => console.log(res))
        //     .catch((error) => console.log(error))
    }

    useEffect(() => {
        let source = axios.CancelToken.source();
        if (query !== '') {
            fetchSearchResult(query, source)
        }
        return () => {
            source.cancel('Cancelling in cleanup')
        }
    }, [query])

    // const useOutsideAlerter = (ref) => {
    //     useEffect(() => {
    
    //         const handleClickOutside = (event) => {
    //             if (ref.current && !ref.current.contains(event.target)) {
    //                 console.log("You clicked outside of me!");
    //             }
    //         }
    
    //         document.addEventListener("mousedown", handleClickOutside);
    //         return () => {
    //             document.removeEventListener("mousedown", handleClickOutside);
    //         }
    //     }, [ref])
    // }

    return { searchState, setSearchState }
}

export default useSearchstokes
