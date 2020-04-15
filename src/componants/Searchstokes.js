import React, { useState, useEffect, useRef } from 'react' // , { useState }
import { makeStyles, fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';

import useSearchstokes from './useSearchstokes';
import PopoverContent from './PopoverContent';
import ApiFailureDialog from './ApiFailureDialog';

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        // marginRight: theme.spacing(2),
        marginLeft: '0 !important',
        marginRight: '0 !important',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 6),
        // vertical padding + font size from searchIcon
        // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        fontSize: '0.800rem'
        // [theme.breakpoints.up('md')]: {
        //     width: '20ch',
        // },
    },
    show: {
        display: 'inline-block'
    },
    hide: {
        display: 'none'
    }
}))

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

function Searchstokes(props) {
    const classes = useStyles();
    const { buySellStokes, goToChart } = props;
    const wrapperRef = useRef(null)
    const [display, setdisplay] = useState(false)

    const initialState = {
        query: '',
        results: [],
        loading: false,
        message: ''
    }

    const { searchState, setSearchState } = useSearchstokes(initialState);
    const { query, loading, message } = searchState;
    const [transition, setTransition] = useState(undefined);
    const [open, setOpen] = useState(false);

    // useEffect(() => {
    //     document.addEventListener("mousedown", handleClickOutside);

    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     }
    // }, [])

    // const handleClickOutside = (event) => {
    //     setSearchState({ ...searchState, query: '' });
    //     const { current: wrap } = wrapperRef;
    //     if (wrap && !wrap.contains(event.target)) {
    //         setdisplay(false);
    //     }
    // }

    const handleOnInputChange = (e) => {
        if(e === undefined) {
            setdisplay(false);
            setSearchState({...searchState, query: ''});
            return true;
        }
        const searchQuery = e.target.value;
        if (!searchQuery) {
            setSearchState({ query: searchQuery, results: [], loading: false, message: '' });
        } else {
            setSearchState({ query: searchQuery, loading: true, message: '' });
        }

        if (!display) {
            document.addEventListener('click', handleOutsideClick, false);
        } else {
            document.removeEventListener('click', handleOutsideClick, false);
        }
        setdisplay(prevState => ({
            display: !prevState.display
        }))
    }

    const handleOutsideClick = (e) => {
        if(wrapperRef.current === null) {
            return true
        }
        // ignore clicks on the component itself
        if (wrapperRef.current.contains(e.target)) {
            return;
        }
        // setdisplay(false);
        handleOnInputChange()
    }

    const addToStockList = (data) => {
        console.log('Inbox array --- ' + data.Symbol)

        axios.get(`https://www.quandl.com/api/v3/datasets/TC1/${data.Symbol}.json?api_key=PhqysWJTYVsNtSkCixxj`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.quandl_erro);
                if (err) {
                    handleApiErrorMessage(TransitionLeft)
                }
            })
    }

    const handleApiErrorMessage = (Transition) => {
        setTransition(() => Transition)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const removeStoke = (data) => {
        console.log(data);
    }

    const renderSearchResulr = () => {
        const { results } = searchState;
        if (results && results.length) {
            return (
                <List>
                    {
                        results.map((result, index) => {
                            return <PopoverContent key={index}
                                result={result}
                                addToStockList={addToStockList}
                                removeStoke={removeStoke}
                                buySellStokes={buySellStokes}
                                goToChart={goToChart}
                            />
                        })
                    }
                </List>
            )
        }
    }

    return (
        <>
            {/* ref={wrapperRef} */}
            <div ref={wrapperRef}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search for top 500 Nifty stokes..."
                        value={query}
                        name="query"
                        id="search-input"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={handleOnInputChange}
                    />
                </div>
                <div>
                    {
                        display && <div style={{ position: 'absolute', top: '87px', width: '100%', zIndex: '100', background: '#fff' }}>
                            {
                                message && <p style={{ color: '#3f51b5', textAlign: 'center' }}>{message}</p>
                            }
                            {
                                <p className={`${loading ? [classes.show] : [classes.hide]}`}>loading ...</p>
                            }
                            {
                                // opens ? renderSearchResulr() : null
                                renderSearchResulr()
                            }
                        </div>
                    }
                </div>
            </div>

            <ApiFailureDialog transition={transition} open={open} handleClose={handleClose} />

        </>
    )
}

export default Searchstokes
