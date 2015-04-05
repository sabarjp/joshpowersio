Template.home.helpers({
    randomQuote: function(){
        var quotes = [
            "Programmer",
            "Developer",
            "Hacker",
            "Software engineer"
        ];

        return quotes[Math.floor(Math.random() * quotes.length)];
    }
});
