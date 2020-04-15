import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PopoverContent from './PopoverContent';

function NiftyStockWatch(props) {
    const { buySellStokes, goToChart } = props
    const [stokes, setStokes] = useState({})

    const fetchData = async (source) => {
        await axios.get('./juniorNiftyStockWatch.json', {
            cancelToken: source.token,
            timeout: 10000
        }).then((res) => {
            setStokes(res.data.data)
        })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        let source = axios.CancelToken.source();
        fetchData(source)
        return () => {
            source.cancel('Cancelling in cleanup')
        }
    }, [])

    const addToStockList = (data) => {
        console.log('Clicked --- ' + data)
    }

    const removeStoke = ((data, index) => {
        stokes.splice(index, 1);
        setStokes([...stokes]);
    })

    return (
        <div>
            {
                stokes && stokes.length &&
                <div>
                    {
                        stokes.map((data, index) => {
                            return <PopoverContent key={index} 
                                stokeResult = {data} 
                                index = {index}
                                removeStoke = {removeStoke} 
                                addToStockList={addToStockList} 
                                buySellStokes = {buySellStokes}
                                goToChart = {goToChart}
                            />
                        })
                    }
                </div>
            }
        </div>
    )
}

export default NiftyStockWatch
