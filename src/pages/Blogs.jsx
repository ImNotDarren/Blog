import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import '../CSS/page.css'
import { Button, Modal, Input, Form, message, List, Avatar, Skeleton, Divider } from 'antd';
import BlogCard from '../BlogCard';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import { useTheme } from '@mui/material/styles';
import store from '../store'
import darren_avatar from '../assets/avatars/darren_avatar.jpg'

const { TextArea, Search } = Input;


const server = store.getState().server
const url = server + '/getBlogs'

function Blogs() {

    const loadingBlog = [{ bid: 1, title: 'Loading...', author: 1, publish_time: 'Loading...', abst: 'Loading...', content: 'Loading...' }]
    const [savedBlogs, setSavedBlogs] = useState([])
    const [blogs, setBlogs] = useState(loadingBlog)
    const [winWidth, setWinWidth] = useState(document.querySelector('body').offsetWidth)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [addIn, setAddIn] = useState(true)
    const [btnSize, setBtnSize] = useState(winWidth <= 700 ? 'medium' : 'large')
    const [currBlogs, setCurrBlogs] = useState(loadingBlog)

    const [title, setTitle] = useState('')
    const [abstract, setAbstract] = useState('')
    const [content, setContent] = useState('')

    const [initLoading, setInitLoading] = useState(true);
    const [blogLoading, setBlogLoading] = useState(true);

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
                    result.sort((a, b) => {
                        return new Date(b.publish_time) - new Date(a.publish_time)
                    })
                    setBlogs(result)
                    if (result.length <= 6) {
                        setCurrBlogs(result)
                    } else {
                        setCurrBlogs(result.slice(0, 6))
                        setSavedBlogs(result.slice(6))
                    }
                    setInitLoading(false)
                    setBlogLoading(false)
                }
            })
    }, [])



    useEffect(() => {

        const handleResize = e => {
            if (e.target.innerWidth <= 560) {
                setWinWidth(560)
            } else if (e.target.innerWidth <= 700) {
                setWinWidth(700)
                setBtnSize('medium')
            } else if (e.target.innerWidth < 1000) {
                setWinWidth(999)
            } else {
                setWinWidth(1000)
                setBtnSize('large')
            }
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [winWidth])

    const fabStyle = {
        display: (winWidth <= 560) ? 'flex' : 'none',
        position: 'fixed',
        bottom: 65,
        right: 16,
        sizeMedium: false
    }

    const writeBlogBtnStyle = {
        display: (winWidth <= 560) ? 'none' : 'block',
        marginTop: (winWidth <= 560) ? '20px' : '0px',
    }

    const searchStyle = {
        display: (blogs.length == 1 ? 'none' : 'block'),
        width: '100%',
        marginRight: (winWidth <= 560) ? '0px' : '10px'
    }

    const listStyle = {
        display: (blogs.length == 1 ? 'none' : 'block'),
        marginTop: '15px'
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

    const onSearch = () => {
        // handle search blogs
    }

    const writeBlog = () => {
        if (uid != 1) {
            message.error('Writing blogs is only available to Darren for now')
        } else {
            // TODO: relocate to write blog page
        }

    }

    const onLoadMore = () => {

        let newCurrBlogs = null

        if (savedBlogs.length == 0) {
            
        } else if (savedBlogs.length <= 5) {
            setCurrBlogs(currBlogs.concat(savedBlogs))
            setSavedBlogs([])
        } else {
            setCurrBlogs(currBlogs.concat(savedBlogs.slice(0, 5)))
            setSavedBlogs(savedBlogs.slice(5))
        }
        
    }

    const loadMore =
        !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Divider orientation="center" plain style={{display: savedBlogs.length == 0 ? 'none' : 'block'}}>
                    <Button type="link" onClick={onLoadMore} style={{ color: 'rgb(120, 120, 120)' }}>loading more</Button>
                </Divider>

            </div>
        ) : null;





    return (
        <>
            <div className="site-layout-content">
                <div className="blog">
                    {/* <div className="blog_card_title">Latest blog</div> */}
                    <div className="blog_card">
                        <BlogCard blogs={blogs} winWidth={winWidth} />
                    </div>

                    <div className="blog_right">
                        <div className="blog_btns">
                            <Search placeholder="Search for blogs" onSearch={onSearch} size={btnSize} style={searchStyle} />
                            <Button type="primary" size={btnSize} onClick={writeBlog} block style={writeBlogBtnStyle}>Write a blog</Button>
                        </div>

                        <List
                            className="demo-loadmore-list"
                            loading={initLoading}
                            itemLayout="horizontal"
                            dataSource={currBlogs.slice(1)}
                            loadMore={loadMore}
                            renderItem={item => (
                                <List.Item
                                    actions={[<a key="list-loadmore-edit">{uid == 1 ? 'edit' : 'like'}</a>, <a key="list-loadmore-more">more</a>]}
                                >
                                    <Skeleton avatar title={false} loading={false} active>
                                        <List.Item.Meta
                                            avatar={<Avatar src={darren_avatar} />}
                                            title={item.title}
                                            description={item.abst.slice(0, winWidth < 1000 ? 56 : 100) + ' ...'}
                                            style={{ textAlign: 'left' }}
                                        />
                                    </Skeleton>
                                </List.Item>
                            )}

                            style={listStyle}
                        />

                    </div>
                </div>






                {/* --- for mobile devices only --- */}
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