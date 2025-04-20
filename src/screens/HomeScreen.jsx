import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../components/Loader';
import { ScrollView } from 'react-native-gesture-handler';
import { imageURL } from '../utils/constants';
import { CloudLightning , Star} from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
// import ArtistCard from '../components/ArtistCard';
import AlbumCard from '../components/AlbumCard'; // Albüm kartı bileşeni
import { ArtistContext } from '../context/ArtistContext';
import ArtistCard from '../components/ArtistCard';
import { SCREENS } from '../utils/routes';
import { AlbumContext } from '../context/AlbumContext';

const HomeScreen = ({navigation}) => {
  
 
  const {artists, loading, error} = useContext(ArtistContext);
  const {
    albums,
    loading: albumsLoading,
    error: albumsError,
  } = useContext(AlbumContext);
  

  return (
    <LinearGradient colors={['#040305', '#131624']} style={{ flex: 1 }}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
      ) : (
        <ScrollView style={{ marginTop: 50 }} contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.headerContent}
            onPress={() => navigation.navigate(SCREENS.PROFILE)}
            >
              <Image source={{ uri: imageURL }} style={styles.headerImage} />
              <Text style={{ color: 'white', marginLeft: 18, fontSize: 20 }}>Udemig</Text>
            </TouchableOpacity>
            <CloudLightning color="white" size={20} />
          </View>

          <Pressable style={styles.tabButtons}
          >
            <Pressable style={styles.tabButton}
             onPress={() => navigation.navigate(SCREENS.SONGS)}
            >
              <Text style={styles.tabButtonText}>Music</Text>
            </Pressable>


            <Pressable style={styles.tabButton}
             onPress={() => navigation.navigate(SCREENS.SONGS)}
            >
              <Text style={styles.tabButtonText}>Podcast</Text>
            </Pressable>
          </Pressable>

          <View style={{ paddingHorizontal: 16 }}>
            <Pressable onPress={() => navigation.navigate('SONGS')} style={styles.likedSongs}>
              <LinearGradient colors={['#33006F', '#FFFFFF']} style={styles.iconContainer}>
              
              <Star size="32" color="white"/>
              </LinearGradient>
              <Text style={styles.likedSongsText}>Songs</Text>
            </Pressable>

            <Pressable style={styles.likedSongs}>
              <LinearGradient colors={['#33006F', '#FFFFFF']} style={styles.iconContainer}>
              <Star size="32" color="white"/>
              </LinearGradient>
              <Text style={styles.likedSongsText}>Rock & Roll</Text>
            </Pressable>

            <Pressable style={styles.likedSongs}>
              <LinearGradient colors={['#33006F', '#FFFFFF']} style={styles.iconContainer}>
              <Star size="32" color="white"/>
              </LinearGradient>
              <Text style={styles.likedSongsText}>Caz</Text>
            </Pressable>
          </View>

          <Text style={styles.sectionTitle}>Your Top Artist</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            {
              artists?.map((artist,index) => (
                <ArtistCard artist={artist} key={index}/>
              ))
            }
          </ScrollView>

          <View style={{ height: 10 }} />

          <Text style={styles.sectionTitle}>Popüler Albums</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 16 }}>
            {albums?.map((album, index) => (
              <AlbumCard key={index} album={album} />
              
            ))}
          </ScrollView>
        </ScrollView>
      )}
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  tabButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 5,
    marginHorizontal: 12,
  },
  tabButton: {
    backgroundColor: '#282828',
    padding: 10,
    borderRadius: 30,
  },
  tabButtonText: {
    color: 'white',
    fontSize: 15,
  },
  likedSongs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  likedSongsText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 15,
  },
  iconContainer: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  sectionTitle: {
    color: 'white',
    marginHorizontal: 16, 
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
