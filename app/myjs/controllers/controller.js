app.controller('textController', function() {
  this.messages = text;
});

app.controller("ReviewController", function(){
  this.review = {};

  this.addReview = function(mes){
    mes.push(this.review);
    this.review = {};
  };
});

var text = [{
    name: 'John',
    email: "john@example.org",
    message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita voluptate debitis illum accusamus cum repellat qui, temporibus odit tempora eius, placeat. Deserunt illo quas, eos, explicabo iure nisi accusamus totam."
  },
  {
    name: 'Joe',
    email: 'joe@example.org',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, nulla, et. Magnam fugiat, consectetur ex doloribus illum qui. Repudiandae iusto cupiditate a eaque at deleniti qui quod, temporibus hic id!'
  }
];
