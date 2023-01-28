import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { PlusCircleOutlined } from '@ant-design/icons'
import { message } from 'antd'
import { connect } from 'react-redux'
import Plot from 'react-plotly.js'

import Button from '@mui/material/Button';

window.Buffer = window.Buffer || require("buffer").Buffer;

function AFib(props) {

    const [fileList, setFileList] = useState([])

    const [uploaded, setUploaded] = useState(false)

    const [winWidth, setWinWidth] = useState(document.querySelector('body').offsetWidth)

    const [result, setResult] = useState(-1)

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

    }, [winWidth])

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        getFilesFromEvent: event => FileGetter(event)
    })

    // const config = {
    //     bucketName: process.env.REACT_APP_BUCKET_NAME,
    //     region: process.env.REACT_APP_REGION,
    //     accessKeyId: process.env.REACT_APP_ACCESS_ID,
    //     secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    //     s3Url: process.env.REACT_APP_S3_URL
    // }

    const handleUpload = () => {
        if (fileList.length === 0) {
            console.log('no file')

        } else if (fileList.length > 1) {
            message.error('Only upload one file at a time!')
        } else {
            const file = fileList[0]
            // uploadFile(file, config)
            //     .then(data => {
            //         message.success('Successfully uploaded!')
            //     })
            //     .catch(err => {
            //         console.error(err)
            //         message.error('Unsupported file!')
            //     })

            // TODO: upload function here

            // check if it's a csv file
            if (!file.name.endsWith('.csv')) {
                message.error('Not a .csv file!')
            } else {
                const data = new FormData()
                data.append('file_from_react', file)
                // upload to flask
                fetch(props.python_server + '/afib', {
                    method: 'POST',
                    body: data
                })
                    .then(res => res.json())
                    .then(res => {
                        setResult(res)
                        setFileList([])
                        setUploaded(true)

                        message.success('Successfully uploaded')
                    })

            }

        }
    }

    const handleClear = () => {
        setFileList([])
    }

    const FileGetter = event => {
        const files = fileList.slice(0)
        if (event.length > 0) {
            for (let i = 0; i < event.length; i++) {
                event[i].getFile().then(file => {
                    files.push(file)
                })
            }
        } else {
            // Retrieves the files loaded by the drag event or the select event
            const fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files
            for (var i = 0; i < fileList.length; i++) {
                const file = fileList.item(i)
                files.push(file)
            }
        }

        setFileList(files)
        // files returned from this fuction will be acceptedFiles
        return files
    }

    const handleRemove = e => {
        let tmp_list = fileList.slice(0) //deep copy
        tmp_list.splice(e.target.id, 1)
        setFileList(tmp_list)
    }

    const handleConfirm = () => {
        setUploaded(false)
        setResult(-1)
    }

    const upload_style = {
        marginTop: '10px',
        width: winWidth <= 700 ? '100%' : '100px'
    }

    const clear_style = {
        marginTop: '10px',
        marginLeft: '10px',
        width: winWidth <= 700 ? '100%' : '100px'
    }

    const resultDisplay = (
        <div className='result'>
            {
                result === -1 ? '' :
                    result['pred'].map((res, index) => (
                        <div className="signals" key={index}>
                            <Plot
                                data={[
                                    {
                                        x: [...Array(2400).keys()],
                                        y: result.data[index],
                                        marker: {color: res === 0 ? '' : 'red'}
                                    }
                                ]}
                                layout={{height: 300, width: 1300, title: 'The ' + (index + 1) + (index === 0 ? 'st' : (index === 1) ? 'nd' : (index === 2) ? 'rd' : 'th') + ' signal'}}
                            />
                            <div className={"afib_classification" + (res === 0 ? '' : '_af')}>{res === 0 ? 'Non-AF' : 'AF'}<br/>{'Confidence: ' + Math.abs(result['pred_prob'][index].toFixed(2))}</div>
                        </div>
                    ))

            }
        </div>
    )


    return (
        <>
            <div className='pub_content'>
                <div className="afib_title" hidden={result === -1 ? false : true}>
                    Drag and drop your .csv file to the box below ⬇️
                    <br />
                    <div style={{fontSize: '13px'}}>(Please only include no more than 10 records, each containing 30s of signals. <a href='https://darren-blog-bucket.s3.us-east-1.amazonaws.com/example.csv'>See this example file</a>)</div>
                    
                </div>

                <div {...getRootProps({ className: uploaded ? 'drop-zone-uploaded' : 'drop-zone' })}>
                    <input {...getInputProps()} />
                    <PlusCircleOutlined />
                </div>

                {
                    fileList.map((file, index) => (
                        <div className="uploaded_file" key={index}>
                            <div className='uploaded_file_name'>{file.name}</div>
                            <button className="remove_file_btn" onClick={handleRemove} id={index} key={index}>×</button>
                        </div>

                    ))
                }
                <div className="upload_buttons">
                    <Button variant='outlined' onClick={handleUpload} hidden={fileList.length === 0 ? true : false} style={upload_style}>{props.language === 'en' ? 'UPLOAD' : '上传'}</Button>
                    <Button variant='outlined' onClick={handleClear} color='error' hidden={fileList.length === 0 ? true : false} style={clear_style}>{props.language === 'en' ? 'CLEAR' : '清除'}</Button>
                </div>

                <div className="afib_results" hidden={!uploaded}>
                    {result['error'] === 0 ? resultDisplay : result['error']}
                    <button className='restart_btn' onClick={handleConfirm} hidden={!uploaded}>CONFIRM</button>
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

export default connect(mapStateToProps)(AFib)