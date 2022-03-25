import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StoreThemeContext } from './../context_api/StoreThemeContext';

// Context API
export const StoreThemeContext = React.createContext();

// Higher Order Component for Main Application
const withAppTheme = (WrappedComponenet) => {
   const ThemeWrappedComponent = () => {
      const [mode, setMode] = React.useState(localStorage.getItem('AppTheme'));
      useEffect(() => {
         // LocalStorage App Theme will work only when the app runs for the first time 
         // and will set the default theme as Dark and can be changed to light also
         if(localStorage.getItem('AppTheme') === null){
            localStorage.setItem('AppTheme','dark');
         }
         window.onload = function(){
            localStorage.setItem('AppTheme','dark');   
         }
      },[])
      const colorMode = React.useMemo(
         () => ({
            toggleColorMode: (value) => {
               setMode(
                  (prevMode = localStorage.getItem('AppTheme')) => 
                     (prevMode === 'light' ? 'dark' : 'light')
                  );
               if(localStorage.getItem('AppTheme') === 'light'){
                  localStorage.setItem('AppTheme','dark');
               }
               else{
                     localStorage.setItem('AppTheme','light');
               }
            },
         }),
         [],
      );
      const theme = React.useMemo(
         () =>
         createTheme({
            palette: {
               mode,
            },
         }),
         [mode],
      );

      return (
         <StoreThemeContext.Provider value={{colorMode,Theme:theme.palette.mode}}>
            <ThemeProvider theme={theme}>
               <Box
                  sx={{bgcolor: 'background.default', color: 'text.primary',}}> 
                  <WrappedComponenet />
               </Box>
               
            </ThemeProvider>
         </StoreThemeContext.Provider>
      )
   }
   return ThemeWrappedComponent;
}
/* 
   Usage: 
   The component must be called as higher order component
   import using useContext in any Component
   const {Theme,colorMode} = useContext(StoreThemeContext);

   Directlt Call: colorMode.toggleColorMode on Click of an element 
   <Component onClick={colorMode.toggleColorMode} />
*/
export default withAppTheme;