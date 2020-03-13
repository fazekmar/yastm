import mpv from './players/mpv';
import celluloid from './players/celluloid';
import youtubedl from './players/youtubedl';

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
        case 'youtubedl':
            playerParams = [cmd, ...youtubedl(settings)];
            break;
        default:
            break;
    }

    return playerParams;
};