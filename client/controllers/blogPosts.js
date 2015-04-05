Meteor.subscribe("posts");

Template.blogPosts.helpers({
    posts: function(){
        return Posts.find({}, {
            sort: {createdAt: -1}, 
            skip: (this.pageNumber - 1) * 5, 
            limit: 5
        });
    },

    postCount: function(){
        return Posts.find({}).count();
    },

    pageCount: function(){
        return Math.ceil(Posts.find({}).count() / 5);
    },

    lessPagesAvailable: function(){
        return this.pageNumber > 1;
    },

    previousPageNumber: function(){
        return parseInt(this.pageNumber) - 1;
    },

    morePagesAvailable: function(){
        return Posts.find({}).count() > this.pageNumber * 5;
    },

    nextPageNumber: function(){
        return parseInt(this.pageNumber) + 1;
    }
});