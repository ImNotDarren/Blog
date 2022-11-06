import React from 'react'
import 'antd/dist/antd.css';
import { Layout, Card } from 'antd';

const { Content } = Layout;

function Blogs() {
    return (
        <Layout className="layout">
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <Content style={{ padding: '0, 50px' }}>
                    <div className="site-layout-content">
                        <div className="site-card-border-less-wrapper">
                            <Card title="Card title" bordered={false} style={{ width: 300 }}>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                        </div>
                    </div>
                </Content>
            </Content>

        </Layout>
    )
}

export default Blogs