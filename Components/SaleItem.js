// SaleItem.js
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Title, Paragraph, IconButton } from "react-native-paper";
import StarRating from "react-native-star-rating";

const SaleItem = ({
  title,
  price,
  dateTime,
  rating,
  customerName,
  comment,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleMode = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={styles.offerContainer}>
      <Card.Content style={styles.contentContainer}>
        {/* Title and Expand-Shrink Icon */}
        <View style={styles.titleContainer}>
          <Title style={styles.title}>{title}</Title>
          <IconButton
            icon={expanded ? "chevron-up" : "chevron-down"}
            size={20}
            onPress={handleToggleMode}
          />
        </View>
        {/* Date and Time */}
        <Paragraph style={styles.saleDateTime}>{dateTime}</Paragraph>
        {/* Price and Star Rating */}
        <View style={styles.descriptionContainer}>
          {rating < 0 ? (
            <Paragraph style={styles.saleRating}>No rating yet</Paragraph>
          ) : (
            <StarRating
              disabled={true}
              maxStars={5}
              rating={rating}
              starSize={14}
              fullStarColor="#fcba03"
              emptyStarColor="grey"
            />
          )}
          <Paragraph style={styles.price}>₺{price}</Paragraph>
        </View>
        {expanded && (
          <>
            {customerName && (
              <Paragraph style={styles.saleRating}>
                Customer: {customerName}
              </Paragraph>
            )}
            {comment && (
              <View style={styles.reviewContainer}>
                <Paragraph>{comment}</Paragraph>
              </View>
            )}
            {customerName && !comment && (
              <Paragraph style={styles.noCommentText}>
                No comments yet
              </Paragraph>
            )}
          </>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  offerContainer: {
    backgroundColor: "#fff",
    borderColor: "#f26f55",
    borderWidth: 2,
    margin: 16,
  },
  reviewContainer: {
    backgroundColor: "#fff",
    borderColor: "#f26f55",
    borderWidth: 2,
    margin: 16,
    padding: 8,
    borderRadius: 10,
  },
  contentContainer: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  saleDateTime: {
    fontSize: 14,
    color: "grey",
  },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    color: "green",
  },
  saleRating: {
    fontSize: 14,
    color: "grey",
  },
  noCommentText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "grey",
  },
});

export default SaleItem;