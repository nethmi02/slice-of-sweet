import User from "../../data/user";

export const fetchReview = async (itemCode, userName) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/reviews?itemCode=${encodeURIComponent(itemCode)}&userName=${encodeURIComponent(userName)}`
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

export const submitReview = async (reviewData) => {
  const url = `http://localhost:3001/api/reviews`;

  const method = "POST";

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${User.instance.token}`,
      },
      body: JSON.stringify(reviewData),
    });

    if (response.ok) {
      console.log("Review submitted successfully!");
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
