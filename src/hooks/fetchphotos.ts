import { useCallback, useEffect, useState } from "react";

 export default function useFetchphotos(){
    
    const [photos,setphotos]=useState<any[]|null>(null)

    const [error,setError]=useState("")

    const [loading,setLoading]=useState(false)
    
    const fetchphotos=useCallback(async()=>{
        try{
        const result =await fetch("https://picsum.photos/v2/list?limit=30")
        const data = await result.json()
        return data  
        }catch(e:any){
            console.log(e.message , ' error in the fetchphots')
            setError("error fetching the phots")
            return null
            
        }


    },[])

    useEffect(()=>{
        async function main(){
            const data =await  fetchphotos()
             if(!data){
            return
        }
        console.log("data")
        setphotos(data)
        }


        main()  
    })
}