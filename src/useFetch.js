import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null); 
    const [isPending, setIsPending] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect( () => {
        const abortConst = new AbortController(); 

        fetch(url, { signal: abortConst.signal }) 
            .then(res => {
                if(!res.ok){
                    throw Error('Could not fetch the data for that res!')
                } else {
                    return res.json(); 
                }
            })
            .then(data => {
                setIsPending(false); 
                setData(data);
                setError(null); 
            })
            .catch((err) => {
                if(err.name === 'AbortError'){
                    console.log('Fetch Aorted')
                } else {
                    setIsPending(false); 
                    setError(err.message); 
                }
            })

            return () => {
                abortConst.abort(); 
            }
    }, [url]); 

    return { data, isPending, error};

}
 
export default useFetch;