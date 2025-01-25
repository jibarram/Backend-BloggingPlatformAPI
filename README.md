# Blogging Platform API
Sample solution for the [Blogging Platform API](https://roadmap.sh/projects/blogging-platform-api) from [roadmap.sh](https://roadmap.sh).

## Features

- Create a new blog post
- Update an existing blog post
- Delete an existing blog post
- Get a single blog post by ID
- Get all blog posts
- Filter blog posts by a search term

## Prerequisites

- **Node.js** (version 14 or higher)
- **MongoDB** (installed and running on `localhost:27017` or a URI specified in `.env`)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jibarram/Backend-BloggingPlatformAPI
   cd Backend-BloggingPlatformAPI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the MongoDB connection:
   ```env
   MONGO_URI=mongodb://localhost:27017/blogDB
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Endpoints

### **Blog Posts**

#### Create a Post
- **POST** `/posts`
- **Body**:
  ```json
  {
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming"]
  }
  ```
- **Response**:
  - `201 Created`: Returns the created post.
  - `400 Bad Request`: Validation error.

---

#### Get All Posts (with optional search)
- **GET** `/posts?term=<searchTerm>`
- **Query Parameters**:
  - `term` (optional): Search term to filter posts by title, content, or category.
- **Response**:
  - `200 OK`: Returns an array of posts.
- **Body**:
  ```json
  [
    {
        "_id": "679548044530417fc7640cf5",
        "title": "Exploring Tech Trends",
        "content": "Technology is advancing rapidly with AI and robotics.",
        "category": "Technology",
        "tags": [
            "AI",
            "Robotics",
            "Innovation"
        ],
        "createdAt": "2025-01-25T20:22:28.676Z",
        "updatedAt": "2025-01-25T20:22:28.676Z",
        "__v": 0
    }
  ]

---

#### Get Post by ID
- **GET** `/posts/:id`
- **Response**:
  - `200 OK`: Returns the post.
  - `404 Not Found`: Post not found.

---

#### Update a Post
- **PUT** `/posts/:id`
- **Body**:
  ```json
  {
    "title": "Updated Blog Post Title",
    "content": "Updated content for the blog post.",
    "category": "Updated Category",
    "tags": ["Updated", "Tags"]
  }
  ```
- **Response**:
  - `200 OK`: Returns the updated post.
  - `404 Not Found`: Post not found.

---

#### Delete a Post
- **DELETE** `/posts/:id`
- **Response**:
  - `204 No Content`: Post successfully deleted.
  - `404 Not Found`: Post not found.

---

## Testing the API

You can use tools like **Postman**, **cURL**, or **REST Client** in VSCode to test the endpoints. Examples:

### Create a Post
```bash
curl -X POST http://localhost:3000/posts \
-H "Content-Type: application/json" \
-d '{
  "title": "Exploring Tech Trends",
  "content": "Technology is advancing rapidly with AI and robotics.",
  "category": "Technology",
  "tags": ["AI", "Robotics", "Innovation"]
}'
```

### Get All Posts
```bash
curl -X GET http://localhost:3000/posts
```

### Filter Posts by Search Term
```bash
curl -X GET http://localhost:3000/posts?term=tech
```