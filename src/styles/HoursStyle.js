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
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
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
})
export default styles; 