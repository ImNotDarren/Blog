function getMusic(mid, today, language) {
    const music_info = {
        0: {
            'head': today < (new Date(Date.UTC(2023, 2, 30, 16, 0))) ? (language === 'en' ? 'Brand new single \"Dream\" coming' : '全新单曲「Dream」将于') : (language === 'en' ? 'Brand new single \"Dream\" now released!' : '全新单曲「Dream」现已发行！'),
            'title': 'Dream',
            'art': 'https://darren-blog-bucket.s3.us-east-1.amazonaws.com/Dream.jpeg',
            'cont': language === 'en' ? [
                'Darren Liu',
                'Written by: Darren Liu',
                'Produced by: Darren Liu',
                'Backing Vocal Arranged by: Darren Liu',
                'Backing Vocal by: Darren Liu',
                'Recorded by: Yi Liu / Darren Liu',
                'Mixed by: Yi Liu at Silence Music',
                'Mastered by: Yi Liu at Silence Music'
            ] : [
                '刘思佐',
                '词：刘思佐',
                '曲：刘思佐',
                '编曲：刘思佐',
                '制作人：刘思佐',
                '和声编写：刘思佐',
                '和声：刘思佐',
                '录音师：刘毅 / 刘思佐',
                '混音师：刘毅@Silence Music',
                '母带处理工程师：刘毅@Silence Music'
            ],
            'release_time': (new Date(Date.UTC(2023, 2, 30, 16, 0))),
            'links': ['', '', '', ''], // spotify, apple music, qq music, netease music
            'lyrics': `Holdin' you in the sunset
Singin' all the songs I wrote for you
Makin' out in the front seat (Front seat)
Closin' my eyes so I don't realize
Everything's in my dream
Wish I never left so you won't leave me
I don't know where you've been (Where you've been)
Fakin' it when you left me in the rain
(It's so real)
So appealin'
(So charmin')
I can't resist
(If only)
I won't lose it
But I don't see
Why did it feel so good (Feel so good)
Tearin' up the things you gave me
How can I deal with you (Deal with you)
I had everythin' when I'm
Holdin' you in the sunset
Singin' all the songs I wrote for you
Makin' out in the front seat (Front seat)
Closin' my eyes so I don't realize
Everything's in my dream (In my dream)
Wish I never left so you won't leave me
I don't know where you've been (Where you've been)
Fakin' it when you left me in the rain
Holdin' you in the sunset
Singin' all the songs I wrote for you
Makin' out in the front seat (Front seat)
Closin' my eyes so I don't realize
Everything's in my dream (In my dream)
Wish I never left so you won't leave me
I don't know where you've been (Where you've been)
Fakin' it when you left me in the rain
We'll be us again (Be us again)
When I show up at your door
We'll be holdin' hands (Be holdin' hands)
I won't wake up like before
(Be us again)
(Be holdin' hands)
            `
        }
    }

    return music_info[mid]
}

export default getMusic