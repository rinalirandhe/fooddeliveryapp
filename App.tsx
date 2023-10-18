import React from 'react'
import AppNavigator from './src/AppNavigator'
import { initReactI18next } from 'react-i18next';
import i18n from './i18n';

i18n
  .use(initReactI18next)
  .init();

export default function App() {
  return (
    <AppNavigator />
  )
}
