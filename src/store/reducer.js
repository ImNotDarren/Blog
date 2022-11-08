let curr_page = sessionStorage.getItem('curr_page') ? sessionStorage.getItem('curr_page') : 1
let login = sessionStorage.getItem('login') ? sessionStorage.getItem('login') : 0
let super_account = sessionStorage.getItem('super_account') ? sessionStorage.getItem('super_account') : 0
let username = sessionStorage.getItem('username') ? sessionStorage.getItem('username') : null
let uid = sessionStorage.getItem('uid') ? sessionStorage.getItem('uid') : -1
let avatar = sessionStorage.getItem('avatar') ? sessionStorage.getItem('avatar') : null
let email = sessionStorage.getItem('email') ? sessionStorage.getItem('email') : null


const defaultState = {
    curr_page,
    login,
    super_account,
    username,
    uid,
    avatar,
    email,
    server: 'darren-liu.com'
}


export default (state=defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state))

    switch(action.type){
        case "switchTab":
            sessionStorage.setItem('curr_page', action.value)
            newState.curr_page = sessionStorage.getItem('curr_page')
            break

        case "userInfo":
            const user = action.value
            sessionStorage.setItem('username', user.username)
            sessionStorage.setItem('login', 1)
            sessionStorage.setItem('super_account', user.is_superuser)
            sessionStorage.setItem('email', user.email)
            sessionStorage.setItem('avatar', user.avatar)
            sessionStorage.setItem('uid', user.uid)
            newState.user_info = sessionStorage.getItem('user_info')
            newState.login = sessionStorage.getItem('login')
            newState.super_account = sessionStorage.getItem('super_account')
            newState.username = sessionStorage.getItem('username')
            newState.avatar = sessionStorage.getItem('avatar')
            newState.email = sessionStorage.getItem('email')
            break

        case "logOut":
            sessionStorage.setItem('username', null)
            sessionStorage.setItem('login', 0)
            sessionStorage.setItem('super_account', 0)
            sessionStorage.setItem('email', null)
            sessionStorage.setItem('avatar', null)
            sessionStorage.setItem('uid', -1)
            sessionStorage.setItem('curr_page', 1)
            newState.user_info = sessionStorage.getItem('user_info')
            newState.login = sessionStorage.getItem('login')
            newState.super_account = sessionStorage.getItem('super_account')
            newState.username = sessionStorage.getItem('username')
            newState.avatar = sessionStorage.getItem('avatar')
            newState.email = sessionStorage.getItem('email')
            newState.curr_page = sessionStorage.getItem('curr_page')
            break

        default:
            break
    }

    return newState
}