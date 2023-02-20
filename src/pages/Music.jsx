import React, { useState, useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import 'antd/dist/antd.css'

function Music() {

    const display_time = (time) => {
        let release_time = time.toString().split(' ')
        // return `${(music_info[mid]['release_time'][4].split(':')[0] === '00' ? '12' : music_info[mid]['release_time'][4].split(':')[0])}:${music_info[mid]['release_time'][4].split(':')[1]} ${(parseInt(music_info[mid]['release_time'][4].split(':')[0]) >= 12 ? 'PM' : 'AM')} on ${music_info[mid]['release_time'][1]}. ${music_info[mid]['release_time'][2]}, ${music_info[mid]['release_time'][3]}`
        let hour = parseInt(release_time[4].split(':')[0])
        hour = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour)

        let minute = release_time[4].split(':')[1]

        let month = release_time[1]
        let day = release_time[2]
        let year = release_time[3]

        let datetime = hour + ':' + minute + (parseInt(release_time[4].split(':')[0]) >= 12 ? 'PM' : 'AM') + ', ' + month + '. ' + day + ' ' + year
        return datetime
        
    }

    const location = useLocation()
    const { state } = location
    const [searchParams] = useSearchParams()
    let mid = searchParams.getAll('mid')[0]

    if (mid === undefined) {
        mid = 0
    }
    const today = new Date()

    const link_pair = {
        0: 'Spotify',
        1: 'Apple Music',
        2: 'QQMusic',
        3: 'Netease Music'
    }

    const music_info = {
        0: {
            'head': today < (new Date(Date.UTC(2023, 2, 30, 16, 0))) ? 'Brand new single coming' : 'Brand new single \"Dream\" now released!',
            'title': 'Dream',
            'art': 'https://darren-blog-bucket.s3.us-east-1.amazonaws.com/Dream.jpeg',
            'cont': [
                'Performed by: Darren Liu',
                'Written by: Darren Liu',
                'Produced by: Darren Liu',
                'Backing Vocal Arranged by: Darren Liu',
                'Backing Vocal by: Darren Liu',
                'Recorded by: Yi Liu / Darren Liu',
                'Mixed by: Yi Liu at Silence Music',
                'Mastered by: Yi Liu at Silence Music'
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
                <div className="music_head">{`
                    ${music_info[mid]['head']} ${(today < music_info[mid]['release_time'] ? ' at ' + display_time(music_info[mid]['release_time']) + '!' : '')}
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

export default Music