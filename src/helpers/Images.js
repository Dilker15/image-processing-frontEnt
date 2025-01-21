import axios from 'axios';



export async function ProcessImage(formData){
    const url = import.meta.env.VITE_URL_API
    const response = await axios.post(url,formData);
    const data2 =await response.data;
    return data2;
}