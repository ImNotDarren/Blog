import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../Home'
import Intro from '../pages/Intro'
import Error from '../pages/Error'
import Blogs from '../pages/Blogs'
import Music from '../pages/Music'
import Arrange from '../pages/Arrange'
import Login from '../pages/Login'


const BaseRouter = () => (
    <BrowserRouter forceRefresh={false}>
        <Routes>
            <Route path="/" element={<Home />}>
                <Route path="/intro" element={<Intro />}></Route>
                <Route path="/blogs" element={<Blogs />}></Route>
                <Route path="/music" element={<Music />}></Route>
                <Route path="/arrange" element={<Arrange />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/*" element={<Error />}></Route>
        </Routes>
        
    </BrowserRouter>
)

export default BaseRouter