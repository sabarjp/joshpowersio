// Meteor.methods definitions

Meteor.methods({
    addPost: function(newPost){
        Posts.insert({
            title: newPost.title,
            slug: newPost.slug,
            tags: newPost.tags,
            content: newPost.content,
            creatorId: Meteor.userId(),
            createdAt: new Date()
        }, function(error, result){

        });
    },

    editPost: function(changedPost){
        Posts.update(changedPost._id,
        {
            $set: {
                title: changedPost.title,
                slug: changedPost.slug,
                tags: changedPost.tags,
                content: changedPost.content
            }
        }, function(error, result){

        });
    },

    removePost: function(id){
        Posts.remove(id, function(error, result){

        });
    }
});