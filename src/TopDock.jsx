import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './CSS/main.css'
import { Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'


function TopDock(props) {

    let location = useLocation()
    let user = location.state ? location.state.user : null
    if (user != null) {
        props.setUserInfo(user)
    }

    let arrangements = 'Arrangements'

    if (props.login == 0) {
        arrangements += ' (Please Login)'
    }else{
        if (props.super_account == 0) {
            arrangements += ' (Not Available)'
        }
    }
    
    return (
        <div className='top_dock'>
            <Nav fill variant="tabs" activeKey={props.curr_page} onSelect={props.handleSelect}>
                <Nav.Item>
                    <Nav.Link eventKey={1} href="/intro" style={{fontSize: '20px'}}>Introduction</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={2} href="/publications"  style={{fontSize: '20px'}} disabled>Publications (Not Available)</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={3} href="/blogs" style={{fontSize: '20px'}}>Blogs</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={4} href="/music" style={{fontSize: '20px'}}>Music</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={5} href="/arrange"  style={{fontSize: '20px'}} disabled={(props.login==0 || props.super_account==0)}>{arrangements}</Nav.Link>
                </Nav.Item>
            </Nav>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        curr_page: state.curr_page,
        login: state.login,
        super_account: state.super_account
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSelect(key){
            const action = {
                type: "switchTab",
                value: key
            }
            dispatch(action)
        },

        setUserInfo(user){
            const action = {
                type: "userInfo",
                value: user
            }
            dispatch(action)
        }
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(TopDock)