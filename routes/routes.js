Router.configure({
    layoutTemplate: 'applicationLayout'
});

Router.onBeforeAction(function (){
    // check for admin-only functions

    if(!Meteor.userId()){
        this.render('login');
    }
    else if(!Roles.userIsInRole(Meteor.userId(), 'admin')){
        this.stop();
    } else {
        this.next();
    }
}, {
    only: ['admin', 'newPost', 'editPost', 'removePost']
});

Router.route('/', function(){
    this.render('home');
}, {
    name: 'default',

    data: function(){
        return {
            pageNumber: 1
        };
    }
});

Router.route('/home', function(){
    this.wait(Meteor.subscribe("posts"));

    if(this.ready()){
        this.render('home');
    } else {
        this.render('loading');
    }
}, {
    name: 'home'
});

Router.route('/admin', function(){
    this.render('admin');
}, {
    name: 'admin'
});

Router.route('/blog/post/:slug', function(){
    this.wait(Meteor.subscribe("posts"));

    this.render('blog');
}, {
    name: 'blog',

    data: function(){
        return Posts.findOne({slug: this.params.slug});
    }
});

Router.route('/blog/page/:pageNumber', function(){
    this.wait(Meteor.subscribe("posts"));

    this.render('blogPage');
}, {
    name: 'blogPage',

    data: function(){
        return {
            pageNumber: this.params.pageNumber
        };
    }
});

Router.route('/newPost', function(){
    this.wait(Meteor.subscribe("posts"));

    this.render('newPost');
}, {
    name: 'newPost'
});

Router.route('/editPost/:_id', function(){
    this.wait(Meteor.subscribe("posts"));

    this.render('editPost');
}, {
    name: 'editPost',

    data: function(){
        return Posts.findOne({_id: this.params._id});
    }
});

Router.route('/removePost/:_id', function(){
    this.wait(Meteor.subscribe("posts"));

    this.render('removePost');
}, {
    name: 'removePost',

    data: function(){
        return Posts.findOne({_id: this.params._id});
    }
});

Router.route('/login', function(){
    if(!Meteor.userId()){
        this.render('login');
    } else {
        this.redirect('default');
    }
}, {
    name: 'login'
});

Router.route('/portfolio', function(){
    this.render('portfolio');
}, {
    name: 'portfolio'
});

Router.route('/resume', function(){
    this.render('resume');
}, {
    name: 'resume'
});

Router.route('/fun', function(){
    this.render('fun');
}, {
    name: 'fun'
});

Router.route('/fun/brownian-motion', function(){
    this.render('brownianMotion');
}, {
    name: 'brownianMotion'
});

Router.route('/signup', function(){
    this.render('signup');
}, {
    name: 'signup'
});

Router.route('/password', function(){
    this.render('passwordRecovery');
}, {
    name: 'password'
});
