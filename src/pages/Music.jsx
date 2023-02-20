import React, { useState, useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import 'antd/dist/antd.css'
import { connect } from 'react-redux';
import getMusic from '../musicList'

function Music(props) {

    const display_time = (time) => {
        let release_time = time.toString().split(' ')

        const month_zh = {
            'Jan': '01',
            'Feb': '02',
            'Mar': '03'
        }

        if (props.language === 'en') {
            let hour = parseInt(release_time[4].split(':')[0])
            hour = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour)

            let minute = release_time[4].split(':')[1]

            let month = release_time[1]
            let day = release_time[2]
            let year = release_time[3]

            let datetime = hour + ':' + minute + (parseInt(release_time[4].split(':')[0]) >= 12 ? 'PM' : 'AM') + ', ' + month + '. ' + day + ' ' + year
            return datetime
        } else {
            let hour = parseInt(release_time[4].split(':')[0])
            let minute = release_time[4].split(':')[1]
            let month = month_zh[release_time[1]]
            let day = release_time[2]
            let year = release_time[3]
            let datetime = year + '.' + month + '.' + day + ' ' + hour + ':' + minute
            return datetime
        }



    }

    const [searchParams] = useSearchParams()
    let mid = searchParams.getAll('mid')[0]

    if (mid === undefined) {
        mid = 0
    }
    const today = new Date()

    const link_pair = {
        0: 'Spotify',
        1: 'Apple Music',
        2: props.language === 'en' ? 'QQMusic' : 'QQ音乐',
        3: props.language === 'en' ? 'Netease Music' : '网易云音乐'
    }

    const music_info = getMusic(mid, today, props.language)

    return (
        <>
            <div className="site-layout-content" style={{ display: 'block' }}>
                <div className="music_head">{props.language === 'en' ? `
                    ${music_info['head']} ${(today < music_info['release_time'] ? ' at ' + display_time(music_info['release_time']) + '!' : '')}
                ` : `
                ${music_info['head']} ${(today < music_info['release_time'] ? display_time(music_info['release_time']) + '全网首发！' : '')}
                `}</div>
                <div className="music_intro">

                    <div className="music_art">
                        <img className="music_art_img" src={music_info['art']} alt="" />
                    </div>
                    <div className="music_info">
                        <div className="music_title">{music_info['title']}</div>

                        <div className="music_links" hidden={music_info['links'][0] === '' ? true : false}>
                            {music_info['links'].map((value, key) => {
                                return (
                                    <a className="music_link" key={key} href={value}>{link_pair[key]}</a>
                                )
                            })}
                        </div>

                        {music_info['cont'].map((value, key) => {
                            return (<div className="music_contributors" key={key}>{value}</div>)
                        })}

                        <div className="lyrics" hidden={today < music_info['release_time'] ? true : false}>
                            {today < music_info['release_time'] ? '' : music_info['lyrics']}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        uid: state.uid,
        language: state.language,
        server: state.server
    }
}

export default connect(mapStateToProps)(Music)