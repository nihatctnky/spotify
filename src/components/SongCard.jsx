

import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { notfoundImage } from '../utils/helpers';

const SongCard = ({ item , handlePlay}) => {
    return (
        <Pressable style={{ flexDirection: "row", height: 50 , marginTop: 15}}

        onPress={() => handlePlay(item)}
        >
            <View style={styles.cardInner}>
                <Image
                    source={{ uri: item.images.coverarthq || item.immages.coverart || notfoundImage }}
                    style={{ height: 50, width: 50, borderRadius: 50 }} />

                <View style={styles.textView}>
                    <Text style={{ color: "white", fontSize: 15 }}>{item?.title}</Text>

                    <Text style={{ color: "gray", fontSize: 15 }}>{item?.subtitle}</Text>
                </View>

            </View>
        </Pressable>
    )
}

export default SongCard

const styles = StyleSheet.create({
    cardInner:{
        flexDirection:"row",
        gap: 10
    },
    textView:{
        gap: 5,
        justifyContent:"center"
    }
})