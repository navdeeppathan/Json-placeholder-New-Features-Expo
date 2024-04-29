import { View, Text,Pressable } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LikedButton() {
    const [liked, setLiked] = useState(false);
  
    return (
      <Pressable style={{position:"absolute",right:20,top:15}} onPress={() => setLiked((isLiked) => !isLiked)}>
        <MaterialCommunityIcons
          name={liked ? "heart" : "heart-outline"}
          size={32}
          color={liked ? "red" : "black"}
        />
      </Pressable>
    );
}