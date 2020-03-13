import mpv from './players/mpv';
export default ({
    url, prefs,
}) => ({ url, player: getPlayerSetting(prefs) });

const getPlayerSetting = ({ player, playerProperties }) => {
    const { cmd, settings } = playerProperties[player];
    let playerParams = [];

    switch (player) {
        case 'mpv':
            playerParams = [cmd, ...mpv(settings)];
            break;
        default:
            break;
    }

    return playerParams;
};