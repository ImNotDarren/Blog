import React, { useState, useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import 'antd/dist/antd.css'

function Music() {

    const display_time = (release_time) => {
        // return `${(music_info[mid]['release_time'][4].split(':')[0] === '00' ? '12' : music_info[mid]['release_time'][4].split(':')[0])}:${music_info[mid]['release_time'][4].split(':')[1]} ${(parseInt(music_info[mid]['release_time'][4].split(':')[0]) >= 12 ? 'PM' : 'AM')} on ${music_info[mid]['release_time'][1]}. ${music_info[mid]['release_time'][2]}, ${music_info[mid]['release_time'][3]}`
        let hour = parseInt(release_time[4].split(':')[0])
        hour = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour)

        let minute = release_time[4].split(':')[1]

        let month = release_time[1]
        let day = release_time[2]
        let year = release_time[3]

        let datetime = hour + ':' + minute + (parseInt(release_time[4].split(':')[0]) >= 12 ? 'PM' : 'AM') + ' on ' + month + '. ' + day + ', ' + year
        return datetime
        
    }

    const location = useLocation()
    const { state } = location
    const [searchParams] = useSearchParams()
    let mid = searchParams.getAll('mid')[0]

    if (mid === undefined) {
        mid = 0
    }

    const music_info = {
        0: {
            'head': 'Brand new single coming',
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
            'release_time': (new Date(Date.UTC(2023, 2, 30, 16, 0))).toString().split(' ')
        }
    }

    return (
        <>
            <div className="site-layout-content" style={{ display: 'block' }}>
                <div className="music_head">{`
                    ${music_info[mid]['head']} at ${display_time(music_info[mid]['release_time'])}!
                `}</div>
                <div className="music_intro">
                    <img className="music_art" src={music_info[mid]['art']} alt="" />
                    <div className="music_info">
                        <div className="music_title">{music_info[mid]['title']}</div>
                        {music_info[mid]['cont'].map((value, key) => {
                            return (<div className="music_contributors" key={key}>{value}</div>)
                        })}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Music