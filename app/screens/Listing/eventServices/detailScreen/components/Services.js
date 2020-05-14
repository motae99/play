import React from "react";
import { StyleSheet, View, Text } from "react-native";



const styles = StyleSheet.create({
  item: {
    borderBottomColor: "#e2e3e4",
    borderBottomWidth: 1,
    marginTop: 16
  },
  title: {
    fontFamily: "UberMoveMedium",
    fontSize: 16,
    marginBottom: 8
  },
  description: {
    marginBottom: 8
  },
  price: {
    fontFamily: "UberMoveMedium",
    marginBottom: 16
  }
});

const items = [
  {
    title: "Long Hongdae Nights",
    description:
      "Korean fried chicken glazed with Gochujang, garnished with sesame & spring onions, served with fries & Miss Miu Mayo",
    price: "26 CHF"
  },
  {
    title: "Late Sunset",
    description:
      "Korean fried chicken starter with dirty cheese sauce and Artisan Hot Sauce - the naughty version new, favourite",
    price: "13.50 CHF"
  },
  {
    title: "Cabbage Kimchi",
    description: "Portion, vegan",
    price: "5.00 CHF"
  },
  {
    title: "Namur by Pieces",
    description:
      "Homemade steamed dim sum with minced pork, shiitake mushrooms and smokey honey flavour, four pcs",
    price: "10.50 CHF"
  },
  {
    title: "Silim Lights",
    description:
      "Beef Bibimbap, sesame oil, rice, beans, spinach, carrots, spring onions, Chinese cabbage, shiitake mushrooms, roasted onions and egg",
    price: "26.50 CHF"
  }
];


export default ({ name }) => {
  return (
    items.map(({ title, description, price }, j) => (
      <View style={styles.item} key={j}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    )
    )
  )



}
