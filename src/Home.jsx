import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import TopDock from './TopDock'
import './CSS/main.css'
import TopContent from './TopContent'
import store from './store'
import Copyright from './Copyright'

function Home() {

    const location = useLocation()

    const path = location.pathname

    return (
        <div>
            {/* <TopContent login_state={login}/> */}
            <TopContent />
            <TopDock activeKey={path}/>
            <Outlet/>
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
