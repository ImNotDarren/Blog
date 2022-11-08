import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Avatar, Dropdown, Menu, Space } from 'antd'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import darren_avatar from './assets/avatars/darren_avatar.jpg'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Alert, AlertTitle, Dialog } from '@mui/material';



function BlogCard(props) {


    const [openAlert, setOpenAlert] = useState(false)


    const menu_alert = (
        <Alert onClose={() => { }}>This is a success alert — check it out!</Alert>
    )

    const handleMenu = () => {
        setOpenAlert(true)
        setTimeout(() => {
            setOpenAlert(false)
        }, 2200)
    }

    const manuallyClose = () => {
        setOpenAlert(false)
    }

    const menuItems = [
        {
            key: 'edit',
            label: 'Edit'
        },
        {
            key: 'delete',
            label: 'Delete'
        }
    ]

    const menu = (
        <Menu items={menuItems} onClick={handleMenu} />
    )

    return (
        <>
            <Dialog open={openAlert}>
                <Alert
                    onClose={manuallyClose}
                    sx={{
                        width: '500px'
                    }}
                    severity="warning"
                >
                    <AlertTitle>Error</AlertTitle>
                    Still working on this section...
                </Alert>
            </Dialog>
            <Card sx={{ maxWidth: '100%' }}>
                <CardHeader
                    avatar={
                        <Avatar size={45} icon={<img src={darren_avatar} alt="" />} />
                    }
                    action={
                        <Dropdown overlay={menu}>
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        </Dropdown>
                    }
                    title={props.blogs[0].title}
                    subheader={props.blogs[0].publish_time}
                />
                {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
                <CardContent >
                    <Typography variant="body2" color="text.secondary">
                        {props.blogs[0].abst}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton aria-label="show more" style={{ marginRight: '10px' }}>
                        <MoreHorizIcon />
                    </IconButton>

                </CardActions>
            </Card>
        </>

    );
}

export default BlogCard