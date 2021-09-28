import * as React from 'react';
import {Text,View} from '../components/Themed'
import {Button,ListRenderItemInfo,StyleSheet} from 'react-native'
type Props = {
    name: string
}


const Company = (listRenderItemInfo: ListRenderItemInfo<Props>) => {

    const style = StyleSheet.create({
        item: {
            height: 100,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
        name: {
        fontSize: 20,
        marginRight:"10%"
        },
        separator: {
        //marginVertical:5,
        height: 1,
        width: '100%',
        },
    })

    return (
        <>
        <View　style={style.item}>
            <View　style={{flexDirection: 'column'}}>
                <Text style={style.name}>{listRenderItemInfo.item.name}</Text>
                <Text　style={{paddingTop:10,fontSize:13}}>取ろうとしてる情報</Text>
            </View>
            <Button 
            title="承認"
            onPress={() => alert('Simple Button pressed')}
            />
            <Button 
            title="拒否"
            onPress={() => alert('Simple Button pressed')}
            />
        </View>
        <View style={style.separator} lightColor="black" darkColor="white"/>
        </>
    )

    
}

export default Company