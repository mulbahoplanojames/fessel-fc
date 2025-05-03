import axios from "axios";

export async function deletePlayer(id: string): Promise<void> {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URI}/api/player/${id}`);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete player"
    );
  }
}

export async function deleteMatch(id: string): Promise<void> {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URI}/api/match/${id}`);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete match"
    );
  }
}

export async function deleteNews(id: string): Promise<void> {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URI}/api/news/${id}`);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete news"
    );
  }
}
