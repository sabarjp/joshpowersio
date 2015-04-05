Posts = new Mongo.Collection("posts");

Collections = {
    "posts": Posts
};

SimpleSchema.messages({
    "invalidSlugUrl": "Only letters, numbers, and dashes (-) may be used in a slug url."
});