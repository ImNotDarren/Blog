import React, { useState, useEffect } from 'react'

import Button from '@mui/material/Button';

import S3 from 'react-aws-s3'

window.Buffer = window.Buffer || require("buffer").Buffer;

function AFib() {

    const Upload = () => {
        console.log('upload')
    }

    const config = {
        bucketName: 'darren-blog-bucket',
        region: 'us-east-1',
        accessKeyId: 'AKIAZYNITI4UVWI4XVJK',
        secretAccessKey: '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'
    }

    const handleUpload = async (file) => {
        console.log(file)
        const ReactS3Client = new S3(config)
        ReactS3Client.uploadFile(file, file.name)
        .then(data => console.log(data.location))
        .catch(err => console.error(err))
    }

    return (
        <>
            <div className='pub_content'>
                <div className="test">This is a test page.</div>
                <div className="test">Buttons below might mess up with your system.</div>
                <form onSubmit={Upload}>
                    <Button variant="outlined" component="label">
                        Upload
                        <input hidden multiple type="file" onChange={handleUpload}/>
                    </Button>
                    <Button variant='outlined' type='submit'>SUBMIT</Button>
                </form>

            </div>
        </>
    )
}

export default AFib