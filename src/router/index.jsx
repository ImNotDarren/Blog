import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../Home'
import Intro from '../pages/Intro'
import Error from '../pages/Error'
import Blogs from '../pages/Blogs'
import Music from '../pages/Music'
import Event from '../pages/Event'
import Login from '../pages/Login'
import Comments from '../pages/Comments'
import BlogPage from '../pages/BlogPage'


const BaseRouter = () => (
    <BrowserRouter forceRefresh={false}>
        <Routes>
            <Route path="/" element={<Home />}>
            <Route path="/" element={<Intro />}></Route>
                <Route path="/intro" element={<Intro />}></Route>
                <Route path="/blogs" element={<Blogs />}></Route>
                <Route path="/music" element={<Music />}></Route>
                <Route path="/event" element={<Event />}></Route>
                <Route path="/comments" element={<Comments />}></Route>
                <Route path="/blogpage" element={<BlogPage />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/*" element={<Error />}></Route>
        </Routes>
        
    </BrowserRouter>
)

export default BaseRouter