import React from 'react'
import './CSS/main.css'
import 'antd/dist/antd.css';
import { Breadcrumb, Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

function Copyright() {
    return (
        <div className='footer'>
            <div className='footer_title'>©2020 Created by Darren Liu</div>
            <a href="https://github.com/ImNotDarren/Blog" className='source_code'>Click here for source code</a>
        </div>
    )
}

export default Copyright
