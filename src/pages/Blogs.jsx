import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import '../CSS/page.css'
import { Button, Modal, Input, Form, message, List, Avatar, Skeleton, Divider } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import BlogCard from '../BlogCard';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton';
import Zoom from '@mui/material/Zoom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@mui/material/styles';
import { Snackbar, Alert } from '@mui/material';
import store from '../store'
import darren_avatar from '../assets/avatars/darren_avatar.jpg'
import { useNavigate } from 'react-router-dom';
import { uploadFile } from 'react-s3'
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone'

const { TextArea, Search } = Input;


const server = store.getState().server
const url1 = server + '/getBlogs'
const url2 = server + '/getAllLikes'

function Blogs(props) {

    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
        s3Url: process.env.REACT_APP_S3_URL
    }

    const loadingBlog = [{ bid: 1, title: 'Loading...', author: 1, publish_time: 'Loading...', abst: 'Loading...', content: 'Loading...' }]
    const [savedBlogs, setSavedBlogs] = useState([])
    const [blogs, setBlogs] = useState(loadingBlog)
    const [winWidth, setWinWidth] = useState(document.querySelector('body').offsetWidth)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [addIn, setAddIn] = useState(true)
    const [btnSize, setBtnSize] = useState(winWidth <= 700 ? 'medium' : 'large')
    const [currBlogs, setCurrBlogs] = useState(loadingBlog)
    const [likes, setLikes] = useState([])
    const [likeBtn, setLikeBtn] = useState('like')
    const [leaveCommentText, setLeaveCommentText] = useState('Leave a comment for this website')
    const [commentSuccess, setCommentSuccess] = useState(false)

    const [title, setTitle] = useState('')
    const [abstract, setAbstract] = useState('')
    const [content, setContent] = useState('')
    const [comment, setComment] = useState('')

    const [initLoading, setInitLoading] = useState(true);
    const [blogLoading, setBlogLoading] = useState(true);

    const [likeLoading, setLikeLoading] = useState(false)

    const [fileList, setFileList] = useState([])

    const handleUpload = () => {
        if (fileList.length === 0) {
            console.log('no file')
        } else {
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i]
                uploadFile(file, config)
                    .then(data => {
                        setFileList([])
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
        const files = []
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

    const upload_style = {
        marginTop: '10px',
        width: winWidth <= 700 ? '100%' : '100px'
    }

    const clear_style = {
        marginTop: '10px',
        marginLeft: '10px',
        width: winWidth <= 700 ? '100%' : '100px'
    }

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        getFilesFromEvent: event => FileGetter(event)
    })

    const uid = store.getState().uid

    const addBtnColor = uid == 1 ? 'primary' : 'secondary'

    const navigate = useNavigate()

    useEffect(() => {
        fetch(url1)
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


        fetch(url2, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: uid
        })
            .then(res => res.json())
            .then((result) => {
                setLikes(result)
            })
    }, [])



    useEffect(() => {

        const handleResize = e => {
            if (e.target.innerWidth <= 560) {
                setWinWidth(560)
            } else if (e.target.innerWidth <= 700) {
                setWinWidth(700)
                setBtnSize('medium')
                setLeaveCommentText('Leave a comment')
            } else if (e.target.innerWidth < 1000) {
                setWinWidth(999)
                setLeaveCommentText('Leave a comment for this website')
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
        display: 'block',
        width: '100%',
        marginRight: (winWidth <= 560) ? '0px' : '10px'
    }

    const listStyle = {
        display: (blogs.length == 1 ? 'none' : 'block'),
        marginTop: '15px'
    }

    const openAdd = () => {
        if (uid == 1) {
            setIsAddOpen(true)
            setAddIn(false)
        } else {
            setIsCommentOpen(true)
            setAddIn(false)
        }

    }

    const closeAdd = () => {
        setAddIn(true)
        setIsAddOpen(false)
    }

    const closeComment = () => {
        setAddIn(true)
        setIsCommentOpen(false)
    }

    const handleOk = () => {

        if (title != '' && abstract != '') {
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



    }

    const handleCommentOK = () => {

        if (comment != '') {
            const new_comment = { uid, comment }
            fetch(server + '/addComment', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(new_comment)
            }).then(() => {
                setIsCommentOpen(false)
                setAddIn(true)
                if (winWidth > 560) {
                    setCommentSuccess(true)
                    setTimeout(() => {
                        setCommentSuccess(false)
                    }, 2000)
                } else {
                    message.success('Comment sent successfully!')
                }

            })
        }

    }

    const handleSuccessClose = () => {
        setCommentSuccess(false)
    }

    const handleLike = (e) => {
        if (likeLoading == true) {
            message.error('Clicking too fast!')
        } else {
            setLikeLoading(true)
            let bid = parseInt(e.currentTarget.id)
            let likes_copy = JSON.parse(JSON.stringify(likes))
            let currBlogs_copy = JSON.parse(JSON.stringify(currBlogs))
            if (uid == -1) {
                message.error('Please login first!')
                setLikeLoading(false)
            } else {
                if (likes.length == 0 || likes.indexOf(bid) == -1) {
                    setLikes(likes_copy.concat(bid))
                    for (let i = 0; i < currBlogs.length; i++) {
                        if (currBlogs[i].bid == e.currentTarget.id) {
                            currBlogs_copy[i].likes++
                            setCurrBlogs(currBlogs_copy)
                            break
                        }
                    }
                    // add likes
                    fetch(server + '/likeBlog', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ "bid": e.currentTarget.id, "uid": uid })
                    }).then(() => {
                        setLikeLoading(false)
                    })
                } else {
                    const bindex = likes.indexOf(bid)
                    likes_copy.splice(bindex, 1)
                    setLikes(likes_copy)
                    for (let i = 0; i < currBlogs.length; i++) {
                        if (currBlogs[i].bid == e.currentTarget.id) {
                            currBlogs_copy[i].likes--
                            setCurrBlogs(currBlogs_copy)
                            break
                        }
                    }
                    // remove likes
                    fetch(server + '/unlikeBlog', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ "bid": e.currentTarget.id, "uid": uid })
                    }).then(() => {
                        setLikeLoading(false)
                    })
                }
            }
        }

    }

    const handleMore = (e) => {
        navigate('/blogpage', {
            state: { bid: e.currentTarget.id }
        })
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

    const commentChange = (e) => {
        setComment(e.target.value)
    }

    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const onSearch = () => {
        // handle search blogs
    }

    const [writeBlogOpen, setWriteBlogOpen] = useState(true)

    const writeBlog = () => {
        if (uid != 1) {
            openAdd()
        } else {
            // TODO: relocate to write blog page
            if (writeBlogOpen === true) {
                setWriteBlogOpen(false)
            } else {
                setWriteBlogOpen(true)
            }
            
        }
    }

    const onLoadMore = () => {

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
                <Divider orientation="center" plain style={{ display: savedBlogs.length == 0 ? 'none' : 'block' }}>
                    <Button type="link" onClick={onLoadMore} style={{ color: 'rgb(120, 120, 120)' }}>loading more</Button>
                </Divider>

            </div>
        ) : null;



    return (
        <>
            <div {...getRootProps({ className: 'drop-zone' + (writeBlogOpen ? '-close' : ''), style: {marginLeft: '20px', marginRight: '20px'} })}>
                <input {...getInputProps()} />
                <PlusCircleOutlined />
            </div>

            {
                fileList.map(file => (
                    <div className='uploaded_file' key={file.name}>{file.name}</div>
                ))
            }
            <div className="upload_buttons">
                <Button variant='outlined' onClick={handleUpload} hidden={fileList.length === 0 ? true : false} style={upload_style}>{props.language === 'en' ? 'UPLOAD' : '上传'}</Button>
                <Button variant='outlined' onClick={handleClear} color='error' hidden={fileList.length === 0 ? true : false} style={clear_style}>{props.language === 'en' ? 'CLEAR' : '清除'}</Button>
            </div>
            <div className="site-layout-content">
                <div className="blog">
                    {/* <div className="blog_card_title">Latest blog</div> */}
                    <div className="blog_card">
                        <BlogCard blogs={blogs} winWidth={winWidth} liked={likes.indexOf(blogs[0].bid) == -1 ? false : true} />
                    </div>


                    <div className="blog_right">
                        <div className="blog_btns">
                            <Search placeholder="Search for blogs" onSearch={onSearch} size={btnSize} style={searchStyle} disabled={blogs.length > 5 ? false : true} />
                            <Button type="primary" size={btnSize} onClick={writeBlog} block style={writeBlogBtnStyle}>{uid == 1 ? (writeBlogOpen ? "Write a blog" : "Close section") : "Leave a comment"}</Button>
                        </div>

                        <List
                            className="demo-loadmore-list"
                            loading={initLoading}
                            itemLayout="horizontal"
                            dataSource={currBlogs.slice(1)}
                            loadMore={loadMore}
                            renderItem={item => (
                                <List.Item
                                    actions={[
                                        <IconButton aria-label="favorites" id={item.bid} onClick={handleLike} style={{ fontSize: 'large', color: (likes.indexOf(item.bid).toString() == '-1' || uid == '1') ? '' : 'rgb(255, 103, 103)' }}>
                                            <FavoriteIcon id={item.bid} />
                                            &nbsp;{item.likes}
                                        </IconButton>]}
                                >
                                    <Skeleton avatar title={false} loading={false} active>
                                        <List.Item.Meta
                                            id={item.bid}
                                            avatar={<Avatar src={darren_avatar} />}
                                            title={item.title}
                                            description={item.abst}
                                            style={{ textAlign: 'left' }}
                                            onClick={handleMore}
                                        />
                                    </Skeleton>
                                </List.Item>
                            )}

                            style={listStyle}
                        />

                    </div>
                </div>


                <Snackbar open={commentSuccess} autoHideDuration={2000} onClose={handleSuccessClose}>
                    <Alert onClose={handleSuccessClose} severity="success" sx={{ position: 'fixed', width: '300px', bottom: '80px' }}>
                        Comment sent successfully!
                    </Alert>
                </Snackbar>


                {/* --- for mobile devices only --- */}
                <Zoom in={addIn} appear={true} timeout={transitionDuration}>
                    <Fab color={addBtnColor} onClick={openAdd} aria-label="add" sx={fabStyle}>
                        {uid == 1 ? <AddIcon /> : <EditIcon />}
                    </Fab>
                </Zoom>

                <Modal
                    title="Publish Blog"
                    open={isAddOpen}
                    onOk={handleOk}
                    onCancel={closeAdd}
                    footer={[
                        <Button key="cancel" loading={loading} onClick={closeAdd}>Cancel</Button>,
                        <Button key="sbumit" type="primary" loading={loading} onClick={handleOk}>Submit</Button>
                    ]}
                    sx={{ zIndex: 5 }}
                >
                    <Form size="middle">
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

                <Modal
                    title="Leave a comment for this website!"
                    open={isCommentOpen}
                    onOk={handleCommentOK}
                    onCancel={closeComment}
                    footer={[
                        <Button key="cancel" loading={loading} onClick={closeComment}>Cancel</Button>,
                        <Button key="sbumit" type="primary" loading={loading} onClick={handleCommentOK}>Submit</Button>
                    ]}
                    sx={{ zIndex: 5 }}
                >
                    <Form size="middle">
                        <Form.Item label="Comment">
                            <TextArea rows={4} placeholder="Place your comment..." onChange={commentChange} />
                        </Form.Item>
                    </Form>

                </Modal>

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

export default connect(mapStateToProps)(Blogs)