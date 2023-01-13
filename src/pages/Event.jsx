import React, { useEffect } from 'react'
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

function Event(props) {

  const navigate = useNavigate()

  useEffect(() => {
      if (props.uid !== 1) {
          navigate('/error')
      }
  })



  return (
    <Layout className="layout">
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <Content style={{ padding: '0, 50px' }}>
          <div className="site-layout-content">Event</div>
        </Content>
      </Content>

    </Layout>
  )
}

const mapStateToProps = (state) => {
  return {
    uid: state.uid
  }
}

export default connect(mapStateToProps)(Event)