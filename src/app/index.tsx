import React from 'react';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Navigator from './navigator';

const App: React.FC = () => (
  <SafeAreaProvider>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </ApplicationProvider>
  </SafeAreaProvider>
);

export default App;
