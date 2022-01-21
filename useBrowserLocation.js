import React, { useState } from 'react';
import moment from 'moment-timezone';

/* 
*  @param {string} browserTimeZone is used to get UserTimeZone
*  @param {string} language can be used to apply language 
*     settings to the complete app as per user settings
   @return a reusable component for the application with some global level values.
   @return {string} browserTimeZone
   @return {string} language
   @return {function} getBrowserData which will take value of above 
      mentioned return values inside context field for applying globally to the app
*/
export const useBrowserData = () => {
   const [browserTimeZone,setBrowserTimeZone] = useState('');
   const [language,setLanguage] = useState('');

   const getBrowserData = React.useMemo(
      () => ({
         userLocation: (value) => {
            setBrowserTimeZone(moment.tz.guess())
         },
         browserLanguage:(value) => {
            setLanguage(window.navigator.languages)
         }
      })
      
   ,[]);

   return {
      browserTimeZone,
      language,
      getBrowserData
   }
}