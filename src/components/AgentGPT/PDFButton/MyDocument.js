import React from "react";
import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const getFontUrlForLanguageCode = (languageCode) => {
  switch (languageCode) {
    case "en":
      return ""; // Do not use a custom font for English

    default:
      return "/fonts/Roboto-Regular.ttf";
  }
};

const getFontUrl = () => getFontUrlForLanguageCode("en");

Font.register({
  family: "customFont",
  src: getFontUrl(),
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 40,
    wordBreak: "break-all",
  },
  horizontalRule: {
    borderBottomWidth: 0.3,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  section: {
    fontSize: 10,
    ...(getFontUrl() === "" ? {} : { fontFamily: "customFont" }),
    marginVertical: 10,
    lineHeight: 1.5,
    wordBreak: "break-all",
    paddingRight: 10,
  },
});

// NOTE: This should only ever be imported dynamically to reduce load times
const MyDocument = ({ textSections }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {textSections.map((text, index) => (
        <React.Fragment key={index}>
          <Text style={styles.section}>{renderTextLines(text)}</Text>
          <HorizontalRule />
        </React.Fragment>
      ))}
    </Page>
  </Document>
);

const HorizontalRule = () => <View style={styles.horizontalRule} />;

const renderTextLines = (text) => {
  const MAX_LINE_LENGTH = 10;
  const lines = [];
  let start = 0;
  while (start < text.length) {
    const end = start + MAX_LINE_LENGTH;
    const line = text.slice(start, end);
    lines.push(line);
    start = end;
  }
  return lines.map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};

export default MyDocument;
