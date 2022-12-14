import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom'
import 'github-markdown-css/github-markdown-light.css'

function BlogPage(props) {

    const location = useLocation()
    const { state } = location

    const [blog, setBlog] = useState({ bid: 1, title: 'Loading...', author: 1, publish_time: 'Loading...', abst: 'Loading...', content: 'Loading...' })
    const [content, setContent] = useState('loading...')


    useEffect(() => {
        fetch(props.server + '/getBlogById', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: state.bid
        })
            .then(res => res.json())
            .then((result) => {
                setBlog(result)
                import('/src/assets/mds/' + result.content)
                    .then((res) => {
                        fetch(res.default)
                            .then(res => res.text())
                            .then(res => setContent(res))
                    })
                    .catch(err => console.log(err))
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
