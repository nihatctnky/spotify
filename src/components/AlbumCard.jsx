import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { SCREENS } from '../utils/routes';

const AlbumCard = ({album}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(SCREENS.SONGINFO, {album})}
      style={styles.albumContainer}>
      <Image source={{uri: album.coverArt}} style={styles.albumImage} />
      <Text style={styles.albumName} numberOfLines={1} >{album.name}</Text>
      <Text style={styles.albumArtist} numberOfLines={1} >{album.artist} </Text>
    </TouchableOpacity>
  );
};

export default AlbumCard;

const styles = StyleSheet.create({
  albumContainer: {
    width: 100,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  albumImage: {
    width: 100,
    height: 100,
  },
  albumName: {
    color: 'white',
    marginTop: 7,
  },
  albumArtist: {
    color: 'gray',
    fontSize: 12,
  },
});