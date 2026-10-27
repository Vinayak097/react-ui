import { useCallback, useEffect, useState } from "react";

 export default function useFetchphotos(){
    const [photos,setphotos]=useState()

    const [error,setError]=useState("")

    const [loading,setLoading]=useState()
    
    const fetchphotos=useCallback(async()=>{
        try{
        const result =await fetch("")
        const data = await result.json()
        return data  
        }catch(e:any){
            console.log(e.message , ' error in the fetchphots')
            setError("error fetching the phots")
            
        }


    },[])

    useEffect(()=>{
        
    })
}