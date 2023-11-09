import { Box, Button, Typography } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import {IoIosLogIn} from 'react-icons/io'
import React, { useEffect } from "react";
import  {toast} from 'react-hot-toast'
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate  = useNavigate()
  const auth = useAuth()
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const name = formData.get('name') as string
    const password = formData.get('password') as string
    console.log(email,password);

    try {
      toast.loading("signing in",{id:"signup"})
      console.log(name,email,password);
      
      await auth?.signup(name,email,password)
      toast.success("signup successfully",{id:"signup"})
    } catch (error) {
      console.log(error,'error');
      
      toast.error('sign up failed',{id:"signup"})
    }
    
  }

  useEffect(() => {

  if(auth?.user){
   return navigate("/chat")
  }

  }, [auth])
  

  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1} style={{ position: "relative", zIndex: 1 }} >
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }} >
        <img src="airobot.png" alt="robot" style={{ width: "400px" }} />
      </Box>
      <Box
      display={"flex"} flex={{xs:1,md:0.5}}
      justifyContent={'center'}
      alignItems={'center'}
      padding={2}
      ml={'auto'}
      mt={16}
      >
        <form onSubmit={handleSubmit}  style={{margin:"auto",padding:"30px",boxShadow:"10px 10px 20px #000",borderRadius:"10px",border:"none"}}>

          <Box sx={{display:"flex",flexDirection:"column", justifyContent:"center"}} >

            <Typography variant="h4" textAlign="center" padding={2} fontWeight={600} >
            Signup
            </Typography>
            <CustomizedInput type="text" name="name" label="Name" />
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password"/>

            <Button type="submit" sx={{px:2,py:1,mt:2,width:"400px",borderRadius:2,bgcolor:"#00fffc",":hover":{bgcolor:'white',color:"black"}}} endIcon={<IoIosLogIn/>}>signup</Button>

          </Box>

        </form>
      </Box>
    </Box>
  );
};

export default Signup;
