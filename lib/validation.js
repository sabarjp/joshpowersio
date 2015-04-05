// Trim white space
trimInput = function(val){
    return val.replace(/^\s*|\s*$/g, "");
};

// Determine whether or not the password is of a valid
// length for security purposes.
isValidPasswordLength = function(val){
    return Match.test(val, Match.Where(function(x){
        if (Match.test(x, null)){
            return false;
        }

        return x.length >= 6;
    }));
};

// Returns true if the passed in value is a string
// and looks like an e-mail address.
isEmail = function(val){
    return Match.test(val, Match.Where(function(x){
        check(x, String);
        return x.indexOf("@") > 0;
    }));
};

// Returns true if the passed in value is a string
// with a length greater than zero.
isStringNotEmpty = function(val){
    return Match.test(val, Match.Where(function(x){
        check(x, String);
        return x.length > 0;
    }));
};

// Returns true if the passed in value is null or an
// empty string.
isStringNullOrEmpty = function(val){
    return Match.test(val, Match.Where(function(x){
        if (Match.test(x, null)){
            return true;
        }

        check(x, String);

        return x.length === 0;
    }));
}

