import axios from 'axios';
import {createContext, useEffect, useState} from 'react';

const ArtistContext = createContext();

const ArtistProvider = ({children}) => {
  const [artists, setArtist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getArtist = async () => {
   
    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: {
          q: 'Türkiyede Popüler olanlar',
          type: 'Artists',
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
      const response = await axios.request(options);
      const data = response.data.artists.items.map((item) =>item.data)
      setArtist(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getArtist();
  }, []);

  return (
    <ArtistContext.Provider value={{artists, loading, error}}>
      {children}
    </ArtistContext.Provider>
  );
};

export {ArtistContext, ArtistProvider};