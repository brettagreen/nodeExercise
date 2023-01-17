const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
          // handle possible error
          console.error(err);
          // kill the process and tell the shell it errored
          process.exit(1);
        }
        // otherwise success
        console.log(`file contents: ${data}`);
      });
}

function webCat(url) {
    axios.get(url).then(function(resp) {
        console.log(resp.data);
    }).catch(err => {
        console.log(err);
    })
}

const param = process.argv[2];
const type = param.startsWith('http');

if (type) {
    webCat(param);
} else {
    cat(param);
}