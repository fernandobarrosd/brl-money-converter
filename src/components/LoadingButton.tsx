import { forwardRef, useImperativeHandle, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";

export type LoadingButtonRef = {
    disabled() : void
    activate() : void
}

type LoadingButtonProps = {
    buttonTitle: string
    onPress() : void
}

export default forwardRef<LoadingButtonRef, LoadingButtonProps>(
    function LoadingButton({ buttonTitle, onPress }, ref) {
        const [ isLoading, setIsLoading ] = useState(false);
        
        function disabled() {
            setIsLoading(true);
        }
        function activate() {
            setIsLoading(false);
        }

        useImperativeHandle(ref, () => ({
            disabled,
            activate
        }));


        return (
            <TouchableOpacity onPress={onPress}
            activeOpacity={0.7}
            style={styles.button}
            disabled={isLoading}>
                { isLoading ? 
                    <ActivityIndicator size={19} color="#FFFFFF"/> : 
                    <Text style={styles.buttonText}>{buttonTitle}</Text>
                }
            </TouchableOpacity>
        );
    }
    
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#2a5d36",
        padding: 15,
        borderRadius: 4,
        width: 150,
        marginTop: 30
      },
      
      buttonText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 14
      },
});