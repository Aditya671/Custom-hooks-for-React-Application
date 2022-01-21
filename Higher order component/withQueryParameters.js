import React from 'react';

// This custom hook returns the parameters of the url
// can be used to get all the parameters present inside the urls.
// uses window.location.search of the window.location Object

export const withQueryParameters = (WrappedComponent) => {
   const WithParameters = (props) => {
      const SearchParamsList = {}
      const url = window.location.href;
      if(typeof window.location.href === 'string'){
         if(url.includes('?') || url.includes('&')){
            const searchParameters = new URLSearchParams(window.location.search)
            searchParameters.forEach(function(value,key){
               return SearchParamsList[key] = value 
            })
            return (<WrappedComponent paramsList={SearchParamsList} {...props}/>);
         }
         else {
            return (<WrappedComponent {...props} />)
         }
      }
      else {
         return (<WrappedComponent {...props} />)
      }
      
   }
   return WithParameters;
}
