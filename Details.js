import React, {useEffect, useState} from 'react'
import { Text, View } from 'react-native'

export default function Details({navigation, route}) {
    const [album, setAlbum] = useState(route.params?.album)
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false)


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/' + album.userId)
        .then((response) => response.json())
        .then((json) => {
            setUser(json)
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
        <View>
            <Text>{album.name}</Text>
            <Text>{user.name}</Text>
        </View>
    )
}
