import React from 'react'
import './CSS/main.css'
import 'antd/dist/antd.css';
import { Breadcrumb, Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

function Copyright() {
    return (
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            <div>©2020 Created by Darren Liu</div>
            <a href="https://github.com/ImNotDarren/Blog" className='source_code'>Click here for the source code of this blog</a>
        </Footer>
    )
}

export default Copyright
