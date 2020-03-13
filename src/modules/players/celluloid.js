import getCommandline from './commandlineparser';

export default ({
    commandline,
}) => ([...getCommandline(commandline)]);