import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { PlusCircleOutlined } from '@ant-design/icons'
import { message } from 'antd'
import { connect } from 'react-redux';

import Button from '@mui/material/Button';

import { uploadFile } from 'react-s3'

window.Buffer = window.Buffer || require("buffer").Buffer;

function AFib(props) {

    const [fileList, setFileList] = useState([])

    const [uploaded, setUploaded] = useState(false)

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

    }, [winWidth])

    const { getRootProps, getInputProps } = useDropzone({
        getFilesFromEvent: event => FileGetter(event)
    })

    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
        s3Url: process.env.REACT_APP_S3_URL
    }

    const handleUpload = () => {
        if (fileList.length === 0) {
            console.log('no file')
        } else {
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i]
                uploadFile(file, config)
                    .then(data => {
                        setFileList([])
                        setUploaded(true)
                        message.success('Successfully uploaded!')
                    })
                    .catch(err => {
                        console.error(err)
                        message.error('Unsupported file!')
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


    return (
        <>
            <div className='pub_content'>
                <div className="test">This is a test page.</div>
                <div className="test">Drag and drop your files to the box below ⬇️</div>

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
                    Your results will be displayed here
                    <button className='restart_btn' onClick={handleConfirm} hidden={!uploaded}>CONFIRM</button>
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

export default connect(mapStateToProps)(AFib)