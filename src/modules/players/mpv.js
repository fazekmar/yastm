import getCommandline from './commandlineparser';

export default ({
    profile, pseudo, pause, xClass, commandline,
}) => ([
    '--no-terminal',
    profile ? `--profile=${profile}` : '',
    pseudo ? '--player-operation-mode=pseudo-gui' : '',
    pause ? '--pause' : '',
    xClass ? `--x11-name=${xClass}` : '',
    ...getCommandline(commandline),
]);