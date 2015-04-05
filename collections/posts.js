Posts.attachSchema(new SimpleSchema({
    createdAt: {
        type: Date,
        label: "Creation date"
    },

    title: {
        type: String,
        label: "Title",
        max: 100
    },

    slug: {
        type: String,
        label: "Slug",
        custom: function(){
            var re = /^[a-zA-Z0-9\-]+$/;

            if(!re.test(this.value)){
                return "invalidSlugUrl";
            }
        },
        max: 100
    },

    tags: {
        type: String,
        label: "Tags",
        max: 100
    },

    content: {
        type: String,
        label: "Content",
        max: 15000000
    },

    creatorId: {
        type: String
    }
}));

Posts.allow({
    insert: function(userId){
        // must be logged in and an admin
        return userId !== undefined 
            && Roles.userIsInRole(userId, 'admin');
    },

    update: function(userId){
        //must be logged in
        return userId !== undefined
            && Roles.userIsInRole(userId, 'admin');
    },

    remove: function(userId){
        //must be logged in
        return userId !== undefined
            && Roles.userIsInRole(userId, 'admin');
    }
});