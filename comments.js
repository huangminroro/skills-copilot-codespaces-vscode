// Create web server
// Create a route that gets all comments
// Create a route that gets all comments by a specific user
// Create a route that gets a specific comment by ID
// Create a route that adds a new comment
// Create a route that updates a specific comment by ID
// Create a route that deletes a specific comment by ID

const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

let comments = [];

app.get("/comments", (req, res) => {
  res.json(comments);
});

app.get("/comments/user/:userId", (req, res) => {
  const userId = req.params.userId;
  const userComments = comments.filter((comment) => comment.userId === userId);
  res.json(userComments);
});

app.get("/comments/:commentId", (req, res) => {
  const commentId = req.params.commentId;
  const comment = comments.find((comment) => comment.id === commentId);
  res.json(comment);
});

app.post("/comments", (req, res) => {
  const newComment = req.body;
  newComment.id = uuidv4();
  comments.push(newComment);
  res.json(newComment);
});

app.put("/comments/:commentId", (req, res) => {
  const commentId = req.params.commentId;
  const updatedComment = req.body;
  const index = comments.findIndex((comment) => comment.id === commentId);
  comments[index] = { ...comments[index], ...updatedComment };
  res.json(comments[index]);
});

app.delete("/comments/:commentId", (req, res) => {
  const commentId = req.params.commentId;
  comments = comments.filter((comment) => comment.id !== commentId);
  res.json({ message: `Comment with ID ${commentId} has been deleted` });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});