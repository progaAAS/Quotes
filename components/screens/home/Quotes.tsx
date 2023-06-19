import React, {useEffect} from 'react';
import {
    ActivityIndicator,
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    View
} from "react-native";
import currency from './models/store/Currency';
import {observer} from "mobx-react-lite";
import {useFocusEffect} from "@react-navigation/native";
import {IData} from "./models/types/Quotes";
import {converterData} from "../../../shared/lib/converterData";

const Quotes = observer(() => {

    useEffect(() => {
        currency.setIsLoading(true);
        currency.fetchCurrency();
    },[])

    useFocusEffect(
        React.useCallback(() => {
            const intervalId = setInterval(() => {
                currency.fetchCurrency();
            }, 5000);
            currency.setIsOnlyInterval();
            return () => clearInterval(intervalId);
        }, [])
    );

    if(currency.isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if(currency.error) {
        return (
            <View style={styles.loader}>
                <Text>{currency.error}</Text>
            </View>
        )
    }

    const renderItem = ({item}: ListRenderItemInfo<IData>) => (
        <View style={styles.row}>
            <Text style={styles.column}>{item.key}</Text>
            <Text style={styles.column}>{item.last}</Text>
            <Text style={styles.column}>{item.highestBid}</Text>
            <Text style={[styles.column, styles.right]}>{item.percentChange}</Text>
        </View>
    );

    return (
        <View>
            <FlatList
                data={converterData(currency.currency)}
                renderItem={(item) => renderItem(item)}
                keyExtractor={item => String(item.id)}
                ListHeaderComponent={
                    <View style={styles.row}>
                        <Text style={styles.header}>Name</Text>
                        <Text style={styles.header}>Last</Text>
                        <Text style={styles.header}>HighestBid</Text>
                        <Text style={styles.header}>PercentChange</Text>
                    </View>
                }
            />
        </View>
    );
});

export default Quotes;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#000',
    },
    column: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    header: {
        flex: 1,
    },
    right: {
        textAlign: 'right',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
