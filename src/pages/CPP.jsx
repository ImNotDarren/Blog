import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { PlusCircleOutlined } from '@ant-design/icons'
import { message } from 'antd'
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';

function CPP(props) {

    const [url, setUrl] = useState('')

    const [winWidth, setWinWidth] = useState(document.querySelector('body').offsetWidth)

    useEffect(() => {

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
    }

    const handleSubmit = () => {
        // check if the url is from cars.com
        const urlpre = 'https://www.cars.com/vehicledetail/'
        if (url.startsWith(urlpre, 0)){
            console.log('correct url')
            // make a request to backend
        } else {
            message.error('Wrong URL!')
        }
    }

    const handleClear = () => {
        setUrl('')
    }


    return (
        <>
            <div className='cpp_content'>
                <div className="cpp_title">Paste your cars.com url here:</div>
                <TextField id="outlined-basic" label="cars.com url" variant="outlined" onChange={getUrl} sx={{width: winWidth <= 560 ? '100%' : '500px', marginTop: '10px'}} value={url}></TextField>
                <div className="cpp_btns">
                    <Button variant='outlined' onClick={handleSubmit} sx={{marginRight: '10px', width: winWidth <= 560 ? '100%' : '100px'}}>submit</Button>
                    <Button variant='outlined' color='error' onClick={handleClear} sx={{width: winWidth <= 560 ? '100%' : '100px'}}>clear</Button>
                </div>
                
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        uid: state.uid,
        language: state.language
    }
}

export default connect(mapStateToProps)(CPP)