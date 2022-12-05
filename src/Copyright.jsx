import React from 'react'
import './CSS/main.css'
import 'antd/dist/antd.css';
import { Breadcrumb, Layout, Menu } from 'antd';
import { connect } from 'react-redux';

const { Header, Content, Footer } = Layout;

function Copyright(props) {
    return (
        <div className='footer'>
            <div className='footer_title'>©2022 Created by Darren Liu</div>
            <a href="https://github.com/ImNotDarren/Blog" className='source_code'>{props.language == 'en' ? 'Click here for source code' : '单击此处获取网页源码'}</a>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        language: state.language
    }
}

export default connect(mapStateToProps)(Copyright)
