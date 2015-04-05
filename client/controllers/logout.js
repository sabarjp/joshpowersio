Template.logout.events({
    'click #logout': function(event){
        event.preventDefault();

        Meteor.logout();

        return false;
    }
});

Template.logout.helpers({
    currentUserName: function(){
        return Meteor.user().emails[0].address;
    }
});