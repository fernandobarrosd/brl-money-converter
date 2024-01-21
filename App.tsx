import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { 
  StyleSheet, 
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
  
const moneyImage = require("./assets/images/money.png");

const API_TOKEN = "6178|FLcm3idUA3688ln3WhnYZN3Fl3XXglYY";
const MONEY_CONVERTER_REQUEST_URL = `https://api.invertexto.com/v1/currency/USD_BRL?token=${API_TOKEN}`;

export default function App() {
  const [ BRLMoneyValue, setBRLMoneyValue ] = useState("");
  const [ USDMoneyValue, setUSDMoneyValue] = useState(0.00);
  const [ isLoading, setIsLoading ] = useState(false);
  
  async function onPressButtonConverter() {
    Keyboard.dismiss();
    try {
      setIsLoading(true);
      const response = await fetch(MONEY_CONVERTER_REQUEST_URL);
      const { USD_BRL: { price: dolarCottacion } } = await response.json() as Response;
      const BRLMoneyValueToFloat = parseFloat(BRLMoneyValue
      .replaceAll("-", "")
      .replaceAll(",", "."));

      setUSDMoneyValue(BRLMoneyValueToFloat / dolarCottacion);
    }
    finally {
      setIsLoading(false);
    }
  }

  function handleTextChange(newTextValue: string) {
    if (newTextValue) {
      setBRLMoneyValue(newTextValue
        .replaceAll(",", ",")
        .replaceAll(".", ".")
        .replaceAll("-", "")
        .trim());
    }
    else {
      setBRLMoneyValue("");
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
      <View style={styles.logoContainer}>
        <Image source={moneyImage} style={styles.image}/>
        <Text style={styles.title}>BRL Money Converter</Text>
      </View>
      <TextInput
      value={BRLMoneyValue}
      textAlign="center"
      multiline
      style={styles.textInput}
      placeholder="BRL Value" 
      keyboardType="decimal-pad"
      onChangeText={handleTextChange}/>

      <TouchableOpacity
      onPress={onPressButtonConverter}
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
          <Text 
          numberOfLines={1} 
          ellipsizeMode="tail" 
          style={styles.moneyCardText}>
            $ {convertMoneyToText(USDMoneyValue)}
          </Text>
        </View>



        <View style={styles.moneyCard}>
          <Text style={styles.moneyCardTitle}>BRL</Text>
          <Text 
          numberOfLines={1} 
          ellipsizeMode="tail" 
          style={styles.moneyCardText}>
            R$ {convertMoneyToText(parseFloat(BRLMoneyValue))}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6BDE6E",
    alignItems: "center",
    justifyContent: "center",
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 30
  },

  image: {
    width: 100,
    height: 100
  },
  title: {
    fontSize: 25,
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
    backgroundColor: "#5B8B5D",
    padding: 15,
    borderRadius: 4,
    width: 150,
    marginTop: 30
  },
  
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
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