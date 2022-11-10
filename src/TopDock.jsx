import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './CSS/main.css'
import { Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'


function TopDock(props) {

    const mediaMatch = window.matchMedia('(max-width: 396px)');
    const [matches, setMatches] = useState(mediaMatch.matches);

    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addEventListener("change", handler)
        return () => mediaMatch.removeEventListener("change", handler)
    })

    let location = useLocation()
    let user = location.state ? location.state.user : null
    if (user != null) {
        props.setUserInfo(user)
    }

    const tabStyle = {
        container: isSmaller => ({
            fontSize: isSmaller ? '12px' : '14px'
        })
    }
    
    return (
        <div className='top_dock'>
            <Nav fill variant="tabs" activeKey={props.curr_page} onSelect={props.handleSelect} style={{backgroundColor: 'white'}}>
                <Nav.Item>
                    <Nav.Link eventKey={1} href="/intro" style={tabStyle.container(matches)}>Intro</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={2} href="/publications"  style={tabStyle.container(matches)} disabled>Publications</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={3} href="/blogs" style={tabStyle.container(matches)}>Blogs</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={4} href="/music" style={tabStyle.container(matches)} disabled>Music</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={5} href="/arrange"  style={tabStyle.container(matches)} disabled={(props.login==0 || props.super_account==0)}>Events</Nav.Link>
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