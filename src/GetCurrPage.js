

function get_prev_page(curr_page) {
    if (curr_page == 1) {
        return '/intro'
    } else if (curr_page == 2) {
        return '/publications'
    } else if (curr_page == 3) {
        return '/blogs'
    } else if (curr_page == 4) {
        return '/music'
    } else {
        return '/event'
    }
}

export default get_prev_page