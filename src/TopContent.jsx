import React, { useState } from 'react'
import './CSS/main.css'
import { useNavigate } from 'react-router-dom'
import get_prev_page from './GetCurrPage'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


import { connect } from 'react-redux';
import { Alert, AlertTitle, Dialog } from '@mui/material';

function TopContent(props) {

    const [openAlert, setOpenAlert] = useState(false)

    const navigate = useNavigate()

    const login = () => {
        navigate('/login')
    }

    let menu_display = 'none'
    let login_display = 'block'
    let user_display = 'none'

    if (props.login == 1 && props.super_account == 1) {
        menu_display = 'block'
    }

    if (props.login == 1) {
        login_display = 'none'
        user_display = 'block'
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfile = () => {
        setAnchorEl(null)
        setOpenAlert(true)
        setTimeout(() => {
            setOpenAlert(false)
        }, 2200)

    }

    const handleSettings = () => {
        setAnchorEl(null)
        setOpenAlert(true)
        setTimeout(() => {
            setOpenAlert(false)
        }, 2200)

    }

    const handleClose = () => {
        setAnchorEl(null)
    };

    const manuallyClose = () => {
        setAnchorEl(null)
        setOpenAlert(false)
    }

    const handleAuth = () => {
        window.location.href = "https://www.imnotdddarren.com"
    }

    let blog_title = "Darren's Blog"

    const logout = () => {
        setAnchorEl(null)
        props.handleLogout()
        navigate(get_prev_page(props.curr_page))
        window.location.reload()

    }

    const language = () => {
        props.handleLanguage()
    }


    return (
        <div style={{ position: 'fixed', width: '100%', top: '0px', zIndex: '5' }}>
            {/* <div className='top_content'>Darren Liu's Blog</div> */}

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ height: '62px', background: 'linear-gradient(to right, rgb(0, 85, 255), rgb(0, 153, 255))' }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            style={{ display: menu_display }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <div style={{ fontSize: '18px', color: 'white', width: '120px' }}>{blog_title}</div>
                        </Typography>

                        <Button onClick={()=>window.scrollTo(0, 0)} sx={{ width: '100%' }}></Button>

                        <Button variant="outlined" onClick={language} style={{backgroundColor: 'white', marginRight: '20px'}}>{props.language == 'en' ? 'En' : '中'}</Button>

                        <Button color="inherit" onClick={login} style={{ display: login_display }}>{props.language == 'en' ? 'Login' : '登陆'}</Button>
                        <Button color="inherit" style={{ display: user_display }} onClick={handleClick}>{props.username}</Button>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleProfile}>
                                <Avatar /> My Account
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleSettings}>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={logout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </Box>
            <Dialog open={openAlert}>
                <Alert
                    onClose={manuallyClose}
                    sx={{
                        width: '500px'
                    }}
                    severity="error"
                >
                    <AlertTitle>Error</AlertTitle>
                    Still working on this section...
                </Alert>
            </Dialog>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        login: state.login,
        super_account: state.super_account,
        curr_page: state.curr_page,
        language: state.language
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogout() {
            const action = {
                type: "logOut"
            }
            dispatch(action)
        },

        handleLanguage() {
            const action = {
                type: "language"
            }
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopContent)
