import { useState } from "react";

interface VoteButtonProps {
  userId: string;
  articleId: string;
  type: "up" | "down";
}

const VoteButton: React.FC<VoteButtonProps> = ({ userId, articleId, type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVote = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await voteOnArticle(userId, articleId, type);
      // Handle successful vote (e.g., update UI, show a message)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleVote} disabled={isLoading}>
        {type === "up" ? "👍" : "👎"} {isLoading ? "Voting..." : "Vote"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default VoteButton;
