import React, { createElement, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import 'antd/dist/antd.css';
import { Avatar, Comment, Tooltip, message, Button, Input, Modal, Form } from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Snackbar, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'
import Zoom from '@mui/material/Zoom';
import { useTheme } from '@mui/material/styles';
import Fab from '@mui/material/Fab';

const { TextArea } = Input

function Comments(props) {

    const [winWidth, setWinWidth] = useState(document.querySelector('body').offsetWidth)
    const [commentSuccess, setCommentSuccess] = useState(false)
    const [addIn, setAddIn] = useState(true)
    const [loading, setLoading] = useState(false)

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [inputDisplay, setInputDisplay] = useState(false)

    const [isCommentOpen, setIsCommentOpen] = useState(false)

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);

    useEffect(() => {

        const handleResize = e => {
            if (e.target.innerWidth <= 560) {
                setWinWidth(560)
            } else if (e.target.innerWidth <= 700) {
                setWinWidth(700)
            } else if (e.target.innerWidth < 1000) {
                setWinWidth(999)
            } else {
                setWinWidth(1000)
            }
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [winWidth])

    useEffect(() => {
        fetch(props.server + '/getComments')
            .then(res => res.json())
            .then((result) => {
                setComments(result)
            })
    }, [])

    const openAdd = () => {
        setIsCommentOpen(true)
        setAddIn(false)

    }

    const fabStyle = {
        display: (winWidth <= 560) ? 'flex' : 'none',
        position: 'fixed',
        bottom: 65,
        right: 16,
        sizeMedium: false
    }

    const handleCommentOK = () => {

        if (comment !== '') {
            let uid = props.uid
            const new_comment = { uid, comment }
            fetch(props.server + '/addComment', {
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

    const closeComment = () => {
        setAddIn(true)
        setIsCommentOpen(false)
    }

    const commentChange = (e) => {
        setComment(e.target.value)
    }

    const like = () => {
        // setLikes(1);
        // setDislikes(0);
        // setAction('liked');
        message.error('Not Available Now')
    };

    const dislike = () => {
        // setLikes(0);
        // setDislikes(1);
        // setAction('disliked');
        message.error('Not Available Now')
    };

    const handleReplay = (e) => {
        console.log(e.currentTarget)
        message.error('Not Available Now')
    }

    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={like}>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                &nbsp;
                <span className="comment-action">{likes}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={dislike}>
                {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                &nbsp;
                <span className="comment-action">{dislikes}</span>
            </span>
        </Tooltip>,
        <span key="comment-basic-reply-to" onClick={handleReplay}>Reply to</span>,
    ];

    const handleSuccessClose = () => {
        setCommentSuccess(false)
    }

    const handleComment = () => {
        if (inputDisplay) {
            // submit comment
            if (comment !== '') {
                let uid = props.uid
                const new_comment = { uid, comment }
                fetch(props.server + '/addComment', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(new_comment)
                })
                    .then(() => {
                        setComment('')
                        setInputDisplay(false)
                        if (winWidth > 560) {
                            setCommentSuccess(true)
                            setTimeout(() => {
                                setCommentSuccess(false)
                            }, 2000)
                        } else {
                            message.success('Comment sent successfully!')
                        }
                    })
            } else {
                setInputDisplay(false)
            }
        } else {
            // show input
            setInputDisplay(true)
        }
    }

    const listenComment = (e) => {
        setComment(e.target.value)
    }

    

    return (
        <>
            <div className="comment_title">
                COMMENTS
            </div>
            <div className='comment_page'>
                <div className="comments">
                    {comments.map((comment) => (
                        <Comment
                            key={comment.cid}
                            actions={actions}
                            author={<a>{comment.username}</a>}
                            avatar={<Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}>{comment.username[0].toUpperCase()}</Avatar>}
                            content={
                                <p>
                                    {comment.comment}
                                </p>
                            }
                            datetime={
                                <Tooltip title="time">
                                    <span>{comment.datetime}</span>
                                </Tooltip>
                            }
                        />
                    ))}
                </div>
                <div className="write_comment">
                    <TextArea rows={5} value={comment} onChange={listenComment} allowClear style={{ marginTop: '30px', marginBottom: '10px', display: inputDisplay ? '' : 'none' }} />
                    <Button type="primary" onClick={handleComment} block>Leave a comment</Button>
                </div>
            </div>

            <Zoom in={addIn} appear={true} timeout={transitionDuration}>
                    <Fab color='secondary' onClick={openAdd} aria-label="add" sx={fabStyle}>
                        <EditIcon />
                    </Fab>
            </Zoom>


            <Snackbar open={commentSuccess} autoHideDuration={2000} onClose={handleSuccessClose}>
                <Alert onClose={handleSuccessClose} severity="success" sx={{ position: 'fixed', width: '300px', bottom: '80px' }}>
                    Comment sent successfully!
                </Alert>
            </Snackbar>

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
        </>



    );
}

const mapStateToProps = (state) => {
    return {
        server: state.server,
        curr_page: state.curr_page,
        login: state.login,
        super_account: state.super_account,
        uid: state.uid
    }
}

export default connect(mapStateToProps)(Comments)
