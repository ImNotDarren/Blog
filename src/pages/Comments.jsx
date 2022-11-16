import React, { createElement, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import 'antd/dist/antd.css';
import { Avatar, Comment, Tooltip, message, Button, Input } from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Snackbar, Alert } from '@mui/material';

const { TextArea } = Input

function Comments(props) {

    const [winWidth, setWinWidth] = useState(document.querySelector('body').offsetWidth)
    const [commentSuccess, setCommentSuccess] = useState(false)

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [inputDisplay, setInputDisplay] = useState(false)

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

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);

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
            if (comment != '') {
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
                    }else{
                        message.success('Comment sent successfully!')
                    }
                })
            }
        } else {
            // show input
            setInputDisplay(true)
        }
    }

    const listenComment = (e) => {
        setComment(e.target.value)
        if (e.target.value == '') {
            setTimeout(() => {
                setInputDisplay(false)
            }, 8000)
        }
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
                    <Button type="primary" block onClick={handleComment}>Leave a comment</Button>
                </div>
            </div>


            <Snackbar open={commentSuccess} autoHideDuration={2000} onClose={handleSuccessClose}>
                    <Alert onClose={handleSuccessClose} severity="success" sx={{ position: 'fixed', width: '300px', bottom: '80px' }}>
                        Comment sent successfully!
                    </Alert>
                </Snackbar>
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
