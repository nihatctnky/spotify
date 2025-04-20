import { createContext, useEffect, useState } from "react";
import  axios  from 'axios';


export const AlbumContext = createContext()

export const AlbumProvider = ({ children }) => {

  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  const getData = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/search/',
      params: {
        q: 'Türkiyede Popüler',
        type: 'Albums',
        offset: '0',
        limit: '10',
        numberOfTopResults: '5'
      },
      headers: {
        'x-rapidapi-key': 'f1ac9c0272msh3a42be18625678ap194489jsne92666a916d6',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options)
     
      const albumItems = response.data?.albums?.items?.map(item => ({
         uri: item.data.uri,
         name: item.data.name,
         year: item.data.date.year,
         artist: item.data.artists.items[0].profile.name,
         coverArt: item.data.coverArt.sources[0].url

      }))
       setAlbums(albumItems)

    
    
    } catch (error) {
      console.log(error)
      setError(error.message)

    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  },[])

  
  return (

    <AlbumContext.Provider value={{ albums, loading, error }}>
      {children}
    </AlbumContext.Provider>
  )
}