import { body, param, query } from "express-validator";
import validator from "../middlewares/validator.js";

export const validateGet = [
  param(
    "postType",
    "There are only 3Type: ohwunwan, feedback, 1rm . Please provide one of the following"
  ).isIn(["ohwunwan", "feedback", "1rm"]),
  query("kind1rm", "It can provide when postType is 1rm")
    .if(query("kind1rm").exists())
    .custom((value, { req }) => req.params.postType === "1rm"),
  query("kind1rm", "There are only 3kind: bench, dead, squat ")
    .if(query("kind1rm").exists())
    .isIn(["bench", "dead", "squat"]),
  validator,
];

export const validateCreateBefore = [
  param(
    "postType",
    "There are only 3Type: ohwunwan, feedback, 1rm . Please provide one of the following"
  ).isIn(["ohwunwan", "feedback", "1rm"]),
  validator,
];
export const validateCreateAfter = [
  param(
    "postType",
    "If you selected 1rm as the post type, you have to provide kind1rm,kg, and there are only 3kind: bench, dead, squat "
  )
    .if(value => value === "1rm")
    .custom((value, { req }) => {
      const { kind1rm, kg } = req.body;
      if (kind1rm || kg) return false;
      if (kind1rm === "bench" || kind1rm === "squat" || kind1rm === "dead") {
        return true;
      } else return false;
    }),
  body("text", "please enter the text").notEmpty(),
  body("userId", "please enter the userId").notEmpty(),
  validator,
];

export const validateUpdate = [
  param(
    "postType",
    "There are only 3Type: ohwunwan, feedback, 1rm . Please provide one of the following"
  ).isIn(["ohwunwan", "feedback", "1rm"]),
  body("id", "please provide post_id").notEmpty(),
  body("kg", "No data to change")
    .if((value, { req }) => req.params.postType === "1rm")
    .custom((value, { req }) => {
      const { text, kg } = req.body;
      if (text || kg) return true;
      else return false;
    }),
  body("text", "No data to change")
    .if((value, { req }) => req.params.postType !== "1rm")
    .custom((value, { req }) => {
      const { text } = req.body;
      if (!text) return false;
      else return true;
    }),
  validator,
];

export const validateRemove = [
  param(
    "postType",
    "There are only 3Type: ohwunwan, feedback, 1rm . Please provide one of the following"
  ).isIn(["ohwunwan", "feedback", "1rm"]),
  query("id", "please provide post_id").notEmpty(),
  validator,
];