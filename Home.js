import React, {useEffect, useState} from 'react'
import { ActivityIndicator, FlatList, TouchableOpacity, SafeAreaView, View, Text} from 'react-native';

export default function Home({navigation}) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false)


    const Row = ({album, onPress}) => {
        const [item, setItem] = useState(album)
        return (
            <TouchableOpacity onPress={(album) => onPress(item)}>
                <Text>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    const renderRow = ({item}) => <Row album={item}
        onPress = {(item) => {navigation.navigate({
            name:"Details",
            params: {album:item},
            merge:true
        })}}/>
    

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/albums')
        .then((response) => response.json())
        .then((json) => {
            setData(json)
            setIsLoading(false)
            setIsError(false)
        }).catch((error) => {
            setIsError(true)
            setIsLoading(false)
            setData([])
            console.log(error)
        })
    }, [])

    return (
        <SafeAreaView>
            {isLoading ?
                <View>
                    <ActivityIndicator size='large' color='#00ff00'/>
                    <Text>Loading albums, please wait...</Text>
                </View>
                :
                <View>
                    <FlatList
                    data={data}
                    keyExtractor={item=>item.id}
                    renderItem={renderRow}>
                    </FlatList>
                </View>
            }
        </SafeAreaView>
    )
}
