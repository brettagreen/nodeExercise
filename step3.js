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
        if (outFile != null) {
            writeToFile(outFile, data);
        } else {
            console.log(`file contents: ${data}`);
        }
      });
}

function webCat(url) {
    axios.get(url).then(function(resp) {
        if (outFile != null) {
            writeToFile(outFile, resp.data);
        } else {
            console.log(resp.data);
        }
    }).catch(err => {
        console.log(err);
    })
}

function writeToFile(path, data) {
    fs.writeFile(path, data, "utf8", function(err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log('Successfully wrote to file!');
      });
}

let param = process.argv[2];
let outFile = null;

if (param === '--out') {
    outFile = process.argv[3];
    param = process.argv[4];
    if (param.startsWith('http')) {
        webCat(param);
    } else {
        cat(param);
    }
} else if (param.startsWith('http')) {
    webCat(param);
} else {
    cat(param);
}