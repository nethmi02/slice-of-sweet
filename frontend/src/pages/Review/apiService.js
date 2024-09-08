// apiService.js

// Function to fetch user info from the backend
export const getUserInfo = async () => {
  try {
    const response = await fetch("/api/user");
    const data = await response.json();
    return data; // Expecting user data like { name: 'John Doe', id: '1234' }
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("Failed to fetch user info");
  }
};

// Function to fetch item info from the backend
export const getItemInfo = async () => {
  try {
    const response = await fetch("/api/item");
    const data = await response.json();
    return data; // Expecting item data like { _id: '5678', name: 'Cake' }
  } catch (error) {
    console.error("Error fetching item info:", error);
    throw new Error("Failed to fetch item info");
  }
};
