Template.newPost.events({
    'submit #post-add-form': function(event, template){
        event.preventDefault();

        var newPost = {
            title: template.find('#title').value,
            slug: template.find('#slug').value,
            tags: template.find('#tags').value,
            content: template.find('#content').value
        };

        Meteor.call("addPost",  newPost, function(error, result){
            if(error !== undefined){
                // this is bad
                console.log(error.reason);
            } else if(Posts.simpleSchema().namedContext().invalidKeys().length === 0){
                // clear form
                template.$('form')[0].reset();
                
                // redirect to main page
                Router.go('/');
            } 
        });

        return false;
    }
});

Template.editPost.events({
    'submit #post-edit-form': function(event, template){
        event.preventDefault();

        var changedPost = {
            _id: this._id,
            title: template.find('#title').value,
            slug: template.find('#slug').value,
            tags: template.find('#tags').value,
            content: template.find('#content').value
        };

        Meteor.call("editPost", changedPost, function(error, result){
            if(error !== undefined){
                // this is bad
                console.log(error.reason);
            } else if(Posts.simpleSchema().namedContext().invalidKeys().length === 0){
                // clear form
                template.$('form')[0].reset();
                
                // redirect to main page
                Router.go('/');
            }
        });

        return false;
    }
});

Template.removePost.events({
    'submit #post-remove-form': function(event, template){
        event.preventDefault();

        Meteor.call("removePost",  this._id, function(error, result){
            if(error !== undefined){
                // this is bad
                console.log(error.reason);
            } else if(Posts.simpleSchema().namedContext().invalidKeys().length === 0){
                // clear form
                template.$('form')[0].reset();
                
                // redirect to main page
                Router.go('/');
            }
        });

        return false;
    }
});

Template.post.helpers({
    formattedDate: function(dateToAlter){
        return moment(dateToAlter).format("MMMM Do YYYY");
    }
});