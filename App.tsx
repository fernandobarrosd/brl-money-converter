import { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TextInput, Keyboard } from "react-native";
import { MoneyCard } from "./src/components/MoneyCard";
import LoadingButton, { LoadingButtonRef } from "./src/components/LoadingButton";
import { SocialMedia, SocialMediaButtonLink } from "./src/components/SocialMediaButtonLink";


type Response = {
  USD_BRL: {
    price: number
  }
}

const moneyImage = require("./assets/icons/icon-rounded.png");
const apiToken = "6178|FLcm3idUA3688ln3WhnYZN3Fl3XXglYY";
const moneyConverterRequestURL = `https://api.invertexto.com/v1/currency/USD_BRL?token=${apiToken}`;

const socialMedias : SocialMedia[] = [
  {
    name: "linkedin",
    link: "https://www.linkedin.com/in/fernando-de-barros-204864241/",
  },
  {
    name: "github",
    link: "https://github.com/fernandobarrosd"
  },
  {
    name: "twitter",
    link: "https://twitter.com/fbarrosdev"
  }
  
];

export default function App() {
  const [ BRLMoneyValue, setBRLMoneyValue ] = useState(0.00);
  const [ USDMoneyValue, setUSDMoneyValue] = useState(0.00);
  const loadingButtonRef = useRef<LoadingButtonRef>(null);

  
  async function handlePressButtonConverter() {
    Keyboard.dismiss();
    try {
      loadingButtonRef.current?.disabled();
      const response = await fetch(moneyConverterRequestURL);
      const { USD_BRL: { price: dolarCottacion } } = await response.json() as Response;
      setUSDMoneyValue(BRLMoneyValue / dolarCottacion);
    
    }
    finally {
      loadingButtonRef.current?.activate();
    }
  }

  function handleTextChange(newTextValue: string) {
    if (newTextValue) {
      setBRLMoneyValue(parseFloat(newTextValue));
    }
    else {
      setBRLMoneyValue(0.00);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <View style={styles.links}>
        {socialMedias.map((socialMedia, index) => (
          <SocialMediaButtonLink
          key={index}
          socialMedia={{
            name: socialMedia.name,
            link: socialMedia.link}}/>
        ))}
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

      <LoadingButton
      buttonTitle="Converter"
      onPress={handlePressButtonConverter}
      ref={loadingButtonRef}/>

      
      <View style={styles.cards}>
        <MoneyCard
        currency="USD"
        locale="en-us"
        moneyValue={USDMoneyValue}/>

        <MoneyCard
        currency="BRL"
        locale="pt-br"
        moneyValue={BRLMoneyValue}/>
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
    gap: 20,

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
  cards: {
    alignItems: "center",
    
    width: 400,
    marginTop: 50,
  }
});