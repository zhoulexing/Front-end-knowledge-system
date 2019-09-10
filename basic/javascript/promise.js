function getData() {
    return new Promise((resolve, reject) => {
        const err = new Error('abc');
        err.name = 'type';
        reject(err);
    });
}

function getData2() {
    return getData().then(data => {
        return data;
    }).catch(err => {
        console.log("catch", err);
    });
}

getData2().then(data => {
});