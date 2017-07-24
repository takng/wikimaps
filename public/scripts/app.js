$(document).ready(() => {

  var map;

  $.ajax({
    method: "GET",
    url: "/maps"
  }).done((maps) => {
    for(map of maps) {

      if (userJSON.id !== 0) {
        var heart = $(`<i class="float-right glyphicon glyphicon-heart">`);

        for (var i = 0; i < favouritesJSON.length; i++) {
          if (favouritesJSON[i]["map_id"] === map.id) {
            heart.addClass("liked");
          }
        }
      }

      var item  = $(`<li data-mapid="${map.id}" class="listItem">`).text(map.title).append(heart);
      $("ul.list").append(item);
    }
  });

  $.ajax({
    method: "GET",
    url: `favourites/${userJSON.id}`,
  }).done((maps) => {
    for(map of maps) {
      var heart = $(`<i class="float-right glyphicon glyphicon-heart">`);
      var fav   = $(`<a data-mapid="${map.id}" class="listItem">`).text(map.title).append(heart);
      $("div#sidebar").append(fav);
    }
  });

  $("body").on("click", ".listItem", (event) => {
    let mapid= $(event.target).data("mapid");
    displayNewMap(mapid);
  });

  $("nav").on("click", "a#favs", (event) =>{
    $("#sidebar").toggleClass("active");
  })

  $("body").on("click", ".glyphicon-heart", (event) =>{
    event.stopPropagation();
    let mapID = $(event.target).parent(".listItem").data("mapid");
    $(event.target).toggleClass("liked");

    let isLiked = $(event.target).hasClass("liked");

    if (userJSON.id !== 0) {
      $.ajax({
        url: `/favourites?user_id=${userJSON.id}&map_id=${mapID}&state=${isLiked}`,
        method: "PUT",
        success: function() {
          console.log("OKey-dokey");
        },

        error: function(err) {
          console.log(err);
        }
      })
    }
  });

});

