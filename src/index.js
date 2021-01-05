import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { ChakraProvider, theme, Box, Grid, VStack, ColorModeScript } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Main />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
