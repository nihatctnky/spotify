import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ProfileContext } from '../context/ProfileContext';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native';


const ProfileScreen = () => {

  const {profile,loading,error}= useContext(ProfileContext)
  const {name,image_url, followers_count, public_playlists}= profile

  const followerFormat = count => {
    if(count>= 1000000){
      return `${Math.round(count/1000000)}M`
    }
    else if (count>=1000){
      return`${Math.round(count/1000)}K`

    }
    return String(count)
  }
  return (
   <LinearGradient colors={["#040305", "#131624"]} style={{flex: 1}}>

    <ScrollView style={{marginTop: 50}}>
    <View style={{padding:15}}>
      <View style={styles.profileContainer}>
        <Image source={{uri:image_url}} style={styles.profileImage}/>
        <View>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.followerCount}>{followerFormat(followers_count)}</Text>
        </View>
      </View>
    </View>

    <Text style={styles.sectionTitle}>Your Playlist</Text>

    <View style={{padding:20}}>
      {
        public_playlists.map(playlist => (
          <View key={playlist.uri}
          style={{
            marginVertical:20,
            flexDirection:"row",
            alignItems:"center",
            gap:5
          }}
          >
         <Image 
         source={{uri:"https://picsum.photos/200/300"}} style={styles.playlistImage}/>

         <View>
          <Text style={styles.playlistName}>
            {playlist.name}
          </Text>
          <Text style={styles.playlistFollowers}>
            {followerFormat(playlist.followers_count)}
          </Text>
         </View>


          </View>

        ))
      }

    </View>
    </ScrollView>

   </LinearGradient>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
profileContainer:{
  flexDirection: "row",
  alignItems: "center",
  gap: 10
},
profileImage:{
  width: 100,
  height: 100,
  borderRadius: 100,
  resizeMode: "cover"
},
profileName: {
  color: "white",
  fontSize: 22,
  fontWeight:"bold"
},
followerCount:{
  color: "white",
  fontSize:15,
  fontWeight:"bold",
},
sectionTitle:{
  color: "white",
  fontSize:20,
  fontWeight:"500",
  marginHorizontal:12
},
playlistImage:{
  width:50,
  height:50,
  borderRadius:5
},
playlistName:{
  color:"white",
  fontWeight:"bold",
  fontSize:14
},
playlistFollowers:{
  color:"gainsboro",
  marginTop:5
}

})