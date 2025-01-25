import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      maxlength: 100,
      validate: {
        validator: (value) => !/<.*?>|{.*?}|\[.*?\]|\(|\)/.test(value),
        message: "Title cannot contain code or special characters."
      }
    },
    content: { 
      type: String, 
      required: true, 
      maxlength: 300,
      validate: {
        validator: (value) => !/<.*?>|{.*?}|\[.*?\]|\(|\)/.test(value), 
        message: "Content cannot contain code or special characters."
      }
    },
    category: { 
      type: String, 
      default: "General", 
      maxlength: 50,
      validate: {
        validator: (value) => !/<.*?>|{.*?}|\[.*?\]|\(|\)/.test(value),
        message: "Category cannot contain code or special characters."
      }
    },
    tags: { 
      type: [String], 
      default: [], 
      validate: [
        {
          validator: (value) => value.every(tag => tag.length <= 200),
          message: "Each tag must be at most 200 characters long."
        },
        {
          validator: (value) => !value.some(tag => /<.*?>|{.*?}|\[.*?\]|\(|\)/.test(tag)),
          message: "Tags cannot contain code or special characters."
        }
      ]
    }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
