import React, { useState, useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import 'antd/dist/antd.css'
import { connect } from 'react-redux';

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

    const music_info = {
        0: {
            'head': today < (new Date(Date.UTC(2023, 2, 30, 16, 0))) ? (props.language === 'en' ? 'Brand new single coming' : '全新单曲将于') : (props.language === 'en' ? 'Brand new single \"Dream\" now released!' : '全新单曲「Dream」现已发行！'),
            'title': 'Dream',
            'art': 'https://darren-blog-bucket.s3.us-east-1.amazonaws.com/Dream.jpeg',
            'cont': props.language === 'en' ? [
                'Darren Liu',
                'Written by: Darren Liu',
                'Produced by: Darren Liu',
                'Backing Vocal Arranged by: Darren Liu',
                'Backing Vocal by: Darren Liu',
                'Recorded by: Yi Liu / Darren Liu',
                'Mixed by: Yi Liu at Silence Music',
                'Mastered by: Yi Liu at Silence Music'
            ] : [
                '刘思佐',
                '词：刘思佐',
                '曲：刘思佐',
                '编曲：刘思佐',
                '制作人：刘思佐',
                '和声编写：刘思佐',
                '和声：刘思佐',
                '录音师：刘毅 / 刘思佐',
                '混音师：刘毅@Silence Music',
                '母带处理工程师：刘毅@Silence Music'
            ],
            'release_time': (new Date(Date.UTC(2023, 2, 30, 16, 0))),
            'links': ['', '', '', ''], // spotify, apple music, qq music, netease music
            'lyrics': `Holdin' you in the sunset
Singin' all the songs I wrote for you
Makin' out in the front seat (Front seat)
Closin' my eyes so I don't realize
Everything's in my dream
Wish I never left so you won't leave me
I don't know where you've been (Where you've been)
Fakin' it when you left me in the rain
(It's so real)
So appealin'
(So charmin')
I can't resist
(If only)
I won't lose it
But I don't see
Why did it feel so good (Feel so good)
Tearin' up the things you gave me
How can I deal with you (Deal with you)
I had everythin' when I'm
Holdin' you in the sunset
Singin' all the songs I wrote for you
Makin' out in the front seat (Front seat)
Closin' my eyes so I don't realize
Everything's in my dream (In my dream)
Wish I never left so you won't leave me
I don't know where you've been (Where you've been)
Fakin' it when you left me in the rain
Holdin' you in the sunset
Singin' all the songs I wrote for you
Makin' out in the front seat (Front seat)
Closin' my eyes so I don't realize
Everything's in my dream (In my dream)
Wish I never left so you won't leave me
I don't know where you've been (Where you've been)
Fakin' it when you left me in the rain
We'll be us again (Be us again)
When I show up at your door
We'll be holdin' hands (Be holdin' hands)
I won't wake up like before
(Be us again)
(Be holdin' hands)
            `
        }
    }

    return (
        <>
            <div className="site-layout-content" style={{ display: 'block' }}>
                <div className="music_head">{props.language === 'en' ? `
                    ${music_info[mid]['head']} ${(today < music_info[mid]['release_time'] ? ' at ' + display_time(music_info[mid]['release_time']) + '!' : '')}
                ` : `
                ${music_info[mid]['head']} ${(today < music_info[mid]['release_time'] ? display_time(music_info[mid]['release_time']) + '全网首发！' : '')}
                `}</div>
                <div className="music_intro">

                    <div className="music_art">
                        <img className="music_art_img" src={music_info[mid]['art']} alt="" />
                    </div>
                    <div className="music_info">
                        <div className="music_title">{music_info[mid]['title']}</div>

                        <div className="music_links" hidden={music_info[mid]['links'][0] === '' ? true : false}>
                            {music_info[mid]['links'].map((value, key) => {
                                return (
                                    <a className="music_link" key={key} href={value}>{link_pair[key]}</a>
                                )
                            })}
                        </div>

                        {music_info[mid]['cont'].map((value, key) => {
                            return (<div className="music_contributors" key={key}>{value}</div>)
                        })}

                        <div className="lyrics" hidden={today < music_info[mid]['release_time'] ? true : false}>
                            {music_info[mid]['lyrics']}
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