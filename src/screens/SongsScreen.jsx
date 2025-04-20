import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Pressable,
  TextInput,
  ActivityIndicator,
  Text,
  FlatList,
  Image,

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowCircleDown, ArrowLeft, Backward10Seconds, Forward10Seconds, Heart, Pause, Play, SearchNormal1 } from 'iconsax-react-native';
import axios from 'axios';
import Modal from 'react-native-modal';
import SongCard from '../components/SongCard';
import TrackPlayer,{useProgress}from 'react-native-track-player';
import { setupPlayer } from 'react-native-track-player/lib/src/trackPlayer';
import { notfoundImage } from '../utils/helpers';




const SongsScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('pop');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [songs, setSongs] = useState([])
  const [modalVisible,setModalVisible]=useState(true)
  const [searchQueryText,setSearchQueryText]=useState("")
  const[selectedTrack,setSelectedTrack]=useState(null)
  const [isPlaying,setIsPlaying]=useState(false)


  // şarkıda kaçıncı dakikada oldugunu hesaplıyor

  const progress = useProgress()

  const handleSearch = async () => {


    const options = {
      method: 'GET',
      url: 'https://shazam.p.rapidapi.com/search',
      params: {
        term: searchText,
        locale: 'en-US',
        offset: '0',
        limit: '5'
      },
      headers: {
        'x-rapidapi-key': 'f1ac9c0272msh3a42be18625678ap194489jsne92666a916d6',
        'x-rapidapi-host': 'shazam.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const formattedSongs = response.data.tracks.hits.map((song) => (song.track))
     
      setSongs(formattedSongs)
    } catch (error) {

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


// trackplayer kütüphanesiyle oynatıcı çalışır hale getirme

const TrackPllayer = async () => {

  try {
    //trackplayer kurulumu
    await TrackPlayer.setupPlayer()

    TrackPlayer.updateOptions({
      capabilities:[
        TrackPlayer.CAPABILITY_PAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_SEEK_TO,
      ]
    })
  } catch (error) {
    console.log(err)
  }
}




const handlePlay = async (track) => {

  const trackData= {
    id: track.key,
    url: track.hub.actions.find(action =>action.type === "uri").uri,
    title: track.title,
    artist: track.subtitle,
    artwork: track.images.coverart
  }

  try {
    await TrackPlayer.reset()
    await TrackPlayer.add(trackData)
    //await TrackPlayer.play()
    setSelectedTrack(track)
    setModalVisible(true)
    setIsPlaying(true)


  } catch (error) {
    console.log(err)
    setError(err.message)
  }
}

 const formatTime = (seconds) => {
  //saniyeyi dk çevir
  const mins = Math.floor(seconds/60)
  // toplam saniyeden geri kalanı hesapla
  const secs = Math.floor(seconds % 60)

  return `${mins < 10 ? "0" : ""}${mins}:${secs<10 ? "0" : ""}${secs}`
 }



 const seekBackward =async () => {
  //şuanki süreyi al
  const position = await TrackPlayer.getPosition()

  //şuan ki süreden 10 sn eksilt
  await TrackPlayer.seekTo(position - 10)
 }

 const seekForward =async () => {
  //şuanki süreyi al
  const position = await TrackPlayer.getPosition()

  //şuan ki süreden 10 sn eksilt
  await TrackPlayer.seekTo(position + 10)
 }

 const tooglePlayback= async () => {
  if(isPlaying){
    await TrackPlayer.pause()
  }else {
    await TrackPlayer.play()
  }

  setIsPlaying(!isPlaying)
 }

  useEffect(() => {
    handleSearch()
    setupPlayer()
  }, [])

  return (
    <LinearGradient colors={['#040305', '#131624']} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, marginTop: 50 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size="32" color="white" />
          </TouchableOpacity>

          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              marginTop: 10
            }}
          >
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                height: 40,
                backgroundColor: 'rgb(20,20,20)',
                borderRadius: 8,
                padding: 10,
                width: "85%"
              }}
            >
              <SearchNormal1 size="24" color="white" />

              <TextInput
                style={{
                  width: 200,
                  color: 'white',
                  fontWeight: '500',
                  marginLeft: 10
                  
                }}
                placeholder="Search."
                placeholderTextColor={"gray"}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}

              />
            </Pressable>
          </Pressable>
        </View>

        <View style={{ marginHorizontal: 10, marginVertical: 10, marginTop: 30 ,gap: 10}}>
          <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
            {
              searchText === "" ? "Search Songs" : `${searchText} için arama sonuçları` 
            }
          </Text>
          {
            loading ?
            <ActivityIndicator size={"large"} color={"gray"}/>
            :
            <FlatList
            data={songs}
            keyExtractor={song => song.key}
            scrollEnabled={false}
            nestedScrollEnabled={false}

            renderItem={
              ({ item }) => (
                <SongCard item={item} handlePlay={handlePlay}/>
              )
          }
          />
}
        </View>

        <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection="down"
        onSwipeComplete={() => setModalVisible(false)}
        >
          <LinearGradient colors={["rgb(51,51,51)","rgb(0,0,0)"]}
          style={{
            width:"100%",
            height:"100%",
            position:"relative",
            marginTop:200,
            paddingHorizontai:30,
            borderRadius:30,
          }}
          >

            <View style={{
              flexDirection:"row",
              justifyContent: "center",
              alignItems:"center",
              paddingHorizontal:10
            }}>

              <TouchableOpacity
              style={{
              
                
                justifyContent:"center",
                paddingVertical: 40,
                marginRight: 20
                
              }}
              onPress={() => setModalVisible(false)}
              >
                <ArrowCircleDown
                size="32"
                color="white"/>
              </TouchableOpacity>

              <Text
              style={{
                fontSize:25,
                color:"white",
                marginRight:120
              }}
              >
                Track Player
              </Text>

            </View>

            <View
            style={{width:360,height:350, marginTop:10,alignItems:"center",justifyContent:"center"}}
            >

              <Image
              source={{uri:selectedTrack?.images["coverarthq" || "coverart"] || notfoundImage}}
              style={{height:"100%",width:"100%", borderRadius:20, marginBottom:40,padding:5}}
              resizeMode='cover'
              />
            </View>

            <View style={{marginTop: 1, marginHorizontal: 30}}>
              <View style={{flexDirection: "row", justifyContent:"space-between", marginRight: 20}}>

                <Text style={{ color:"white", fontSize: 20, fontWeight: 800}}>{selectedTrack?.title}</Text>

                <Heart
                size="30"
                color="rgb(255, 100,100)"/>

              </View>

              <Text style={{color:"gray", fontSize: 16, fontWeight: 600}}>{selectedTrack?.subtitle}</Text>
            </View>

            <View style={{flex:1, marginTop: 15}}>


              {/* progress barı kapsayan view */}

              <View style={{
                width: "96%",
                marginTop:10,
                height: 3,
                backgroundColor: "gray",
                borderRadius: 5,
                marginLeft:7,
                
              }}>
                
                {/* progressbar kendisi */}

                <View style={[styles.progressbar,{
                  width: `${(progress.position / progress.duration) * 100}%`
                }]}>

                </View>

                {/* progressbar topu*/}

                <View
                style={{
                  position:"absolute",
                  top:-3,
                  width:10,
                  height:10,
                  backgroundColor:"white",
                  borderRadius:10,
                  left: `${(progress.position / progress.duration) * 100}%`
                }}
                >

                </View>
              </View>

              {/* süreleri içeren viev */}

              <View
              style={{
                marginTop:12,
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center"
              }}
              >
                <Text style={{color:"white", fontSize:15, marginLeft:5}}>

                  {
                    //süreyi formaatlayıp ekrana bas
                    formatTime(progress.position)
                  }
                </Text>

                <Text style={{color:"white", fontSize:15, marginRight: 6}}>

                  {
                    // toplam süreyi formatlayıp ekrana bas
                    formatTime(progress.duration)
                  }
                </Text>

              </View>
            
            {/* KONTROL BUTONLARI */}
             <View style={{flexDirection:"row",justifyContent:"center", alignItems:"center", gap:20, marginTop:15}}>

                 {/* GERİ SARMA BUTONU */}
              <TouchableOpacity
              onPress={seekBackward}
              >
              <Backward10Seconds
              size="32"
              color="white"/>
              </TouchableOpacity>

              {/* DONDUR/OYNAT BUTONU */}

              <TouchableOpacity
              onPress={tooglePlayback}
              >
              
              {
                isPlaying ? <Pause size={"40"} color="white"/> : <Play size={"40"}
                color="rgb(100,255,100)"/>
              }


              </TouchableOpacity>



              {/* İLERİ SAR BUTONU*/}

              <TouchableOpacity
              onPress={seekForward}
              >
                 
              <Forward10Seconds
              size="32"
              color="white"/>
              </TouchableOpacity>

             </View>



            </View>

          </LinearGradient>

        </Modal>


      </ScrollView>
    </LinearGradient>
  );
};

export default SongsScreen;

const styles = StyleSheet.create({
  progressbar:{
    height:"100%",
    backgroundColor:"rgb(0,225,0)"
  }
});
