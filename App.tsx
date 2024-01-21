import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { 
  StyleSheet, 
  Linking,
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  Keyboard, 
  ActivityIndicator } from "react-native";


type Response = {
  USD_BRL: {
    price: number
  }
}
const moneyImage = require("./assets/icons/icon-rounded.png");
const apiToken = "6178|FLcm3idUA3688ln3WhnYZN3Fl3XXglYY";
const moneyConverterRequestURL = `https://api.invertexto.com/v1/currency/USD_BRL?token=${apiToken}`;
const links = {
  linkedin: "https://www.linkedin.com/in/fernando-de-barros-204864241/",
  github: "https://github.com/fernandobarrosd",
  twitter: "https://twitter.com/fbarrosdev"
};

export default function App() {
  const [ BRLMoneyValue, setBRLMoneyValue ] = useState(0.00);
  const [ USDMoneyValue, setUSDMoneyValue] = useState(0.00);
  const [ isLoading, setIsLoading ] = useState(false);

  async function handleLink(link: "github" | "linkedin" | "twitter") {
    await Linking.openURL(links[link]);
  }
  
  async function onPressButtonConverter() {
    Keyboard.dismiss();
    try {
      setIsLoading(true);
      const response = await fetch(moneyConverterRequestURL);
      const { USD_BRL: { price: dolarCottacion } } = await response.json() as Response;
      setUSDMoneyValue(BRLMoneyValue / dolarCottacion);
    
    }
    finally {
      setIsLoading(false);
    }
  }

  function handleTextChange(newTextValue: string) {
    if (newTextValue) {
      setBRLMoneyValue(parseFloat(newTextValue.replace(",", ".")));
    }
    else {
      setBRLMoneyValue(0.00);
    }
  }

  function convertMoneyToText(moneyValue: number) {
    if (moneyValue.toString() === "NaN") {
      moneyValue = 0;
    }
    return parseFloat(moneyValue.toString())
    .toFixed(2).replace("." , ",");
  }
  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <View style={styles.links}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => handleLink("github")}>
          <FontAwesome name="github" color="#FFFFFF" size={30}/>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={() => handleLink("linkedin")}>
          <FontAwesome name="linkedin" color="#FFFFFF" size={30}/>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={() => handleLink("twitter")}>
          <FontAwesome name="twitter" color="#FFFFFF" size={30}/>
        </TouchableOpacity>
      </View>
      
      <View style={styles.logoContainer}>
        <Image source={moneyImage} style={styles.image}/>
        <Text style={styles.title}>BRL Money Converter</Text>
      </View>
      <TextInput textAlign="center" multiline 
      style={styles.textInput}
      placeholder="BRL Value" 
      keyboardType="decimal-pad"
      onChangeText={handleTextChange}/>

      <TouchableOpacity onPress={onPressButtonConverter}
      activeOpacity={0.7}
      style={styles.button}
      disabled={isLoading}>
        { isLoading ? 
        <ActivityIndicator size={19} color="#FFFFFF"/> : 
        <Text style={styles.buttonText}>Converter</Text>
        }
      </TouchableOpacity>

      <View style={styles.cards}>
        <View style={styles.moneyCard}>
          <Text style={styles.moneyCardTitle}>USD</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" 
          style={styles.moneyCardText}>
            $ {convertMoneyToText(USDMoneyValue)}
          </Text>
        </View>
        <View style={styles.moneyCard}>
          <Text style={styles.moneyCardTitle}>BRL</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" 
          style={styles.moneyCardText}>
            R$ {convertMoneyToText(BRLMoneyValue)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A964C",
    alignItems: "center",
    justifyContent: "center"
  },

  links: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 50,
    right: 40,
    gap: 20
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 19,
    marginTop: 30
  },

  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    color: "#FFFFFF"
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    width: 180,
    padding: 7,
    borderRadius: 4,
    marginTop: 40,
    fontSize: 18,
  },
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
  cards: {
    alignItems: "center",
    
    width: 400,
    marginTop: 50,
  },
  moneyCard: {
    backgroundColor: "#FFFFFF",
    marginLeft: 15,
    marginTop: 20,
    alignItems: "center",
    padding: 15,
    borderRadius: 4
  },
  moneyCardTitle: {
    fontSize: 15,
    color: "#827D7D",
    width: 100,
    textAlign: "center"
  },
  moneyCardText: {
    fontSize: 30,
    width: 250,
    textAlign: "center"
  }
});