var React = require('react');
var DefaultLayout = require('./master');

var indexComponent = React.createClass({
  render: function(){
    return(
    <DefaultLayout>
      <div id="main"></div>
      <script src="../dist/bundle.js"></script>
    </DefaultLayout>
    )
  }
});
module.exports = indexComponent;