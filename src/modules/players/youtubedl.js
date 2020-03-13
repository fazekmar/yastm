import getCommandline from './commandlineparser';

export default ({
    savePath, commandline,
}) => ([
    '--quiet',
    `--output=${savePath || '~/Downloads'}/%(title)s.%(ext)s`,
    ...getCommandline(commandline),
]);