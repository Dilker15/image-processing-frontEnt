import { useState } from "react"




export function CustomHooks(initialValues={}){
    const [data,setData] = useState(initialValues);
   

    const updateDatas = (element)=>{
        const { name, value } = element;
        setData({
            ...data,
            [name]:value,
        });

    }

    const clearData = ()=>{
        setData(initialValues);
    }

    return{
        data,
        updateDatas,
        clearData
    }
}