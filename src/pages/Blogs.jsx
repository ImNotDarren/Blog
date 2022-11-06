import React from 'react'
import 'antd/dist/antd.css';
import { Layout } from 'antd';

const { Content } = Layout;

function Blogs() {
    return (
        <Layout className="layout">
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            <Content style={{padding: '0, 50px'}}>
                <div className="site-layout-content">Blogs</div>
            </Content>
        </Content>
      
    </Layout>
    )
}

export default Blogs