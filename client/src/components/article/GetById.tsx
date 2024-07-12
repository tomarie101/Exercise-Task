async function getArticleById(id) {
  try {
    const response = await fetch(`http://localhost:3000/articles/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const article = await response.json();
    if (article.error) {
      console.error(article.error);
    } else {
      console.log(article);
      // Process the article here (e.g., display it in the UI)
    }
  } catch (error) {
    console.error(`Error fetching article ${id}:`, error);
  }
}
