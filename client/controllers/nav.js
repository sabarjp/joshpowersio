Template.nav.events({
    'click #menu-button': function(){
        $('#sidebar')
            .sidebar('toggle')
            .sidebar('attach events', '#sidebar .item');
    }
});

Template.nav.rendered = function(){
    $('.popup').popup();
};