import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';

const ArtistCard = ({artist}) => {
  return (
    <TouchableOpacity>
      <View style={styles.artistContainer}>
        <Image
          source={{uri:artist.visuals.avatarImage.sources[0].url}}
          style={styles.artistImage}
        />
        <Text numberOfLines={1} style={styles.artistName}>
          {artist.profile.name}
        </Text>
        
      </View>
    </TouchableOpacity>
  );
};

export default ArtistCard;

const styles = StyleSheet.create({
  artistContainer: {
    margin: 10,
    width: 100,
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  artistName: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
});