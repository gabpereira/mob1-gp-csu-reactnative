import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        margin: 20,
        color: 'white',
    },
    inputGroups: {
        flex: 1, 
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        paddingLeft:20,
        paddingRight:20,
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        color: 'white',
    },  
    textInput: {
        flex: 1,
        color: 'white',
    },
    label: {
        flex: 0,
        fontSize: 15,
        paddingRight: 10,
        color: 'white',
    },
    background: {
        flex: 1,
        width: null,
        height: Dimensions.get('window').height,
    },
});

export default styles; 