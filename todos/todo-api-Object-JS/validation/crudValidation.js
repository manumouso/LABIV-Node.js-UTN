function postValid(req){

    return true;
}

function putValid(req){

    return true;
}

function patchValid(req){

    return true;
}


module.exports={
    postValid: postValid,
    putValid:putValid,
    patchValid:patchValid
}