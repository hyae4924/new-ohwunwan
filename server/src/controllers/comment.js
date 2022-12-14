import * as commentServices from "../services/comment.js";

export function getComment(req, res) {
  const { query, params } = req;
  return commentServices
    .getComments(query, params) //
    .then(comments => {
      if (comments.length == 0)
        return res.status(204).json({ message: "no content" });
      else if (comments) return res.status(200).json(comments);
    });
}

export function getReComment(req, res) {
  const { query, params } = req;
  return commentServices
    .getReComments(query, params) //
    .then(comments => {
      if (comments.length == 0)
        return res.status(204).json({ message: "no content" });
      else if (comments) return res.status(200).json(comments);
    });
}

export function createComment(req, res) {
  const { body, params, user } = req;
  return commentServices
    .createComment(body, params, user) //
    .then(comment => res.status(201).json(comment));
}

export function createReComment(req, res) {
  const { body, user, comment, params } = req;
  return commentServices
    .createReComment(params, body, user, comment) //
    .then(comment => res.status(201).json(comment));
}

export function updateComment(req, res) {
  const { body, params } = req;
  return commentServices
    .updateComment(params, body) //
    .then(comment => res.status(200).json(comment));
}

export function deleteComment(req, res) {
  const { query, params } = req;
  return commentServices
    .deleteComment(query, params)
    .then(() =>
      res
        .status(200)
        .json({ message: "Your comment has been successfully deleted" })
    );
}

export function selectComment(req, res) {
  const { body, comment } = req;
  return commentServices
    .selectComment(body, comment)
    .then(() =>
      res
        .status(200)
        .json({ message: "The comment has been successfully selected" })
    );
}

export function unSelectComment(req, res) {
  const { body, comment } = req;
  return commentServices
    .selectComment(body, comment)
    .then(() =>
      res
        .status(200)
        .json({ message: "The comment has been successfully unselected" })
    );
}
