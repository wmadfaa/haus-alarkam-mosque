import React from 'react';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from '../configureStore';

import Navigator from './navigator';

const {store, persistor} = configureStore();

const App: React.FC = () => (
  <SafeAreaProvider>
    <IconRegistry icons={EvaIconsPack} />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <Navigator />
        </ApplicationProvider>
      </PersistGate>
    </Provider>
  </SafeAreaProvider>
);

export default App;
