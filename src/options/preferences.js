export default {
    player: '',
    autoplayHosts: [],
    playerProperties: {
        mpv: {
            cmd: 'mpv',
            name: 'mpv',
            settings: {
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
                commandline: '',
            },
        },
    },
};