import { StyleSheet, Text, View } from "react-native";

type Locale = "pt-br" | "en-us";
type Currency = "USD" | "BRL";

type MoneyCardProps = {
    moneyValue: number
    locale: Locale
    currency: Currency
}

export function MoneyCard({ moneyValue, locale, currency } : MoneyCardProps) {
    function convertMoneyToText(moneyValue: number, locale: Locale, currency: Currency) {
        return Intl.NumberFormat(locale, {
            style: "currency",
            currency
        }).format(moneyValue);
    }
    return (
        <View style={styles.moneyCard}>
          <Text style={styles.moneyCardTitle}>{currency}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" 
          style={styles.moneyCardText}>
            {convertMoneyToText(moneyValue, locale, currency)}
          </Text>
        </View>
    );
}


const styles = StyleSheet.create({
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