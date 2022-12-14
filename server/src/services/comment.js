import * as data from "../data/index.js";

export async function getComments(query, params) {
  const { post_id, number, limit } = query;
  const { postType } = params;
  return data.comment.getComments(postType, post_id, number, limit);
}
export async function getReComments(query, params) {
  const { comment_id, number, limit } = query;
  const { postType } = params;
  return data.comment.getReComments(postType, comment_id, number, limit);
}

export async function createComment(body, params, user) {
  const { post_id, text } = body;
  const { postType } = params;
  const { id: user_id } = user;
  return await data.comment.createComment(postType, post_id, user_id, text);
}

export async function createReComment(params, body, user, comment) {
  const { postType } = params;
  const { text } = body;
  const { id: user_id } = user;
  const { id: parent, ohwunwan_id, feedback_id } = comment;
  let post_id = ohwunwan_id || feedback_id;
  if (!post_id) post_id = comment["1rm_id"];
  return await data.comment.createComment(
    postType,
    post_id,
    user_id,
    text,
    parent
  );
}

export async function updateComment(params, body) {
  const { postType } = params;
  const { text, comment_id: id } = body;
  return data.comment.updateComment(postType, id, text);
}

export async function deleteComment(query, params) {
  const { postType } = params;
  const { comment_id: id } = query;
  return data.comment.deleteComment(postType, id);
}
// select or un select
export async function selectComment(body, comment) {
  const { comment_id: id } = body;
  const { selection } = comment;
  await data.comment.selectComment(id, selection);
}
