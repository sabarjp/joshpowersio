Template.logout.events({
    'click #logout': function(event){
        event.preventDefault();

        Meteor.logout();

        // redirect to main page
        Router.go('/');

        return false;
    }
});

Template.logout.helpers({
    currentUserName: function(){
        return Meteor.user().emails[0].address;
    }
});