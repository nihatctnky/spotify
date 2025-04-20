import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Routes from './src/navigation/Routes';
import { AlbumProvider } from './src/context/AlbumContext';
import { ArtistProvider } from './src/context/ArtistContext';
import { ProfileProvider } from './src/context/ProfileContext';


const App = () => {
  return (


    <ProfileProvider>
    <ArtistProvider>
  <AlbumProvider>
<Routes/>
  </AlbumProvider>
  </ArtistProvider>
  </ProfileProvider>
   
  )
}

export default App