import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled, DarkTheme } from 'baseui';
import { LanguageProvider } from './context/LanguageContext';
import i18n from './i18n';
const engine = new Styletron();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  // <React.StrictMode>
    <LanguageProvider i18n={i18n}>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
      {/* <LanguageProvider> */}
       <App/>
       {/* </LanguageProvider> */}
      </BaseProvider>
    </StyletronProvider>
    </LanguageProvider>
    
  // </React.StrictMode>
);