var fs = require('fs');

module.exports.delete = function(item) {

    fs.readFile('grocerylist.txt', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
      }

      else {
        var dataArr = data.split("\n");
        var thisIndex = dataArr.indexOf(item);
        var dataStr = "";

      dataArr.splice(thisIndex, 1);

      dataArr.forEach(function(element, index) {
        if (element.length > 0) {
          dataStr += element + "\n";
        }
      })

      fs.writeFile('grocerylist.txt', dataStr, function(err){
        if (err) {
          console.log(err);
        }
      })
    }
  })
};
