import React, { useState, useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import 'antd/dist/antd.css'
import dream from '../assets/album_covers/dream.jpeg'

function Music() {

    const location = useLocation()
    const { state } = location
    const [searchParams] = useSearchParams()
    let mid = searchParams.getAll('mid')[0]

    if (mid === undefined) {
        mid = 0
    }

    const music_info = {
        0: {
            'head': 'Brand new single coming on March 31st, 2023!',
            'title': 'Dream',
            'art': dream,
            'cont': [
                'Performed by: Darren Liu',
                'Written by: Darren Liu',
                'Produced by: Darren Liu',
                'Backing Vocal Arranged by: Darren Liu',
                'Backing Vocal by: Darren Liu',
                'Recorded by: Yi Liu / Darren Liu',
                'Mixed by: Yi Liu at Silence Music',
                'Mastered by: Yi Liu at Silence Music'
            ]
        }
    }

    return (
        <>
            <div className="site-layout-content" style={{ display: 'block' }}>
                <div className="music_head">{music_info[mid]['head']}</div>
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