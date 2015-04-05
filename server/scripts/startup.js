Meteor.startup(function(){
    if(Meteor.users.find().count() === 0){
        // default admin user
        var userId = Accounts.createUser({
            email: "admin@example.com",
            password: "example",
            profile: { name: "admin"}
        });

        Roles.addUsersToRoles(userId, "admin");
    }
});