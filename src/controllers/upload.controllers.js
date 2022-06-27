const fs = require('fs');       //File System - for file manipulation


export const uploadThumbnailBW = async (req, res) => {
    try {
        let dir = __dirname.replace("\\controllers", "")
        fs.stat(dir + '/img/' + req.params.thumbnail_half, function (err, stat) {
            if (err == null) {
                console.log('File exists');
                res.sendFile(dir + '/img/' + req.params.thumbnail_half)
            } else if (err.code === 'ENOENT') {
                console.log('File not exists');
                res.status(404)
            } else {
                console.log('Some other error: ', err.code);
                res.status(500)
            }
        })
    } catch (err) {
        console.error(err);
    }
};