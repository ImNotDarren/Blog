import React, { useState, useEffect, useRef } from 'react'
import 'antd/dist/antd.css';
import '../CSS/page.css'
import { Layout, Card } from 'antd';
import BlogCard from '../BlogCard';
import store from '../store'

const { Content } = Layout;

const server = store.getState().server
const url = server + '/getBlogs'

function Blogs() {

    const [blogs, setBlogs] = useState([{ bid: 1, title: '211', author: 1, publish_time: '', abst: '', content: '' }])
    const [winWidth, setWinWidth] = useState(1000)

    useEffect(() => {

        fetch(url)
            .then(res => res.json())
            .then((result) => {
                if (result[0].bid === -1) {
                    // deal with no blog problem
                } else {
                    // sort by time
                    setBlogs(result)
                }
            })

        const handleResize = e => {
            // console.log(e.target.innerWidth)
            if (e.target.innerWidth <= 400){
                setWinWidth(400)
            }else{
                setWinWidth(1000)
            }
        }

        window.addEventListener('resize', handleResize)
    }, [blogs, winWidth])


    return (
        <>
            <div className="site-layout-content">
                <div className="blog">
                    {/* <div className="blog_card_title">Latest blog</div> */}
                    <div className="blog_card">
                        <BlogCard blogs={blogs} winWidth={winWidth}/>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Blogs