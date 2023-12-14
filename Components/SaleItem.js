// SaleItem.js
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';

const SaleItem = ({ title, price, dateTime, rating }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleMode = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={styles.offerContainer}>
      <Card.Content style={styles.contentContainer}>
        {/* Title and Edit Icon */}
        <View style={styles.titleContainer}>
          <Title style={styles.title}>{title}</Title>
          <IconButton
            icon={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            onPress={handleToggleMode}
          />
        </View>

        {/* Description */}
        <Paragraph style={styles.description}>{price}</Paragraph>

        {expanded && (
          <>
            <Paragraph style={styles.saleDateTime}>{dateTime}</Paragraph>
            <Paragraph style={styles.saleRating}>Rating: {rating} stars</Paragraph>
          </>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  offerContainer: {
    backgroundColor: '#fff',
    borderColor: '#f26f55',
    borderRadius: 2,
  },
  contentContainer: {
    padding: 16,
    borderColor: "orange",  // Change border color to orange
    borderRadius: 2,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 8,
  },
  saleDateTime: {
    fontSize: 14,
    color: 'grey',
  },
  saleRating: {
    fontSize: 14,
    color: 'green',
  },
});

export default SaleItem;