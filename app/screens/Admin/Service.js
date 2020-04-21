import React, {Fragment, memo, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native";

import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import ErrorMessage from "../../components/ErrorMessage";


const validationSchema = Yup.object().shape({
  service: Yup.string()
    .label("Service Name")
    .required()
    .min(4, "Must have at least 4 characters")
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  buttonContainer: {
    margin: 25
  }
});

export default memo(() => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    let user =  await auth().currentUser;
    setUser(user)
  }
  getUser()

  console.log(user)

  const handleonAdd = async (values, actions) => {
    const { service } = values;
    try {
     
     const arrayUnion = firebase.firestore.FieldValue.arrayUnion(service);

      try{
        await firebase.firestore().collection("partyHalls").doc(user.uid)
        .update({
          [service] : arrayUnion,
        });
      }
      catch (error){
        await firebase.firestore().collection("partyHalls").doc(user.uid)
        .set({
          [service] : arrayUnion,
        });
      }

    } catch (error) {
      // console.error(error);
      Alert.alert('please Ya :) login as a provider user Ok');
      actions.setFieldError("general", error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <ScrollView>
      <Formik
        initialValues={{
          service: ""
        }}
        onSubmit={(values, actions) => { handleonAdd(values, actions); }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          values,
          handleSubmit,
          errors,
          isValid,
          touched,
          handleBlur,
          isSubmitting,
          setFieldValue
        }) => (
          <Fragment>
            <FormInput
              name="service"
              value={values.service}
              onChangeText={handleChange("service")}
              placeholder="Enter your service"
              iconName="md-person"
              iconColor="#2C384A"
              onBlur={handleBlur("service")}
            />
            <ErrorMessage
              errorValue={touched.partyHallName && errors.partyHallName}
            />

            <View style={styles.buttonContainer}>
              <FormButton
                buttonType="outline"
                onPress={handleSubmit}
                title="ADD A Service"
                buttonColor="#F57C00"
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
              />
            </View>
            <ErrorMessage errorValue={errors.general} />
          </Fragment>
        )}
      </Formik>
    </ScrollView>
  );
});
