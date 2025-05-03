import axios from "axios";

export const handlePlayersFetch = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URI}/api/player`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("Error fetching players", error);
    return [];
  }
};

export const handleMatchFetch = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URI}/api/match`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("Error fetching Matches", error);
    return [];
  }
};

export const handleNewsFetch = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URI}/api/news`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("Error fetching news", error);
    return [];
  }
};
