import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../src/components/userState";

interface Reaction {
  id: number;
  type: string;
  userId: number;
}

export default function Reactions({ articleId }: { articleId: number }) {
  const [reactions, setReactions] = useState<Record<number, Reaction[]>>({});
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(userState); // Correct way to access Recoil state

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/reactions?articleId=${articleId}`
        );
        setReactions((prevReactions) => ({
          ...prevReactions,
          [articleId]: response.data,
        }));
      } catch (error) {
        console.error("Failed to fetch reactions: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReactions();
  }, [articleId]);

  const handleReaction = async (articleId: number, type: string) => {
    if (!user.id) {
      alert("You must be logged in to react to an article.");
      return;
    }

    try {
      const userId = user.id;
      const existingReaction = reactions[articleId]?.find(
        (reaction) => reaction.userId === userId
      );

      if (existingReaction) {
        if (existingReaction.type === type) {
          // Remove existing reaction
          await axios.delete(
            `http://localhost:3000/api/reactions/${existingReaction.id}`,
            {
              data: { userId },
            }
          );
          setReactions((prevReactions) => ({
            ...prevReactions,
            [articleId]: prevReactions[articleId].filter(
              (reaction) => reaction.id !== existingReaction.id
            ),
          }));
        } else {
          // Update existing reaction
          await axios.put(
            `http://localhost:3000/api/reactions/${existingReaction.id}`,
            { type, userId }
          );
          setReactions((prevReactions) => ({
            ...prevReactions,
            [articleId]: prevReactions[articleId].map((reaction) =>
              reaction.id === existingReaction.id
                ? { ...reaction, type }
                : reaction
            ),
          }));
        }
      } else {
        // Create a new reaction
        const response = await axios.post(
          `http://localhost:3000/api/reactions`,
          {
            type,
            userId,
            articleId,
          }
        );
        setReactions((prevReactions) => ({
          ...prevReactions,
          [articleId]: [...(prevReactions[articleId] || []), response.data],
        }));
      }
    } catch (error) {
      console.error("Failed to add or update reaction: ", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => handleReaction(articleId, "like")}>Like</button>
      <button onClick={() => handleReaction(articleId, "dislike")}>
        Dislike
      </button>
      <div>
        {reactions[articleId]?.map((reaction) => (
          <div key={reaction.id}>
            {reaction.type} by {reaction.userId}
          </div>
        ))}
      </div>
    </div>
  );
}
