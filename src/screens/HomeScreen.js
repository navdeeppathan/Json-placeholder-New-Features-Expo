import { View, Text,StyleSheet,TextInput, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTabs from '../components/HeaderTabs'

import AsyncStorage from '@react-native-async-storage/async-storage';
import JSONItem from '../components/JSONItem';

import SearchBar from '../components/SearchBar';



export default function HomeScreen() {

    const [error, setError] = useState(null);

    if(error){
      <View style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
        <Text>{error}</Text>
      </View>
    }

  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      // Make API request
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const jsonData = await response.json();

      // Store data in asyncStorage
      await AsyncStorage.setItem('apiData', JSON.stringify(jsonData));
      // console.log(jsonData)
      // Update state with fetched data
      setData(jsonData);
 
    } catch (error) {
      // console.error('Error fetching data:', error);
        setError(error)
        
    }
  };
  return (
    <View style={{width:"100%" ,height:'100%'}}>
      <HeaderTabs/>
    <View>
    <SearchBar data={data}/>
    </View>
    <JSONItem data={data}/>
 
    </View>
  )
}
