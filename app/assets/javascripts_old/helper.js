escapeRegExp = function(str) {
    return str.replace(/[-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

passwordStrength = function(newPassword, username, oldPassword) {
    var result = 0;
    var score = 0;
    var usernamePattern = new RegExp('.*'+escapeRegExp(username || '')+'.*','g');
    var oldPasswordPattern = new RegExp('.*'+escapeRegExp(oldPassword || '')+'.*','g');

    repetition = newPassword.match(/(.+?)\1/g)
    specialChars = newPassword.match(/[!,@,#,$,%,^,&,*,?,_,\.,=,~,-,(,)]/g)
    numbers = newPassword.match(/\d/g)
    lowerChars = newPassword.match(/[a-z]/g)
    upperChars = newPassword.match(/[A-Z]/g)
    upOrLowChars = (lowerChars || upperChars);

    score += newPassword.length*3;

    if(repetition) {
        score -= repetition.length;
    }

    if(numbers && numbers.length>=3) {
        score +=5;
    }

    if(specialChars && specialChars.length>=2) {
        score +=5;
    }

    if(lowerChars && upperChars){
        score +=10;
    }

    if(upOrLowChars && numbers) {
        score += 15;
    }

    if(upOrLowChars && specialChars) {
        score += 15;
    }

    if(specialChars && numbers) {
        score += 15;
    }

    if(upOrLowChars && !(numbers || specialChars)){
        score -=10;
    }

    if(numbers && !(upOrLowChars || specialChars)){
        score -=10;
    }

    if(newPassword.length<6) {
        score = 0;

    }
    if(username && newPassword.match(usernamePattern)) {
        score = 0;
    }
    if(oldPassword && newPassword.match(oldPasswordPattern)) {
        score = 0;
    }

    if(score> 100) score = 100;
    if(score < 0) score = 0;

    if(score > 0) {
        result = Math.round(score/20);
    }

    return result;
}

function putObject(path, object, value) {
    var modelPath = path.split(".");

    function fill(object, elements, depth, value) {
        var hasNext = ((depth + 1) < elements.length);
        if(depth < elements.length && hasNext) {
            if(!object.hasOwnProperty(modelPath[depth])) {
                object[modelPath[depth]] = {};
            }
            fill(object[modelPath[depth]], elements, ++depth, value);
        } else {
            object[modelPath[depth]] = value;
        }
    }
    fill(object, modelPath, 0, value);
}