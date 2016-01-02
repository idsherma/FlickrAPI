$(document).ready(function() {
  
 var flickerAPI = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?';


 $('form').submit(function (evt) {
    var $submitButton = $('#submit');
    var $searchField = $('#search');
    evt.preventDefault();
    $searchField.prop("disabled",true);
    $submitButton.attr("disabled", true).val("searching....");
    var photo = $searchField.val();
    $('#photos').html('');
    $.getJSON(flickerAPI, {
        tags: photo,
        dataType: "json"
      },
    function(data){
      var photoHTML = '';
      if (data.items.length > 0) {
        $.each(data.items,function(i,photo) {
          photoHTML += '<li class="grid-25 tablet-grid-50">';
          photoHTML += '<a href="' + photo.link + '" class="image">';
          photoHTML += '<img src="' + photo.media.m + '"></a></li>';
        }); 
      } else {
        photoHTML = "<p>No photos found that match: " + photo + ".</p>"
      }
      $('#photos').html(photoHTML);
      $searchField.prop("disabled", false);
      $submitButton.attr("disabled", false).val("Search");
    }); 
  }); 
});