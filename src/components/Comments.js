
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList,StyleSheet } from 'react-native';

const Comments = (props) => {

  //using props we have successfuly transfered data
  //we have used only id on the basis of id we post the comments
  const [posts, setPosts] = useState([props.id]);
  const [error, setError] = useState(null);

    if(error){
      <View style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
        <Text>{error}</Text>
      </View>
    }

  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState({});

  useEffect(() => {
    loadComments();
  }, []);

  //data fetching
  const loadComments = async () => {
    try {
      const storedComments = await AsyncStorage.getItem('comments');
      if (storedComments !== null) {
        setComments(JSON.parse(storedComments));
      }
    } catch (error) {
      // console.error('Error loading comments:', error);
      setError(error)
    }
  };

  //set the data on particular id
  const saveComment = async (postId) => {
    try {
      const updatedComments = { ...comments };
      if (!updatedComments[postId]) {
        updatedComments[postId] = [];
      }
      updatedComments[postId].push(commentText);
      await AsyncStorage.setItem('comments', JSON.stringify(updatedComments));
      setComments(updatedComments);
      setCommentText('');
    } catch (error) {
      // console.error('Error saving comment:', error);
      setError(error)
    }
  };

  //remove the comments on the basis of id and index 
  const removeComment = async (postId, commentIndex) => {
    try {
      const updatedComments = { ...comments };
      updatedComments[postId].splice(commentIndex, 1);
      await AsyncStorage.setItem('comments', JSON.stringify(updatedComments));
      setComments(updatedComments);
    } catch (error) {
      // console.error('Error removing comment:', error);
      setError(error)
    }
  };


  //rendering the item
  const renderItem = ({ item, index }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <Text style={{ flex: 1 ,fontSize:15,fontWeight:'bold'}}>{item}</Text>
      <TouchableOpacity onPress={() => removeComment(item.postId, index)}>
        <Text style={{ color: 'red', marginLeft: 10 }}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}  //id of particular user 
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.id}</Text>
            <TextInput
              style={{  borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginVertical: 10 }}
              placeholder="Type your comment"
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity onPress={() => saveComment(item.id)} style={styles.postCommentBtn}>
              <Text style={styles.buttonText}>Post Your Comment</Text>
            </TouchableOpacity>
            {comments[item.id] && (
              <FlatList
                data={comments[item.id]}
                // renderItem={({ item, index }) => <Text key={index}>{item}</Text>}
                renderItem={renderItem}
                keyExtractor={(comment, index) => index.toString()}
              />
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  postCommentBtn:{
    backgroundColor:'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width:'100%',
    
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:15
  },
})

export default Comments;

