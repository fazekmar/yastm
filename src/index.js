import { logError } from './modules/logger';
import createContextMenus from './modules/createcontextmenus';
import createListeners from './modules/createlisteners';

createContextMenus();
createListeners();

process.on('unhandledRejection', error => logError(error));
