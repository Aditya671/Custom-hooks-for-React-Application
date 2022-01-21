import React, {useState} from 'react';

const useHttp = (requestConfig,applyData) => {
   const [loading,setLoading] = useState(false);
   const [error,setError] = useState(null);

   const sendRequest = async () => {
      setLoading(false)
      setError(null)
      try{
         const response = await fetch(requestConfig,url,{
            method:requestConfig.method ? requestConfig.method : 'GET',
            headers:requestConfig.headers ? requestConfig.headers : {},
            body:requestConfig.body ? JSON.stringify(requestConfig.body) : null
         })

         if(!response.ok) {
            throw new Error('Requst Failed')
         }
         const data = await response.json()
         applyData(data)
      }
      catch(err) {
         setError(err.message)
      }
      setLoading(false)
   }
   return {
      isLoading : loading,
      error: error,
      sendRequest: sendRequest
   }
}
export default useHttp;