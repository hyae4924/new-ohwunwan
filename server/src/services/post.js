import * as data from "../data/index.js";
import { s3Remove } from "../utils/s3.js";

export async function updateRanking(post) {
  const { ranking, id } = post;
  console.log(ranking);
  if (ranking == 0) {
    await data.post.updateRanking(id, 1);
    return { message: "The post be included in the ranking list" };
  } else if (ranking == 1) {
    await data.post.updateRanking(id, 0);
    return { message: "The post be excluded in the ranking list" };
  }
}

export async function getRanking(params, query) {
  let { whether } = params;
  if (whether === "on") whether = 1;
  else if (whether === "off") whether = 0;
  const { kind1rm, number, limit } = query;
  const ranking = await data.post.getRanking(whether, kind1rm, number, limit);
  return ranking;
}
// get의 쿼리같은경우는 필드명만 살짝 수정해주면 되어서
// 그냥 변수를 한꺼번에 넣는 방식으로 쿼리 설정을 함
export async function getPost(params, query) {
  const { postType } = params;
  const { kind1rm, userId, number, limit } = query;
  const posts = await data.post.getPost(
    postType,
    kind1rm,
    userId,
    number,
    limit
  );

  return posts.map(post => {
    const location = JSON.parse(post.content);
    return { ...post, content: location };
  });
}

export async function createPost(params, query, files, user) {
  const infos3 = files.map(file => {
    const info = {
      key: file.key,
      bucket: file.bucket,
    };
    return info;
  });
  const { id: user_Id } = user;
  JSON.stringify(infos3);
  const { text } = query;
  const { postType } = params;
  const location = files.map(file => file.location);
  const content = await JSON.stringify(location);
  let post;
  if (postType === "ohwunwan" || postType === "feedback") {
    post = await data.post.createPost(
      postType,
      user_Id,
      text,
      content,
      JSON.stringify(infos3)
    );
  }
  if (postType === "1rm") {
    const { kg, kind1rm } = query;
    post = await data.post.createPost1rm(
      postType,
      user_id,
      text,
      content,
      kg,
      kind1rm,
      JSON.stringify(infos3)
    );
  }
  return post.map(item => {
    return { ...item, content: JSON.parse(item.content) };
  })[0];
}

export async function updatePost(params, body, post) {
  const { id, text } = body;
  const { postType } = params;
  let updatedPost;
  if (postType !== "1rm")
    updatedPost = await data.post.updatePost(postType, id, text);
  else {
    let { kg, text } = body;
    if (!kg) kg = post[0].kg;
    if (!text) text = post[0].text;
    updatedPost = await data.post.updatePost1rm(postType, id, text, kg);
  }
  return updatedPost.map(item => {
    return { ...item, content: JSON.parse(item.content) };
  })[0];
}

export async function removePost(params, query) {
  const { postType } = params;
  const { id } = query;
  const infoS3 = (await data.post.getinfoS3(postType, id)).infoS3;
  const parsed = JSON.parse(infoS3);

  await data.post.removePost(postType, id);

  parsed.forEach(item => {
    s3Remove(item.bucket, item.key);
  });
}
