import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Install expo/vector-icons for heart icon
import AsyncStorage from '@react-native-async-storage/async-storage';

const LikedButton = (props) => {
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(null);

    if(error){
      <View style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
        <Text>{error}</Text>
      </View>
    }

  useEffect(() => {
    // Load like status from asyncStore
    loadLikeStatus();
  }, []);


  //get the like status from asyncStore
  const loadLikeStatus = async () => {
    try {
      const likeStatus = await AsyncStorage.getItem(`like_${props.id}`);
      if (likeStatus !== null) {
        setLiked(JSON.parse(likeStatus));
      }
    } catch (error) {
      setError(error)
    }
  };


  //set item
  const toggleLike = async () => {
    try {
      
      const newLiked = !liked;
      setLiked(newLiked);

      // Save like status to AsyncStorage
      await AsyncStorage.setItem(`like_${props.id}`, JSON.stringify(newLiked));
    } catch (error) {
      setError(error)
    }
  };

  return (
    <TouchableOpacity onPress={toggleLike}>
      <FontAwesome
        name={liked ? 'heart' : 'heart-o'}
        size={30}
        color={liked ? 'red' : 'black'}
      />
    </TouchableOpacity>
  );
};

export default LikedButton;
