var React = require('react');

var MasterLayout = React.createClass({
  siteTitle: 'Some Website',
  render: function(){
    return(
      <html lang="en">
      <head>
        <link rel="icon" href="../public/images/favicon.ico" type="image/x-icon" />
        <title>{this.props.title}</title>
        <meta name="description" content={this.props.content}/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
      </head>
      <body>
        {this.props.children}
      </body>
      </html>
    )
  }
});
module.exports = MasterLayout;