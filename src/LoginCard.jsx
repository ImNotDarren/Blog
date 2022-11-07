import React from 'react'
import 'antd/dist/antd.css';
import { Card, Popover, Button } from 'antd'
import LoginForm from './LoginForm';

function SignupBtn(){
    return (
        <Popover placement='top' content="Sign up not available for now" trigger="click">
            <Button type='link'>Sign up</Button>
        </Popover>
    )
}

function LoginCard() {
    return (
      <>
          <Card className="login_card" title="Login" extra={<SignupBtn />}>
              <LoginForm />
          </Card>
      </>
    )
}

export default LoginCard
