// import { useState } from 'react';
// import axios from 'axios';

// // Define the interface for a reaction
// interface Reaction {
//   id: number;
//   type: 'thumbsUp' | 'thumbsDown'; // Define allowed reaction types
//   userId: number;
//   articleId: number;
// }

// // Define the state for reactions
// const [reactions, setReactions] = useState<{ [key: number]: Reaction[] }>({});

// // Fetch reactions for each article
// const fetchReactions = async (article: { id: number }) => {
//   try {
//     const reactionResponse = await axios.get(
//       `http://localhost:3000/api/reactions/${article.id}`
//     );
//     setReactions((prevReactions) => ({
//       ...prevReactions,
//       [article.id]: reactionResponse.data,
//     }));
//   } catch (error) {
//     console.error('Failed to fetch reactions:', error);
//   }
// };

// // Function to handle reaction changes
// const handleReaction = async (articleId: number, type: 'thumbsUp' | 'thumbsDown') => {
//   // Check if user is logged in
//   if (!user) {
//     alert('You must be logged in to react to an article.');
//     return;
//   }

//   try {
//     const userId = user.id;
//     const existingReaction = reactions[articleId]?.find(
//       (reaction) => reaction.userId === userId
//     );

//     if (existingReaction) {
//       // User has already reacted
//       if (existingReaction.type === type) {
//         // Remove existing reaction
//         await axios.delete(
//           `http://localhost:3000/api/reactions/${existingReaction.id}`
//         );
//         setReactions((prevReactions) => ({
//           ...prevReactions,
//           [articleId]: prevReactions[articleId].filter(
//             (reaction) => reaction.id !== existingReaction.id
//           ),
//         }));
//       } else {
//         // Update existing reaction
//         await axios.put(
//           `http://localhost:3000/api/reactions/${existingReaction.id}`,
//           { type }
//         );
//         setReactions((prevReactions) => ({
//           ...prevReactions,
//           [articleId]: prevReactions[articleId].map((reaction) =>
//             reaction.id === existingReaction.id
//               ? { ...reaction, type }
//               : reaction
//           ),
//         }));
//       }
//     } else {
//       // Create a new reaction
//       const response = await axios.post(`http://localhost:3000/api/reactions`, {
//         type,
//         userId,
//         articleId,
//       });
//       setReactions((prevReactions) => ({
//         ...prevReactions,
//         [articleId]: [...(prevReactions[articleId] || []), response.data],
//       }));
//     }
//   } catch (error) {
//     console.error('Failed to add or update reaction:', error);
//   }
// };

// // Example usage:
// // Assuming you have an array of articles called 'articles'
// for (const article of articles) {
//   fetchReactions(article); // Fetch reactions for each article
// }

// // In your component, you can render the reaction buttons like this:
// // Assuming 'article' is the current article object
// <button onClick={() => handleReaction(article.id, 'thumbsUp')}>
//   👍
// </button>
// <button onClick={() => handleReaction(article.id, 'thumbsDown')}>
//   👎
// </button>

// // You can also display the number of thumbs up and thumbs down for each article:
// const thumbsUpCount = reactions[article.id]?.filter(
//   (reaction) => reaction.type === 'thumbsUp'
// ).length || 0;
// const thumbsDownCount = reactions[article.id]?.filter(
//   (reaction) => reaction.type === 'thumbsDown'
// ).length || 0;

// <div>
//   👍 {thumbsUpCount}
//   👎 {thumbsDownCount}
// </div>
