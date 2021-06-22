import { StyleSheet, Dimensions, YellowBox } from 'react-native';

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
        fontSize: 15,
        paddingRight: 10,
        color: 'white',
    },
    background: {
        flex: 1,
        width: null,
        height: Dimensions.get('window').height,
    },
    buttonLogout: {
        width: "96%", 
        marginLeft: "2%",
        flexDirection: 'row', 
        height: 70, 
        backgroundColor: 'rgb(33, 150, 243)',
        alignItems: 'center',
        justifyContent: 'center',
        elevation:3,
        marginBottom: 30,
    },
    textLogout: {
        fontSize: 16,
        color: "white",
        fontWeight: 'bold',
    },

    pastille: {
        fontSize: 16,
        color: "white",
        fontWeight: 'bold',
        backgroundColor: 'green',
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 100,
    }
});

export default styles; 