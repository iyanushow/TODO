"use strict";

$(document).ready(function () {
  $('form').on('submit', function () {
    var item = $('form input');
    var data = {
      item: item.val()
    };
    $.ajax({
      type: 'POST',
      url: '/todo',
      data: data,
      success: function success(data) {
        //do something with the data via front-end framework
        location.reload();
      }
    });
    return false;
  });
  $('li').on('click', function () {
    var item = $(this).text();
    $.ajax({
      type: 'DELETE',
      url: '/todo/' + item,
      success: function success(data) {
        //do something with the data via front-end framework
        location.reload();
      }
    });
  });
});