import mpv from './players/mpv';
import celluloid from './players/celluloid';

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
        case 'celluloid':
            playerParams = [cmd, ...celluloid(settings)];
            break;
        default:
            break;
    }

    return playerParams;
};