import { useState } from "react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";

const Reactions = ({ onClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleLiked = () => {
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
      setIsDisliked(false);
      onClick();
    }
  };

  const handleDisliked = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      setIsLiked(false);
      onClick();
    }
  };

  return (
    <div className="flex items-center gap-2 ">
      {isLiked ? (
        <AiFillLike color="blue" onClick={handleLiked} />
      ) : (
        <AiOutlineLike onClick={handleLiked} />
      )}
      {isDisliked ? (
        <AiFillDislike color="red" onClick={handleDisliked} />
      ) : (
        <AiOutlineDislike onClick={handleDisliked} />
      )}
    </div>
  );
};

export default Reactions;
