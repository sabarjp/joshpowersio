Template.home.helpers({
    randomQuote: function(){
        var quotes = [
            "Programmer",
            "Developer",
            "Hacker",
            "Software engineer"
        ];

        return quotes[Math.floor(Math.random() * quotes.length)];
    },

    hack: function (){
        var digits = ['0', '1', '2', '3', '4', '5', '6',
            '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

        function randomDigit(){
            return digits[Math.floor(Math.random() * digits.length)];
        }

        var address = '0x';

        for(var i=0; i<8; i++){
            address = address + randomDigit();
        }

        return address;
    }
});
