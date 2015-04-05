Template.login.events({
    'submit #login-form': function(event, template){
        event.preventDefault();

        var email = trimInput(template.find('#login-email').value);
        var password = template.find('#login-password').value;

        Meteor.loginWithPassword(email, password, function(error){
            if (error){
                // log in attempt failed
                Session.set('loginError', 'E-mail or password incorrect!');
            } else {
                Session.set('loginError', null);

                // redirect to main page
                Router.go('/');
            }
        });

        return false;
    }
});

Template.login.helpers({
    loginError: function(){
        return Session.get('loginError');
    }
});
