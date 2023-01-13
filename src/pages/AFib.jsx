import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { PlusCircleOutlined } from '@ant-design/icons';

import Button from '@mui/material/Button';

import S3 from 'react-aws-s3'

window.Buffer = window.Buffer || require("buffer").Buffer;

function AFib() {

    const [fileList, setFileList] = useState([])

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        getFilesFromEvent: event => FileGetter(event)
    })

    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_ACCESS_KEY
    }


    const handleUpload = () => {
        const ReactS3Client = new S3(config)
        if (acceptedFiles.length === 0) {
            console.log('no file')
        } else {
            for (let i=0; i< acceptedFiles.length; i++) {
                const file = acceptedFiles[i]
                ReactS3Client.uploadFile(file, file.name)
                .then(data => console.log(data.location))
                .catch(err => console.error(err))
            }
        }
    }

    const FileGetter = event => {
        
        const files = []
        // Retrieves the files loaded by the drag event or the select event
        const fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files
        for (var i = 0; i < fileList.length; i++) {
            const file = fileList.item(i)
            // console.log(event.dataTransfer.files.item(0))
            // ReactS3Client.uploadFile(file, file.name)
            // .then(data => console.log(data.location))
            // .catch(err => console.error(err))
            files.push(file)
        }
        setFileList(files)
        // files returned from this fuction will be acceptedFiles
        return files
    }

    return (
        <>
            <div className='pub_content'>
                <div className="test">This is a test page.</div>
                <div className="test">Drag and drop your files to the box below ⬇️</div>

                {/* <Button variant="outlined" component="label">
                    Upload
                    <input hidden multiple type="file" onChange={handleUpload} />
                </Button> */}

                <div {...getRootProps({ className: 'drop-zone' })}>
                    <input {...getInputProps()}/>
                    <PlusCircleOutlined />
                </div>

                {
                    acceptedFiles.map(file => (
                        <div className='uploaded_file' key={file.name}>{file.name}</div>
                    ))
                }

                <Button variant='outlined' onClick={handleUpload} hidden={acceptedFiles.length === 0 ? true : false} style={{marginTop: '10px'}}>Upload</Button>

            </div>
        </>
    )
}

export default AFib