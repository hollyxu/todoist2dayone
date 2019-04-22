var fs = require('fs');
var file = fs.createWriteStream('array.txt');

fs.readFile('items.json', 'utf8', function(err, contents) {
    var json = JSON.parse(contents);
    var thoughtItems = json.items.filter(item => item.project_id === 2209339242)

    file.on('error', function(err) { console.log(err)});
    thoughtItems.forEach(function(item) {
      file.write(item.content + '\n');
      file.write(item.date_added + '\n');
    });
    file.end();
});

console.log('after calling readFile');
