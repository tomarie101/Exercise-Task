// const [reactions, setReactions] = useState<{ [key: number]: Reaction[] }>({});

// interface Reaction {
//   id: number;
//   type: string;
//   userId: number;
//   articleId: number;
// }

// // Fetch reactions
// for (const article of response.data) {
//   const reactionResponse = await axios.get(
//     `http://localhost:3000/api/reactions/${article.id}`
//   );
//   setReactions((prevReactions) => ({
//     ...prevReactions,
//     [article.id]: reactionResponse.data,
//   }));
// }
// const handleReaction = async (articleId: number, type: string) => {
//   if (!user) {
//     alert("You must be logged in to react to an article.");
//     return;
//   }

//   try {
//     const userId = user.id;
//     const existingReaction = reactions[articleId]?.find(
//       (reaction) => reaction.userId === userId
//     );

//     if (existingReaction) {
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
//     console.error("Failed to add or update reaction: ", error);
//   }
// };
