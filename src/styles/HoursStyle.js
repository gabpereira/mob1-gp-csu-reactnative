import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: null,
        height: Dimensions.get('window').height,
    },
    text: {
        fontSize: 16,
        color: "white",
        fontWeight: 'bold',
        marginTop: 10,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft:20,
    },

    pastille: {
        fontSize: 16,
        color: "white",
        fontWeight: 'bold',
        backgroundColor: 'green',
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 100,
    },
    
    container: {
		backgroundColor: 'rgba(0, 0, 0, 0.45)',
		borderColor: "black",
		borderWidth: 1,
		marginVertical:10,
		borderColor: 'transparent',
		borderRadius: 10,
    },
    
    button: {
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
})
export default styles; 