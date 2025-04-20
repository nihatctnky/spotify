import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Facebook, Google, Spotify , Mobile} from 'iconsax-react-native'




const LoginScreen = ({navigation}) => {
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />

        <View style={{ alignItems: "center" }}>
          <Spotify size="80" color="white" />
        </View>


        <Text style={styles.loginTitle}>
          Millions of Songs Free on Spotify
        </Text>
        <View style={{ height: 80 }} />

        <TouchableOpacity
        style={styles.loginButtom}
        onPress={() => navigation.navigate("Main")}

        >
          <Text style={styles.loginText}>Sign In with Spotify</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Google size="24" color="white"/>
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Facebook size="25" color="white"/>
          <Text style={styles.buttonText}>Continue with Facebook</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}>
          <Mobile size="24" color="white"/>
          <Text style={styles.buttonText}>Continue with Phone Number</Text>
        </TouchableOpacity>


      </SafeAreaView>
    </LinearGradient>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  loginTitle: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 35
  },
  loginButtom: {
    backgroundColor: "#1AD35E",
    width: 300,
    height:40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
    padding :10,
    borderRadius: 25,
    marginVertical:10,
    
  },
  loginText: {
    color: "white",
    textAlign: "center",
    flex: 1,
    fontWeight: 600,
    fontSize: 15
  },
  button: {
    backgroundColor:"#131624",
    padding:10,
    flexDirection: "row",
    marginHorizontal: "auto",
    alignItems:"center",
    borderColor: "#C0C0C0",
    borderRadius:25,
    borderWidth:0.8,
    marginVertical:10,
    width: 300

  },
  buttonText: {
    color: "white",
   textAlign: "center",
   fontWeight: "600",
   fontSize: 15,
   marginLeft: -10,
   flex: 1
   
    
  }
})