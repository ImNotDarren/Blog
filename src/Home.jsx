import React, { useState, useEffect } from 'react'
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

    const path = location.pathname

    return (
        <div>
            <TopContent />
            <div style={{ position: 'fixed', top: '60px', height: '20px', width: '100%', backgroundColor: 'white', color: 'white', zIndex: 4 }}></div>
            <TopDock activeKey={path} />
            <div style={{ height: '120px', width: '100%', backgroundColor: 'white' }}></div>
            <Outlet />
            <div className="footer_up"></div>
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
