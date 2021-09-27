import * as React from 'react';
import {Text,View} from '../components/Themed'
import {Button,ListRenderItemInfo,StyleSheet} from 'react-native'
type Props = {
    name: string
}


const Company = (listRenderItemInfo: ListRenderItemInfo<Props>) => {

    const style = StyleSheet.create({
        item: {
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
        name: {
        fontSize: 20,
        marginRight:"10%"
        },
        separator: {
        marginVertical:5,
        height: 1,
        width: '80%',
        },
    })

    return (
        <>
        
        <View　style={style.item}>
            <Text style={style.name}>{listRenderItemInfo.item.name}</Text>
            <Button 
            title="承認"
            onPress={() => alert('Simple Button pressed')}
            />
        </View>
        <View style={style.separator} lightColor="black" darkColor="white"/>
        </>
    )

    
}

export default Company