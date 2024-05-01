import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import LikedButton from './LikedButton';
import Comments from './Comments';


export const localdata = [
    {
      hello:"hello",
      name: "Benihana",
      rating: 3.7,
      title:"hello",
      body:'hello',
      userId:1,
      id:1
    },
   
  ];
  

export default function JSONItem(props) {
    
    return (
      <>
      <ScrollView>
      <View>
      <TouchableOpacity
       activeOpacity={1}
        style={{marginBottom:30}}
        >
        {props.data.map((item,index)=>( 
      <View key={index}  style={{
          marginTop:10,
          padding:15,backgroundColor:"white"}}>
        <JsonBody body={item.body} userId={item.userId} id={item.id} />
        <JsonInfo 
        id={item.id}
        title={item.title}
      />
      <Comments id={item.id}/>
      </View>
     ))}

      </TouchableOpacity>
    
      </View>
      </ScrollView>
       </>
    )
}
const JsonBody=(props)=>(
    <>
   <Text style={{width:"100%", height:50 ,backgroundColor:'#EDEDED',padding:15,borderTopLeftRadius:15,borderTopRightRadius:15}}>{props.userId}</Text>
  <Text style={{width:"100%", height:180 ,backgroundColor:'#EDEDED',padding:20,borderBottomLeftRadius:15,borderBottomRightRadius:15}}>{props.body}
  </Text>
   
    <LikedButton id={props.id} />
    
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