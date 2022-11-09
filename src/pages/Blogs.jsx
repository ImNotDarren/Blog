import React, { useState, useEffect, useRef } from 'react'
import 'antd/dist/antd.css';
import '../CSS/page.css'
import { Button, Modal } from 'antd';
import BlogCard from '../BlogCard';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import store from '../store'


const server = store.getState().server
const url = server + '/getBlogs'

function Blogs() {

    const [blogs, setBlogs] = useState([{ bid: 1, title: '211', author: 1, publish_time: '', abst: '', content: '' }])
    const [winWidth, setWinWidth] = useState(document.querySelector('body').offsetWidth)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [loading, setLoading] = useState(false)

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
            console.log(e.target.innerWidth)
            console.log('here')
            if (e.target.innerWidth <= 560) {
                setWinWidth(e.target.innerWidth)
            } else {
                setWinWidth(1000)
            }
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [blogs, winWidth])

    const fabStyle = {
        display: winWidth <= 560 ? 'flex' : 'none',
        position: 'fixed',
        bottom: 65,
        right: 16,
        sizeMedium: false
    }

    const handleAdd = () => {
        setIsAddOpen(true)
    }

    const closeAdd = () => {
        setIsAddOpen(false)
    }

    const handleOk = () => {
        setIsAddOpen(false)
    }


    return (
        <>
            <div className="site-layout-content">
                <div className="blog">
                    {/* <div className="blog_card_title">Latest blog</div> */}
                    <div className="blog_card">
                        <BlogCard blogs={blogs} winWidth={winWidth} />
                    </div>
                </div>

                <Fab color="primary" onClick={handleAdd} aria-label="add" sx={fabStyle}>
                    <AddIcon />
                </Fab>

                <Modal
                    title="Basic Modal"
                    open={isAddOpen}
                    onOk={handleOk}
                    onCancel={closeAdd}
                    footer={[
                        <Button key="sbumit" type="primary" loading={loading} onClick={handleOk}/>
                    ]}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>

            </div>
        </>
    )
}

export default Blogs