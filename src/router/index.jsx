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
import Pub from '../pages/Pub'
import AFib from '../pages/AFib'
import CPP from '../pages/CPP'


const BaseRouter = () => (
    <BrowserRouter forceRefresh={false}>
        <Routes>
            <Route path="/" element={<Home />}>
            <Route path="/" element={<Intro />}></Route>
                <Route path="/intro" element={<Intro />}></Route>
                <Route path="/blogs" element={<Blogs />}></Route>
                <Route path="/publications" element={<Pub />}></Route>
                <Route path="/publications/afib" element={<AFib />}></Route>
                <Route path="/publications/cpp" element={<CPP />}></Route>
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