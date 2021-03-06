export default {
    player: '',
    autoPlay: false,
    autoplayHosts: [],
    misc: {
        autoPause: false,
        bookmarks: false,
    },
    playerProperties: {
        mpv: {
            cmd: 'mpv',
            name: 'mpv',
            settings: {
                enabled: true,
                profile: '',
                xClass: '',
                pseudo: false,
                pause: false,
                commandline: '',
            },
        },
        celluloid: {
            cmd: 'gnome-mpv',
            name: 'Celluloid (ex gnome-mpv)',
            settings: {
                enabled: true,
                commandline: '',
            },
        },
        youtubedl: {
            cmd: 'youtube-dl',
            name: 'youtube-dl (only download)',
            settings: {
                enabled: true,
                savePath: '',
                commandline: '',
            },
        },
    },
};