Template.validationErrors.events({
    'click i.close.icon': function(event){
        // clear the errors
        var name = $(event.target).data("collection-name");

        var context = Collections[name].simpleSchema().namedContext();

        context.resetValidation();
    }
});

Template.validationErrors.helpers({
    errors: function(name){
        var context = Collections[name].simpleSchema().namedContext();

        return context.invalidKeys().map(function(data){
            return {
                message: context.keyErrorMessage(data.name)
            };
        });
    }
});
