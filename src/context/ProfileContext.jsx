import { createContext, useState , useEffect} from "react";

import axios from 'axios';

export const ProfileContext = createContext()



export const ProfileProvider= ({children}) => {

    const [profile,setProfile]= useState(null)
    const [loading ,setLoading] =useState(true)
    const [error,setError]=useState(null)


  const getProfile = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/user_profile/',
      params: {
        id: 'nocopyrightsounds',
        playlistLimit: '10',
        artistLimit: '10'
      },
      headers: {
        'x-rapidapi-key': 'f1ac9c0272msh3a42be18625678ap194489jsne92666a916d6',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com'
      }
    };

      try {

        const response= await axios.request(options)
        setProfile(response.data)
      
      
      } catch (error) {
        setError(error.message)
        
      }
      finally{
        setLoading(false)
      }
  }

  useEffect (() => {
    getProfile()
  },[])



    return(

        <ProfileContext.Provider value={{profile,loading,error}}>
            {children}
        </ProfileContext.Provider>
    )
 }