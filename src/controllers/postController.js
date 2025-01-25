import Post from "../models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    const { term } = req.query;
    let filter = {};

    if (term) {
      const regex = new RegExp(term, "i");
      filter = {
        $or: [
          { title: regex },
          { content: regex },
          { category: regex }
        ],
      };
    }

    const posts = await Post.find(filter);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post no encontrado" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el post" });
  }
};

export const createPost = async (req, res) => {
  const { title, content, category, tags } = req.body;

  if (title.length > 100 || content.length > 300 || category.length > 50) {
    return res.status(400).json({ error: "Field lengths exceed limits." });
  }

  if (/<.*?>|{.*?}|\[.*?\]|\(|\)/.test(title) || /<.*?>|{.*?}|\[.*?\]|\(|\)/.test(content) || /<.*?>|{.*?}|\[.*?\]|\(|\)/.test(category)) {
    return res.status(400).json({ error: "Fields cannot contain code or special characters." });
  }

  if (tags.some(tag => tag.length > 200)) {
    return res.status(400).json({ error: "Each tag must be at most 200 characters long." });
  }

  try {
    const newPost = new Post({ title, content, category, tags });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el post" });
  }
};


export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedPost) return res.status(404).json({ error: "Post no encontrado" });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: "Post no encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el post" });
  }
};
