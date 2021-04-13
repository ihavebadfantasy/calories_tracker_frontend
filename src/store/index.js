import thunk from 'redux-thunk';
import { combineReducers, applyMiddleware, createStore as reduxCreateStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// store modules names are equal to modules directories names and reducer file must be named as reducer.js
const createStore = async () => {
  const modules = {};
  const moduleImports = [];

  const requireModule = require.context('.', true, /\.js$/);
  const paths = requireModule.keys();

  for (const path of paths) {
    if (path.includes('reducer.js')) {
      let moduleName = path.slice(path.indexOf('./') + 2);
      moduleName = moduleName.slice(0, moduleName.indexOf('/'));
      const moduleImport = import('./' + moduleName + '/reducer.js').then((module) => {
        modules[moduleName] = module.reducer;
      });
      moduleImports.push(moduleImport);
    }
  }

    await Promise.all(moduleImports);
    const rootReducer = combineReducers(modules);
    return reduxCreateStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}

export default createStore;
