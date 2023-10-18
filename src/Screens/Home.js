import React, { useEffect, useState } from 'react'
import { Button, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

export default function Home({ navigation }) {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);
    const [itemId, setItemId] = useState();
    const [isAdded, setIsAdded] = useState(false);
    const width = Dimensions.get('window').width;

    useEffect(() => {
        getProductData();
    }, [])

    const getProductData = async () => {
        try {
            const url = "http://10.0.2.2:3000/Products"
            let result = await fetch(url);
            result = await result.json();
            setData(result);
        }
        catch (error) {
            console.log("error", error);
        }
    }

    const addToCart = async (itemId) => {
        try {
            const url = `http://10.0.2.2:3000/Products/${itemId}`;
            let result = await fetch(url);
            result = await result.json();
            setCart([...cart, result]);
            navigation.navigate("AddItem", { cart: [...cart, result] })
        } catch (error) {
            console.log("error", error);
        }
    };

    console.log("cart :", cart);


    // const handleSubmit = async () => {
    //     try {
    //         const url = "http://10.0.2.2:3000/Products"
    //         let result = await fetch(url, {
    //             method: 'POST',
    //             headers: { 'content-type': "application/json" },
    //             body: JSON.stringify(data)
    //         });
    //         result = await result.json();
    //         setData([...data, result]);
    //         console.warn('Job posted successfully!');
    //         setData('');
    //     }
    //     catch (error) {
    //         console.log("error", error);
    //     }
    // }

    const renderImage = (item) => {
        return (
            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                <ImageBackground
                    key={item?.id}
                    source={{ uri: item?.img }}
                    resizeMode='contain'
                    style={{ height: width / 2, width: '90%', aspectRatio: 2, }}
                />
            </View>
        );
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Foods</Text>
                </View>
                <View style={styles.prodView}>
                    {data?.map((item) => {
                        const isItemAdded = isAdded && itemId === item.id;
                        return <View key={item?.id} style={styles.itemView}>
                            <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <SwiperFlatList
                                    style={{ flex: 1 }}
                                    autoplay
                                    autoplayDelay={2}
                                    autoplayLoop
                                    // index={2}
                                    showPagination={false}
                                    data={item?.image}
                                    renderItem={({ item }) => renderImage(item)}
                                />
                            </View>
                            <View style={{ padding: 10, marginBottom: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 }}>
                                    <View><Text style={styles.prodTitle}>{item.name}</Text></View>
                                    <View style={styles.ratingView}><Text style={[styles.prodTitle, { color: '#fff' }]}>{item.ratings}</Text></View>
                                </View>
                                <View><Text style={styles.descriptionText}>Fast Food {'\u25CF'} ₹{item.price} {'\u25CF'} for one</Text></View>
                                <View><Text style={styles.descriptionText}>{item.time} {'\u25CF'} {item.km}</Text></View>
                                <View><Text style={[styles.descriptionText, { fontSize: 20, color: '#d3d3d3' }]}>------------------------------------------------------------</Text></View>

                                <TouchableOpacity
                                    style={[styles.btnView, isItemAdded && { backgroundColor: '#ccc' }]}
                                    onPress={() => {
                                        addToCart(item?.id);
                                    }}
                                    disabled={isItemAdded}
                                >
                                    <Text style={[styles.prodTitle, { color: '#fff', fontSize: 18 }]}>
                                        {isItemAdded ? 'Item Added' : 'Add Item'}
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    })}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        shadowColor: '#000',
        elevation: 5,
        shadowOpacity: 0.8
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#000',
        alignSelf: 'center'
    },
    prodView: {
        // width: '100%',
        margin: 10,
        padding: 10
    },
    itemView: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#d3d3d3',
        borderRadius: 15,
        marginVertical: 10,
        // padding: 18,
        shadowColor: '#000',
        elevation: 5,
        backgroundColor: '#f2f2f2',
    },
    prodTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#000'
    },
    ratingView: {
        paddingHorizontal: 10,
        backgroundColor: 'green',
        borderRadius: 5
    },
    descriptionText: {
        color: '#666',
        fontSize: 16,
    },
    btnView: {
        backgroundColor: '#d9001b',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }
})