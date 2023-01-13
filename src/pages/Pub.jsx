import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { Card, Divider } from 'antd';
import { connect } from 'react-redux';

function Pub(props) {

    const [winWidth, setWinWidth] = useState(document.querySelector('body').offsetWidth)

    useEffect(() => {

        const handleResize = e => {
            if (e.target.innerWidth <= 560) {
                setWinWidth(560)
            } else if (e.target.innerWidth <= 700) {
                setWinWidth(700)
            } else if (e.target.innerWidth < 1000) {
                setWinWidth(999)
            } else {
                setWinWidth(1000)
            }
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [winWidth])


    const card_style = {
        width: (winWidth <= 700) ? '' : '300px',
        margin: '15px',
        // boxShadow: '5px 3px 3px rgb(183, 183, 183)',
        borderRadius: '10px'
    }

    return (
        <div className='pub_content'>
            <Divider orientation="left" plain>
                <div className="pub_link_title">{props.language === 'en' ? 'Machine Learning Models' : '机器学习模型'}</div>
            </Divider>
            <div className="ml_models">
                <Card title='AFib' style={card_style} extra={<a href='/publications/afib'>{props.language === 'en' ? 'More' : '详情'}</a>}>
                    <p>{props.language === 'en' ? 'This is an AF detection model.' : '这是一个AF检测模型'}</p>
                </Card>

                <Card title='CPP' style={card_style} extra={<a href='/publications/cpp'>{props.language === 'en' ? 'More' : '详情'}</a>}>
                    <p>{props.language === 'en' ? 'This is a used vehicle price detection model.' : '这是一个二手车价格预测模型'}</p>
                </Card>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        uid: state.uid,
        language: state.language
    }
}

export default connect(mapStateToProps)(Pub)