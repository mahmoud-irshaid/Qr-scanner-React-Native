import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "native-base";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [x, setx] = useState(0);
  const [y, sety] = useState(0);

  const [x2, setx2] = useState(0);
  const [y2, sety2] = useState(0);
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = (scanningResult) => {
    const { x, y } = scanningResult.bounds.origin;

    const finderWidth = 200;

    const finderHeight = 100;

    const width = Dimensions.get("window").width;

    const height = Dimensions.get("window").height;

    const viewMinX = (width - finderWidth) / 2;

    const viewMinY = (height - finderHeight) / 2;
    setx(viewMinX);
    sety(viewMinY);

    setx2(viewMinX + finderWidth / 2);
    sety2(viewMinY + finderHeight / 2);

    if (
      x >= viewMinX &&
      y >= viewMinY &&
      x <= viewMinX + finderWidth / 2 &&
      y <= viewMinY + finderHeight / 2
    ) {
      setScanned(true);
      alert(
        `Bar code with type ${scanningResult.type} and data ${scanningResult.data} has been scanned!`
      );
    }

    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {!scanned && (
        <View
          style={{
            width: "100%",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            flexDirection: "column",
          }}
        >
          <View
            style={{
              width: "100%",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="scan-outline" size={280} color="white" />
          </View>
          <View
            style={{
              width: "100%",
              alignSelf: "center",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <Ionicons name="flash" size={50} color="white" style={{}} />
            <Ionicons name="close" size={50} color="white" style={{}} />
          </View>
        </View>
      )}
      {scanned && (
        <View
          style={{
            height: "100%",
            width: "100%",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            flexDirection: "column",
            position: "absolute",
            bottom: "15%",
          }}
        >
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
          <View
            style={{
              borderWidth: 3,
              borderColor: "red",
              position: "absolute",
              width: x,
              height: y,
              top: "50%",
            }}
          ></View>
          <View
            style={{
              borderWidth: 3,
              borderColor: "red",
              position: "absolute",
              width: x2,
              height: y2,
              top: "50%",
            }}
          ></View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#000",
  },
});
