export default ({
    url, mpvProfile, pseudo, pause, mpvXClass,
}) => ({
    url,
    profile: mpvProfile ? `--profile=${mpvProfile}` : '',
    pseudo: pseudo ? '--player-operation-mode=pseudo-gui' : '',
    pause: pause ? '--pause' : '',
    mpvXClass: mpvXClass ? `--x11-name=${mpvXClass}` : '',
});
