Template.passwordRecovery.events({
    'submit #recovery-form': function(event, template){
        event.preventDefault();

        var email = trimInput(template.find('#recovery-email').value);

        if (!isEmail(email)){
            Session.set('passwordRecoveryEmailError', 'E-mail not valid!');
            return false;
        }

        Accounts.forgotPassword({email: email}, function(error){
            if (error){
                Session.set('passwordRecoveryEmailError', 'E-mail not found!');
            } else {
                Session.set('passwordRecoveryMessage', 'Password reset e-email sent!')
                Session.set('passwordRecoveryEmailError', null);
            }
        });

        return false;
    },

    'submit #new-password': function(event, template){
        event.preventDefault();

        var password = template.find('#new-password-password').value;

        if(!isValidPasswordLength(password)){
            Session.set('passwordRecoveryNewPasswordError', 'Your password is too short!');
            return false;
        } else {
            Session.set('passwordRecoveryNewPasswordError', null);
        }

        Accounts.resetPassword(Session.get('resetPasswordToken'), password, function(error){
            if (error){
                Session.set('passwordRecoveryNewPasswordError', 'Your password reset has expired!');
            } else {
                Session.set('passwordRecoveryMessage', 'Your password has been updated!');
                Session.set('passwordRecoveryNewPasswordError', null);
                Session.set('resetPasswordToken', null);
            }
        });

        return false;
    }
});

Template.passwordRecovery.helpers({
    passwordRecoveryEmailError: function(){
        return Session.get('passwordRecoveryEmailError');
    },

    passwordRecoveryNewPasswordError: function(){
        return Session.get('passwordRecoveryNewPasswordError');
    },

    passwordRecoveryMessage: function(){
        return Session.get('passwordRecoveryMessage');
    },

    resetPasswordToken: function(){
        return Session.get('resetPasswordToken');
    }
});

if (Accounts._resetPasswordToken){
    Session.set('resetPasswordToken', Accounts._resetPasswordToken);
}