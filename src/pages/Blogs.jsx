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

    const [blogs, setBlogs] = useState([{ bid: 1, title: '211', author: 1, publish_time: '', abst: '', content: ''}])

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
    }, [blogs])

    return (
        <Layout className="layout">
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <Content style={{ padding: '0, 50px' }}>
                    <div className="site-layout-content">
                        <div className="blog">
                            {/* <div className="blog_card_title">Latest blog</div> */}
                            <div className="blog_card">
                                <BlogCard blogs={blogs} />
                            </div>
                        </div>


                    </div>
                </Content>
            </Content>

        </Layout>
    )
}

export default Blogs