import React from 'react'
import './CSS/page.css'
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
            ©2020 Created by Darren Liu
        </Footer>
    )
}

export default Copyright
