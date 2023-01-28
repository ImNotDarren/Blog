import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { PlusCircleOutlined } from '@ant-design/icons'
import { message } from 'antd'
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Button from '@mui/material/Button';

function CPP(props) {

    const [url, setUrl] = useState('')

    const [predictedPrice, setPredictedPrice] = useState(-1)

    const [winWidth, setWinWidth] = useState(document.querySelector('body').offsetWidth)

    const currYear = new Date().getFullYear()
    const [year, setYear] = useState(currYear+1)
    const [yearSelectList, setYearSelectList] = useState([])

    useEffect(() => {

        let tmp = []
        for (let i=currYear+1; i<currYear+11; i++) {
            tmp.push(i)
        }

        setYearSelectList(tmp)

        const handleResize = e => {
            if (e.target.innerWidth <= 560) {
                setWinWidth(560)
            } else if (e.target.innerWidth <= 700) {
                setWinWidth(700)
            } else if (e.target.innerWidth < 1000) {
                setWinWidth(999)
            } else {
                setWinWidth(1000)
            }
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })

    const getUrl = e => {
        setUrl(e.currentTarget.value)
        setPredictedPrice(-1)
    }

    const handleSubmit = () => {
        // check if the url is from cars.com
        const urlpre = 'https://www.cars.com/vehicledetail/'
        if (url.startsWith(urlpre, 0)) {
            let new_url = url.slice(35, -1)
            setPredictedPrice('Calculating...')
            // make a request to backend
            fetch(props.python_server + '/cpp/' + new_url + '/' + year)
                .then(res => res.json())
                .then(res => {
                    setPredictedPrice(parseInt(res['predictedPrice']))
                })
        } else {
            message.error('Wrong URL!')
        }
    }

    const handleClear = () => {
        setUrl('')
        setPredictedPrice(-1)
    }

    const handleYear = e => {
        setYear(e.target.value)
        setPredictedPrice(-1)
    }


    return (
        <>
            <div className='cpp_content'>
                <div className="cpp_title">Paste your cars.com url and predicted year here:</div>
                <div className="input">
                    <TextField id="outlined-basic" label="cars.com url" variant="outlined" onChange={getUrl} sx={{ width: winWidth <= 560 ? '100%' : '500px' }} value={url}></TextField>
                    <FormControl sx={{marginLeft: '10px', width: '120px'}}>
                        <InputLabel id="select-year">Year</InputLabel>
                        <Select
                            labelId="select-year"
                            id="select-year-select"
                            value={year}
                            label="Year"
                            onChange={handleYear}
                        >
                            {/* <MenuItem value={10}></MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem> */}

                            {
                                yearSelectList.map((y) => (
                                    <MenuItem value={y} key={y}>{y}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>

                <div className="cpp_btns">
                    <Button variant='outlined' onClick={handleSubmit} sx={{ marginRight: '10px', width: winWidth <= 560 ? '100%' : '100px' }}>submit</Button>
                    <Button variant='outlined' color='error' onClick={handleClear} sx={{ width: winWidth <= 560 ? '100%' : '100px' }}>clear</Button>
                </div>

                <div className={predictedPrice === -1 ? "cpp_prediction_hidden" : "cpp_prediction"}>
                    Predicted price in {year}: ${predictedPrice}
                </div>

            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        uid: state.uid,
        language: state.language,
        python_server: state.python_server
    }
}

export default connect(mapStateToProps)(CPP)