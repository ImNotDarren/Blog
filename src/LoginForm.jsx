import React from 'react'
import 'antd/dist/antd.css';
import { Form, Input, Button, Popover } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import store from './store'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import get_prev_page from './GetCurrPage';


function LoginForm(props) {
    
    const url = props.server + '/login'

    let prev_page = get_prev_page(props.curr_page)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        const username = e.Username
        const password = e.Password
        const user = {username, password}
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res=>res.json())
        .then((result)=>{
            if (result.uid === -1){
                alert('Wrong username or password!')
            }else{
                //页面跳转
                navigate(prev_page, {
                    state: {user: result}
                })
                window.location.reload()
            }
        })
    }

    return (
        <>
            <Form className="login-form" autoComplete='off' onFinish={handleSubmit}>
                <Form.Item
                    name="Username"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your username"
                        },
                        {
                            whitespace: true
                        },
                        {
                            min: 6
                        }
                    ]}
                    hasFeedback
                >
                    <Input
                        placeholder="Username"
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </Form.Item>

                <Form.Item
                    name="Password"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your password"
                        }
                    ]}
                >
                    <Input.Password
                        placeholder="Password"
                        prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType="submit" block>Login</Button>
                </Form.Item>
                
            </Form>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        server: state.server,
        curr_page: state.curr_page
    }
}


export default connect(mapStateToProps)(LoginForm)
