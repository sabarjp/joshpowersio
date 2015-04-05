Template.signup.events({
    'submit #register-form': function(event, template){
        event.preventDefault();

        var email = trimInput(template.find('#account-email').value);
        var password = template.find('#account-password').value;

        if (!isEmail(email)){
            Session.set('registerEmailError', 'E-mail not valid!');
            return false;
        } else {
            Session.set('registerEmailError', null);
        }

        if (!isValidPasswordLength(password)){
            // the supplied password is not secure
            Session.set('registerPasswordError', 'Your password is too short!');
            return false;
        } else {
            Session.set('registerPasswordError', null);
        }

        Accounts.createUser({
            email: email, 
            password: password
        }, function(error){
            if (error){
                // account creation failed!
                console.log(error.reason);
                Session.set('registerEmailError', error.reason)
            } else {
                // success, logged in
                Session.set('registerEmailError', null);

                // redirect to home
                Router.go('/');
            }
        });

        return false;
    }
});

Template.signup.helpers({
    registerEmailError: function(){
        return Session.get('registerEmailError');
    },

    registerPasswordError: function(){
        return Session.get('registerPasswordError');
    }
});