import * as likeServices from "../services/like.js";

export async function createPostLike(req, res) {
  const { user, params, body } = req;
  return likeServices
    .createPostLike(user, params, body)
    .then(like => res.status(201).json(like));
}

export async function createCommentLike(req, res) {
  const { user, params, body } = req;
  return likeServices.createCommentLike(user, params, body).then(like => {
    console.log(like);
    return res.status(201).json(like);
  });
}

export async function deletePostLike(req, res) {
  const { params, like } = req;
  return likeServices
    .deletePostLike(params, like)
    .then(() => res.status(200).json({ message: "ok" }));
}

export async function deleteCommentLike(req, res) {
  const { params, query } = req;
  return likeServices
    .deleteCommentLike(params, query)
    .then(() => res.status(200).json({ message: "ok" }));
}
