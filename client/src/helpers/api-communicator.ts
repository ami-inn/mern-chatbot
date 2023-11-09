import axios from "axios"

export const loginUser = async(email:string,password:string)=>{
    const res = await axios.post('/user/login',{email,password})
    if(res.status !== 200){
        throw new Error("Unable to login")
    }

    const data = await res.data

    return data
}

export const signupUser = async(name:string,email:string,password:string)=>{
    console.log('entered to signup',name,email,password);
    
    const res = await axios.post('/user/signup',{name,email,password})
    if(res.status !== 201){
        console.log(res);
        console.log('entered to error');
        
        
        throw new Error("Unable to signup")
    }

    console.log('entedeeeeee');
    

    const data = await res.data

    return data
}

export const checkAuthStatus = async()=>{
    const res = await axios.get('/user/auth-status',)
    if(res.status !== 200){
        throw new Error("Unable to authenticate")
    }

    const data = await res.data

    return data
}

export const sendChatRequest = async(message:string)=>{
    console.log('message',message);
    
    const res = await axios.post('/chat/new',{ message })
    if(res.status !== 200){
        throw new Error("Unable to send chat")
    }

    const data = await res.data


    return data
}

export const getUserChats = async()=>{
   
    
    const res = await axios.get('/chat/all-chats',)
    if(res.status !== 200){
        throw new Error("Unable to send chat")
    }

    const data = await res.data


    return data
}


export const deleteUserChats  = async()=>{
   
    
    const res = await axios.delete('/chat/delete-chats',)
    if(res.status !== 200){
        throw new Error("Unable to delete chat")
    }

    const data = await res.data


    return data
}


export const logoutUser = async()=>{
    const res = await axios.get('/user/logout')

    if(res.status !== 200){
        throw new Error("unable to log out ")
    }

    const data = await res.data
    return data
}