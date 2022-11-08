import React, {useState, useEffect} from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import TopDock from './TopDock'
import './CSS/main.css'
import TopContent from './TopContent'
import store from './store'
import Copyright from './Copyright'

const server = store.getState().server
const url = server + '/getBlogs'

function Home() {

    const location = useLocation()

    const [connected, setConnected] = useState(false)

    const path = location.pathname

    useEffect(() => {
        fetch(url)
        .then((res) => {
            if (res.status == 200) {
                setConnected(true)
            }
        })
    })

    return (
        <div>
            {/* <TopContent login_state={login}/> */}

            <TopContent connected={connected}/>
            <div style={{position: 'fixed', top: '60px',height: '200', width: '100%', backgroundColor: 'white', color: 'white', zIndex: 4}}>123</div>
            <TopDock activeKey={path}/>
            <div style={{height: '120px', width: '100%', backgroundColor: 'white'}}></div>
            <Outlet />
            <Copyright />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default Home
