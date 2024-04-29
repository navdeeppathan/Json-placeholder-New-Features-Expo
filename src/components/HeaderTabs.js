import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function HeaderTabs() {
    const [activeTab,setActiveTab]=useState("");
  return (
   <View style={{padding:20 ,alignItems:'center',marginTop:20}}>
    <Text style={{fontSize:15,fontWeight:'bold'}}>POST</Text>
   </View>
  )
}


