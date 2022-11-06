import React from 'react'
import ErrorImg from '../assets/404.jpg'

function Error() {
    return (
        <div>
            <img src={ErrorImg} alt="" className='error' />
        </div>
    )
}

export default Error