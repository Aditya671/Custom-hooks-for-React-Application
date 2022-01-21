import { useEffect, useState } from "react";

const useFetch = (urlApi) => {
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);

    useEffect(() => {
        const AbortS = new AbortController();
        setTimeout( () => {
            fetch(urlApi,{signal : AbortS.signal},{
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'mode':'cors'
                }
            })
            .then(res => {
                if(!res.ok){
                    throw Error('Could Not Load the Resource... Review the URL')
                }
                console.log('Fetch Successful')
                return res.json()   
            })
            .then(data => {
                setData(data)
            })
            .catch(err => {
                console.log('Error Occured');
                setError(err.message);
            })
        },2000)
            return  () => AbortS.abort()
    },[urlApi])
    return {data , error};
}
export default useFetch;