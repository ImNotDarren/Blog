import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import { connect } from 'react-redux';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import 'github-markdown-css/github-markdown-light.css'

function BlogPage(props) {

    const navigate = useNavigate()

    const location = useLocation()
    const { state } = location
    const [searchParams] = useSearchParams()
    const bid = searchParams.getAll('bid')[0]

    const [blog, setBlog] = useState({ bid: 1, title: 'Loading...', author: 1, publish_time: 'Loading...', abst: 'Loading...', content: 'Loading...' })
    const [content, setContent] = useState('loading...')

    const aws_s3_url = 'https://darren-blog-bucket.s3.us-east-1.amazonaws.com/'


    useEffect(() => {

        if (bid === undefined) {
            navigate(`/blogs`)
        }

        fetch(props.server + '/getBlogById', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: bid
        })
            .then(res => res.json())
            .then((result) => {
                if (result === null) {
                    navigate(`/blogs`)
                }
                setBlog(result)
                fetch(aws_s3_url + result.content)
                    .then(res => res.text())
                    .then((result) => {
                        setContent(result)
                    })
            })

    }, [])


    return (
        <div className='md'>
            <div className='markdown-body'>
                <ReactMarkdown children={content} />
            </div>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        uid: state.uid,
        language: state.language,
        server: state.server
    }
}

export default connect(mapStateToProps)(BlogPage)
