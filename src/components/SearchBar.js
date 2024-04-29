import { View, Text,StyleSheet,TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import LikedButton from './LikedButton';
import JSONItem from './JSONItem';

export default function SearchBar(props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    
    const handleSearch = (text) => {
        setSearchQuery(filteredData);
        filterData(text);
      };
      const filterData = (text) => {
        const filtered = props.data.filter(item =>
          item.title.toLowerCase().includes(text)
        );
        setFilteredData(filtered);
      };
      
  return (
    <View>
    <View style={styles.searchBarContainer}>
      
       <TextInput placeholder='Search'
       style={styles.textInput} 
       value={searchQuery}
       clearButtonMode='always'
       autoCorrect={false}
       autoCapitalize='none'
       onChangeText={(text)=>handleSearch(text)}
       />
       <FontAwesome
        name="search" 
       size={24} 
       color={'#8E3FFF'} 
       style={styles.searchBtn}/>

    </View>
    <View>
        <FlatList
         data={filteredData.length>0?filteredData:<JSONItem/>}
         renderItem={({item})=>(
          <ScrollView>
            
            <View style={{
          marginTop:10,
          padding:15,backgroundColor:"white"}}>
            <JsonBody body={item.body} userId={item.userId}  />
            <JsonInfo 
        id={item.id}
        title={item.title}
      />
            </View>
            </ScrollView>
         )}
         keyExtractor={(item)=>item.id.toString()}
        
        />

        
       </View>
    </View>
  )
}
const styles = StyleSheet.create({
    textInput:{
        padding:7,
        paddingHorizontal:16,
        backgroundColor:'#ffff',
        borderRadius:8,
        width:'80%' ,
        fontSize:16,
        fontFamily:'outfit-bold'
    },
    searchBarContainer:{
        marginTop:15,
        display:'flex',
        flexDirection:'row',
        gap:10,
        marginBottom:10,
    },
    searchBtn:{
        backgroundColor:'#ffff',
        padding:10,
        borderRadius:8
     },
})
const JsonBody=(props)=>(
  <>
 <Text style={{width:"100%", height:50 ,backgroundColor:'#EDEDED',padding:15,borderTopLeftRadius:15,borderTopRightRadius:15}}>{props.userId}</Text>
  <Text style={{width:"100%", height:180 ,backgroundColor:'#EDEDED',padding:20,borderBottomLeftRadius:15,borderBottomRightRadius:15}}>{props.body}
  </Text>
 
  <LikedButton/>
  
  </>
)
const JsonInfo=(props)=>(
  <View 
  style={{
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      marginTop:10,

  }}>
      <View>
      <Text style={{fontSize:15,fontWeight:'bold',padding:10}} >{props.title}</Text>
      </View>
      <View style={{
          backgroundColor:"#eee",
          height:30,
          width:30,
          alignItems:"center",
          justifyContent:"center",
          borderRadius:15}}>
      <Text style={{fontWeight:'600'}} >{props.id}</Text>
      </View>
  </View>
)