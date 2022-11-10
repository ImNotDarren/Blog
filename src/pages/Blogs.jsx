import React, { useState, useEffect, useRef } from 'react'
import 'antd/dist/antd.css';
import '../CSS/page.css'
import { Button, Modal, Input, Form } from 'antd';
import BlogCard from '../BlogCard';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import { useTheme } from '@mui/material/styles';
import store from '../store'

const { TextArea } = Input;


const server = store.getState().server
const url = server + '/getBlogs'

function Blogs() {


    const [blogs, setBlogs] = useState([{ bid: 1, title: 'Loading...', author: 1, publish_time: 'Loading...', abst: 'Loading...', content: 'Loading...' }])
    const [winWidth, setWinWidth] = useState(document.querySelector('body').offsetWidth)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [addIn, setAddIn] = useState(true)

    const [title, setTitle] = useState('')
    const [abstract, setAbstract] = useState('')
    const [content, setContent] = useState('')

    const uid = store.getState().uid

    const addBtnColor = 'primary'

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
        display: (winWidth <= 560) ? 'flex' : 'none',
        position: 'fixed',
        bottom: 65,
        right: 16,
        sizeMedium: false
    }

    const submitDisable = uid == 1 ? false : true

    const openAdd = () => {
        setIsAddOpen(true)
        setAddIn(false)
    }

    const closeAdd = () => {
        setAddIn(true)
        setIsAddOpen(false)
    }

    const handleOk = () => {

        if (title != '' && abstract) {

        }

        const author = uid
        const new_blog = { title, author, abst: abstract, content }
        // console.log(new_blog)
        fetch(server + '/addBlog', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_blog)
        }).then(
            setIsAddOpen(false),
            setAddIn(true)
        )

    }

    const titleChange = (e) => {
        // console.log(e.target.value)
        setTitle(e.target.value)
    }

    const abstractChange = (e) => {
        setAbstract(e.target.value)
    }

    const contentChange = (e) => {
        setContent(e.target.value)
    }

    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };


    return (
        <>
            <div className="site-layout-content">
                <div className="blog">
                    {/* <div className="blog_card_title">Latest blog</div> */}
                    <div className="blog_card">
                        <BlogCard blogs={blogs} winWidth={winWidth} />
                    </div>
                </div>

                <Zoom in={addIn} appear={true} timeout={transitionDuration}>
                    <Fab color={addBtnColor} onClick={openAdd} aria-label="add" sx={fabStyle}>
                        <AddIcon />
                    </Fab>

                </Zoom>



                <Modal
                    title={uid == 1 ? "Publish Blog" : "Only available to Darren ;)"}
                    open={isAddOpen}
                    onOk={handleOk}
                    onCancel={closeAdd}
                    footer={[
                        <Button key="cancel" loading={loading} onClick={closeAdd}>Cancel</Button>,
                        <Button key="sbumit" type="primary" loading={loading} onClick={handleOk} disabled={submitDisable}>Submit</Button>
                    ]}
                    sx={{ zIndex: 5 }}
                >
                    <Form size="middle" disabled={submitDisable}>
                        <Form.Item label="Title">
                            <Input key="title" placeholder="Input your title" onChange={titleChange} />
                        </Form.Item>
                        <Form.Item label="Abstract">
                            <TextArea rows={4} placeholder="Place your abstract..." onChange={abstractChange} maxLength={300} />
                        </Form.Item>
                        <Form.Item label="Content">
                            <TextArea rows={4} placeholder="Place your content..." onChange={contentChange} />
                        </Form.Item>
                    </Form>

                </Modal>

            </div>
        </>
    )
}

export default Blogs