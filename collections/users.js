Meteor.users.deny({
    insert: function(userId){
        // must be logged in and an admin, otherwise deny!
        return userId === undefined 
            || !Roles.userIsInRole(userId, 'admin');
    },

    update: function(userId){
        //must be logged in
        return userId === undefined
            || !Roles.userIsInRole(userId, 'admin');
    },

    remove: function(userId){
        //must be logged in
        return userId === undefined
            || !Roles.userIsInRole(userId, 'admin');
    }
});