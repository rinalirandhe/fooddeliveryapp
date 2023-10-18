import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist'

export default function AddItem({ route }) {
    const [data, setData] = useState([]);
    const width = Dimensions.get('window').width;

    useEffect(() => {
        setData(route?.params?.cart);
    }, [route?.params?.cart])

    console.log("data", data);
    console.log("route", route?.params);

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

    const removeFromCart = async (itemId) => {
        try {
            const url = `http://10.0.2.2:3000/Products/${itemId}`;
            const result = await fetch(url, {
                method: 'DELETE',
            });
            if (result.ok) {
                console.warn("Item Succesfully Remove from Cart!");
                setData(prevData => prevData.filter(item => item.id !== itemId));
            } else {
                // Handle error
                console.error('Error removing item from cart:', result.status);
            }
        }
        catch (error) {
            console.log("error", error);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Cart</Text>
                </View>
                <View style={styles.prodView}>
                    {data?.map((item) => {
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
                                <TouchableOpacity style={styles.btnView} onPress={() => removeFromCart(item?.id)}>
                                    <Text style={[styles.prodTitle, { color: '#fff', fontSize: 18 }]}>Remove Item </Text>
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
