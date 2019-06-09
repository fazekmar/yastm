import { logError } from './modules/logger';
import createContextMenus from './modules/createcontextmenus';
import createListeners from './modules/createlisteners';
import handleClick from './modules/handleclick';

createContextMenus();
createListeners(handleClick);

process.on('unhandledRejection', error => logError(error));
