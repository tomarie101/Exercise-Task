import { useState } from "react";
import { Button } from "../ui/button";

interface ExpandTextProps {
  children: React.ReactNode; // Use React.ReactNode to handle elements and strings
  maxChars: number;
}

const ExpandText = ({ children, maxChars }: ExpandTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Convert children to string and truncate if needed
  const content =
    typeof children === "string"
      ? children
      : (children as React.ReactElement).props.children;
  const text = isExpanded ? content : `${content.substring(0, maxChars)}...`;

  return (
    <div>
      <p>{text}</p>
      {content.length > maxChars && (
        <Button onClick={() => setIsExpanded((prevState) => !prevState)}>
          {isExpanded ? "Less" : "More"}
        </Button>
      )}
    </div>
  );
};

export default ExpandText;
