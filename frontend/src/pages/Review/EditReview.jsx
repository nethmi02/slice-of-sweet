export const fetchReview = async (itemCode, userName) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/reviews?itemCode=${itemCode}&userName=${userName}`
    );
    if (response.ok) {
      const review = await response.json();
      return review;
    } else {
      console.error("Failed to fetch review.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching review:", error);
    return null;
  }
};

export const isEditable = (submissionTime) => {
  const reviewDate = new Date(submissionTime);
  const currentDate = new Date();
  const differenceInDays = (currentDate - reviewDate) / (1000 * 3600 * 24); // Convert ms to days
  return differenceInDays <= 7;
};

export const submitReview = async (reviewData, isEditMode) => {
  const url = isEditMode
    ? `http://localhost:3001/api/reviews/${reviewData.id}` // Assuming review ID is passed for updates
    : "http://localhost:3001/api/reviews";

  const method = isEditMode ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (response.ok) {
      console.log(
        isEditMode
          ? "Review updated successfully!"
          : "Review submitted successfully!"
      );
      return true;
    } else {
      console.error("Failed to submit review.");
      return false;
    }
  } catch (error) {
    console.error("Error submitting review:", error);
    return false;
  }
};
