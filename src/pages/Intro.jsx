import React, { useState, useEffect } from 'react'
import '../CSS/page.css'
import 'antd/dist/antd.css';
import { Layout, Button, Modal, Popover, Avatar, Divider, Timeline } from 'antd';
import { GithubOutlined, LinkedinOutlined, InstagramOutlined, PlayCircleOutlined } from '@ant-design/icons';
import darren_avatar from '../assets/avatars/darren_avatar.jpg'
import murderer from '../assets/album_covers/murderer.jpg'
import van_goghs_dream from '../assets/album_covers/van_goghs_dream.jpg'
import original_song from '../assets/album_covers/original_song.jpg'
import well from '../assets/album_covers/well.jpg'
import darren from '../assets/album_covers/darren.jpg'

function Intro() {

    const [visibleBU, setVisibleBU] = useState(false)
    const [visibleSCU, setVisibleSCU] = useState(false)
    const [visibleMetis, setVisibleMetis] = useState(false)

    const mediaMatch = window.matchMedia('(max-width: 432px)');
    const [matches, setMatches] = useState(mediaMatch.matches);

    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addEventListener("resize", handler)
        return () => mediaMatch.removeEventListener("resize", handler)
    })

    const button_size = "smal"
    const music_button_size = "middle"
    const link_size = "middle"

    const text_btn_style = {
        container: isSmaller => ({
            marginLeft: '8px',
            color: 'rgb(106, 106, 106)',
            fontSize: isSmaller ? '12px' : '14px',
            fontWeight: isSmaller ? '500' : '600',
        })
    }

    const link_btn_style = {
        container: isSmaller => ({
            color: 'rgb(106, 106, 106)',
            fontSize: isSmaller ? '12px' : '14px',
            verticalAlign: 'middle'
        })

    }

    const darren_style = {
        container: isSmaller => ({
            marginLeft: '15px',
            marginRight: '15px',
            color: '#3069cb',
            fontSize: isSmaller ? '13px' : '15px',
            fontWeight: '600'
        })
        
    }

    const murderer_style = {
        container: isSmaller => ({
            marginLeft: '15px',
            color: 'rgb(40, 40, 40)',
            fontSize: isSmaller ? '13px' : '15px',
            fontWeight: '600'
        })

    }

    const van_goghs_dream_style = {
        container: isSmaller => ({
            marginLeft: '15px',
            color: 'rgb(226, 69, 134)',
            fontSize: isSmaller ? '13px' : '15px',
            fontWeight: '600'
        })

    }

    const original_song_style = {
        container: isSmaller => ({
            marginLeft: '15px',
            color: 'rgb(211, 198, 60)',
            fontSize: isSmaller ? '13px' : '15px',
            fontWeight: '600'
        })

    }

    const well_style = {
        container: isSmaller => ({
            marginLeft: '15px',
            color: 'rgb(255, 128, 43)',
            fontSize: isSmaller ? '13px' : '15px',
            fontWeight: '600'
        })

    }

    const avatar_style = {
        position: 'absolute'
    }

    const darren_content = (
        < a href = "" >
            <div className="intro_album_cover_div">
                <img className="intro_album_cover" src={darren} alt="" />
            </div>
            <div className='intro_album_name'>DARREN</div>
        </a >
    )

    const pending_ach = (
        <div className="achievement">
            Brand new album
            <Popover placement='top' content={darren_content} trigger="click">
                <Button type="dashed" size={music_button_size} style={darren_style.container(matches)}>DARREN</Button>
            </Popover>
            coming in 2024
        </div>
    )

    const murderer_content = (
        <a href="">
            <div className="intro_album_cover_div">
                <img className="intro_album_cover" src={murderer} alt="" />
            </div>
            <div className='intro_album_name'>Murderer</div>
        </a>
    )

    const van_goghs_dream_content = (
        <a href="">
            <div className="intro_album_cover_div">
                <img className="intro_album_cover" src={van_goghs_dream} alt="" />
            </div>
            <div className='intro_album_name'>Van Gogh's Dream</div>
        </a>
    )

    const original_song_content = (
        <a href="">
            <div className="intro_album_cover_div">
                <img className="intro_album_cover" src={original_song} alt="" />
            </div>
            <div className='intro_album_name'>Original Song</div>
        </a>
    )

    const well_content = (
        <a href="">
            <div className="intro_album_cover_div">
                <img className="intro_album_cover" src={well} alt="" />
            </div>
            <div className='intro_album_name'>We'll</div>
        </a>
    )

    const showBU = () => {
        setVisibleBU(true)
    }

    const showMetis = () => {
        setVisibleMetis(true)
    }

    const showSCU = () => {
        setVisibleSCU(true)
    }

    const showSM = () => {
        window.location.href = ''
    }

    const handleBUOk = () => {
        setVisibleBU(false)
    }

    const handleSCUOk = () => {
        setVisibleSCU(false)
    }

    const handleMetisOk = () => {
        setVisibleMetis(false)
    }

    const handleBUCancel = () => {
        setVisibleBU(false)
    }

    const handleSCUCancel = () => {
        setVisibleSCU(false)
    }

    const handleMetisCancel = () => {
        setVisibleMetis(false)
    }

    const goGithub = () => {
        window.location.href = 'https://github.com/ImNotDarren'
    }

    const goLinkedin = () => {
        window.location.href = 'https://www.linkedin.com/in/sizuo-liu-66890a222/'
    }

    const goIns = () => {
        window.location.href = 'https://www.instagram.com/imnotdddarren/'
    }

    const goAM = () => {
        window.location.href = 'https://music.apple.com/us/artist/darren-liu/1581649003'
    }

    const goSpotify = () => {
        window.location.href = 'https://open.spotify.com/artist/74G3wFnVBXmz4bhQZfZ3fN?si=-Xqy6F0aTKSVWSGj53WNlw'
    }

    const goQQMusic = () => {
        window.location.href = 'https://y.qq.com/n/ryqq/singer/000VPxvF2gjHr4'
    }




    return (
        <div>
            <div className="darren_avatar">
                <Avatar size={80} icon={<img src={darren_avatar} alt="" />} />
            </div>

            <div className="site-layout-content">
                <div className='left'>
                    <div className='name'>Darren (Sizuo) Liu</div>
                    <div className="email">darrenliu0701@gmail.com</div>
                    <div className="education">
                        Current student at
                        <Button type="dashed" size={button_size} onClick={showBU} style={text_btn_style.container(matches)}>Binghamton University</Button>
                    </div>

                    <Modal
                        title="Binghamton University"
                        open={visibleBU}
                        onOk={handleBUOk}
                        onCancel={handleBUCancel}
                    >
                        <div className='modal_par'>Major: <div className='info'>Computer Science</div></div>
                        <div className='modal_par'>Duration: <div className='info'>Aug. 2020 ~ Dec. 2022</div></div>
                        <div className='modal_par'>Degree: <div className='info'>Master's Degree</div></div>
                        <div className='modal_par'>Courses:</div>
                        <div className='course'>
                            <div>Programming for the Web (Node.JS)</div>
                            <div>Software Engineering</div>
                            <div>Object Oriented Programming (C++)</div>
                            <div>Database Systems (SQL, MySQL)</div>
                            <div>Intelligent Mobile Robotics (ROS + Reinforcement Learning)</div>
                            <div>...</div>
                        </div>
                    </Modal>

                    <div className="education">
                        Currently taking bootcamp at
                        <Button type="dashed" size={button_size} onClick={showMetis} style={text_btn_style.container(matches)}>Metis</Button>
                    </div>

                    <Modal
                        title="Metis Bootcamp"
                        open={visibleMetis}
                        onOk={handleMetisOk}
                        onCancel={handleMetisCancel}
                    >
                        <div className='modal_par'>Major: <div className='info'>Data Science and Machine Learning</div></div>
                        <div className='modal_par'>Duration: <div className='info'>Jul. 2022 ~ Jan. 2023</div></div>
                        <div className='modal_par'>Degree: <div className='info'>Associate Degree</div></div>
                        <div className='modal_par'>Courses:</div>
                        <div className='course'>
                            <div>Exploratory Data Analysis</div>
                            <div>Regression</div>
                            <div>Business</div>
                            <div>Classification</div>
                            <div>Unsupervised Learning / NLP</div>
                            <div style={{ color: 'lightgray' }}>------------ ongoing ------------</div>
                            <div style={{ color: 'lightgray' }}>Deep Learning</div>
                            <div style={{ color: 'lightgray' }}>Introduction to Data Engineering</div>
                        </div>
                    </Modal>

                    <div className="education">
                        Studied at
                        <Button type="dashed" size={button_size} onClick={showSCU} style={text_btn_style.container(matches)}>Sichuan University</Button>
                    </div>

                    <Modal
                        title="Sichuan University"
                        open={visibleSCU}
                        onOk={handleSCUOk}
                        onCancel={handleSCUCancel}
                    >
                        <div className='modal_par'>Major: <div className='info'>Software Engineering</div></div>
                        <div className='modal_par'>Duration: <div className='info'>Sep. 2017 ~ Jun. 2021</div></div>
                        <div className='modal_par'>Degree: <div className='info'>Bachelor's Degree</div></div>
                        <div className='modal_par'>Courses:</div>
                        <div className='course'>
                            <div>Database System (MySQL)</div>
                            <div>Software Design and Architecture</div>
                            <div>Software Requirements Analysis</div>
                            <div>Software Process and Management</div>
                            <div>Dimensionality Reduction and Visualization</div>
                            <div>AI Language Oriented Programming</div>
                            <div>Introduction to Artifitial Intelligence</div>
                            <div>Digital Logic: Application and Design</div>
                            <div>Digital Image Processing</div>
                            <div>Mini Program Development (WeChat mini-program)</div>
                            <div>...</div>
                        </div>
                    </Modal>

                    <div className="occupation">
                        Singer, Songwriter, Producer at
                        <Popover placement='top' content="No website so far" trigger="click">
                            <Button type="dashed" size={button_size} style={text_btn_style.container(matches)}>Silence Music</Button>
                        </Popover>
                    </div>

                    <Divider orientation="left" plain>
                        <div className="link_title">My Pages</div>
                    </Divider>

                    <div className="link_box_out">
                        <div className="link_box">
                            <div className="link_btn">
                                <Button type="secondary" onClick={goGithub} size={link_size} block icon={<GithubOutlined />} style={link_btn_style.container(matches)}>Github</Button>
                            </div>

                            <div className="link_btn">
                                <Button type="secondary" onClick={goIns} size={link_size} block icon={<InstagramOutlined />} style={link_btn_style.container(matches)}>Instagram</Button>
                            </div>
                            <div className="link_btn">
                                <Button type="secondary" onClick={goSpotify} size={link_size} block icon={<PlayCircleOutlined />} style={link_btn_style.container(matches)}>Spotify</Button>
                            </div>
                        </div>

                        <div className="link_box">
                            <div className="link_btn">
                                <Button type="secondary" onClick={goLinkedin} size={link_size} block icon={<LinkedinOutlined />} style={link_btn_style.container(matches)}>LinkedIn</Button>
                            </div>
                            <div className="link_btn">
                                <Button type="secondary" onClick={goAM} size={link_size} block icon={<PlayCircleOutlined />} style={link_btn_style.container(matches)}>Apple Music</Button>
                            </div>
                            <div className="link_btn">
                                <Button type="secondary" onClick={goQQMusic} size={link_size} block icon={<PlayCircleOutlined />} style={link_btn_style.container(matches)}>QQMusic</Button>
                            </div>
                        </div>
                    </div>


                </div>
                <div className='right'>

                    <Divider orientation="left" plain>
                        <div className="link_title">My Songs</div>
                    </Divider>

                    <div style={{ margin: '10px' }}>
                        <Timeline pending={pending_ach}>
                            <Timeline.Item>
                                <div className="achievement">
                                    2020.04.26 - First album:
                                    <Popover placement='top' content={murderer_content} trigger="click">
                                        <Button type="dashed" size={music_button_size} style={murderer_style.container(matches)}>Murderer</Button>
                                    </Popover>
                                </div>
                            </Timeline.Item>
                            <Timeline.Item>
                                <div className="achievement">
                                    2021.04.11 - Single:
                                    <Popover placement='top' content={van_goghs_dream_content} trigger="click">
                                        <Button type="dashed" size={music_button_size} style={van_goghs_dream_style.container(matches)}>Playboy</Button>
                                    </Popover>
                                </div>
                            </Timeline.Item>
                            <Timeline.Item>
                                <div className="achievement">
                                    2021.05.01 - Single:
                                    <Popover placement='top' content={original_song_content} trigger="click">
                                        <Button type="dashed" size={music_button_size} style={original_song_style.container(matches)}>Original Song</Button>
                                    </Popover>
                                </div>
                            </Timeline.Item>
                            <Timeline.Item>
                                <div className="achievement">
                                    2021.07.01 - Single:
                                    <Popover placement='top' content={van_goghs_dream_content} trigger="click">
                                        <Button type="dashed" size={music_button_size} style={van_goghs_dream_style.container(matches)}>22</Button>
                                    </Popover>
                                </div>
                            </Timeline.Item>
                            <Timeline.Item>
                                <div className="achievement">
                                    2021.08.14 - Single:
                                    <Popover placement='top' content={well_content} trigger="click">
                                        <Button type="dashed" size={music_button_size} style={well_style.container(matches)}>We'll</Button>
                                    </Popover>
                                </div>
                            </Timeline.Item>
                        </Timeline>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Intro