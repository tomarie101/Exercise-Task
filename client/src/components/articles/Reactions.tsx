import axios from "axios";

// Define the types for reactions
export type ReactionType = "LIKE" | "DISLIKE";

// Define the interface for a user
export interface User {
  id: number;
}

// Define the interface for a reaction
export interface Reaction {
  userId: number;
  articleId: number;
  type: ReactionType;
}

// Function to fetch reactions for a given article
export const fetchReactions = async (): Promise<Record<number, Reaction[]>> => {
  try {
    // Make a GET request to the API endpoint to fetch reactions
    const response = await axios.get(
      "http://localhost:3000/api/reactions/${articleId}"
    );
    // Return the reactions data
    return response.data;
  } catch (error) {
    // Log the error if there's a problem fetching reactions
    console.error("Failed to fetch reactions: ", error);
    // Return an empty object if there's an error
    return {};
  }
};

// Function to handle user reactions to an article
export const handleReaction = async (
  articleId: number,
  type: ReactionType,
  user: User | null,
  userReactions: Record<number, ReactionType | null>,
  setUserReactions: React.Dispatch<
    React.SetStateAction<Record<number, ReactionType | null>>
  >,
  setReactions: React.Dispatch<React.SetStateAction<Record<number, Reaction[]>>>
): Promise<void> => {
  // Check if the user is logged in
  if (!user) {
    alert("You must be logged in to react to an article.");
    return;
  }

  try {
    // Get the current reaction for the article
    const currentReaction = userReactions[articleId];

    // If the user is trying to remove their reaction
    if (currentReaction === type) {
      // Send a DELETE request to the API to remove the reaction
      await axios.delete(`http://localhost:3000/api/reactions/${articleId}`, {
        data: { userId: user.id, articleId, type },
      });
      // Update the user reactions state
      setUserReactions((prev) => ({ ...prev, [articleId]: null }));
      // Update the reactions state
      setReactions((prev) => ({
        ...prev,
        [articleId]: (prev[articleId] || []).filter(
          (reaction) => reaction.userId !== user.id
        ),
      }));
    } else {
      // If the user is trying to add or update their reaction
      // Send a POST request to the API to add or update the reaction
      const response = await axios.post(
        `http://localhost:3000/api/reactions/${articleId}`,
        {
          type,
          userId: user.id,
          articleId,
        }
      );

      // Update the user reactions state
      setUserReactions((prev) => ({ ...prev, [articleId]: type }));
      // Update the reactions state
      setReactions((prev) => ({
        ...prev,
        [articleId]: [
          ...(prev[articleId] || []).filter(
            (reaction) => reaction.userId !== user.id
          ),
          response.data,
        ],
      }));
    }
    // Log the articleId, type, user, and userReactions for debugging
    console.log("articleId:", articleId);
    console.log("type:", type);
    console.log("user:", user);
    console.log("userReactions:", userReactions);
  } catch (error) {
    // Log the error if there's a problem adding or updating the reaction
    console.error("Failed to add or update reaction", error);
  }
};

// Function to get the count of reactions of a specific type for an article
export const getReactionCount = (
  reactions: Record<number, Reaction[]>,
  articleId: number,
  type: ReactionType
): number => {
  // Filter the reactions for the given article and type
  return (
    reactions[articleId]?.filter((reaction) => reaction.type === type).length ||
    0
  );
};
