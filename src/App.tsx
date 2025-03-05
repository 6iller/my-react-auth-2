import './App.css';
import React from 'react';
import ThemeProvider from './components/ThemeWrapper/ThemeWrapper.tsx';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './pages/MainPage.tsx';
import ReactDOM from 'react-dom';
import store from './components/Redux/store/store.ts';
import { Provider } from 'react-redux';

const App: React.FC = () => {
  return (
    <Provider store={store}>
    <ThemeProvider>
      <Header />
      <MainPage />
      <Footer />
    </ThemeProvider>
    </Provider>
  );
};

export default App;
