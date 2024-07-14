import React from "react";

//  CRUD operation handlers
const handleCreate = () => {
  console.log("Create operation");
  // Implement create operation here
};

const handleRead = () => {
  console.log("Read operation");
  // Implement read operation here
};

const handleUpdate = () => {
  console.log("Update operation");
  // Implement update operation here
};

const handleDelete = () => {
  console.log("Delete operation");
  // Implement delete operation here
};

const ArticleButtons = () => {
  return (
    <div>
      <button onClick={handleCreate}>Create</button>
      <button onClick={handleRead}>Read</button>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ArticleButtons;
