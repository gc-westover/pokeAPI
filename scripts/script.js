function ucfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var url = "https://pokeapi.co/api/v2/pokemon/";
var targetNumber = 20;
var j = 0;

$(function() {
  jQuery.ajaxSetup({ async: false });
  while (j <= targetNumber) {
    $.get(url, function(data) {
      console.log(data.next);
      for (var i = 0; i < data.results.length; i++) {
        var poke = data.results[i];
        // for (let poke of data.results) {
        // console.log(poke.name);
        $.get(poke.url, function(pokeData) {
          console.log(pokeData.id);

          var payload =
            "<div class='pokemon' data-id='" +
            pokeData.id +
            "'><h2>" +
            ucfirst(pokeData.name) +
            "</h2><img src='" +
            pokeData.sprites.front_default +
            "'></div>";
          $("body").append(payload);
        });

        j++;
      }
      url = data.next;
    });
  }

  let removeExtra = Math.ceil(targetNumber / 10) * 10 - targetNumber;

  for (let i = 0; i < removeExtra; i++) {
    $("div")
      .last()
      .remove();
  }

  $(".pokemon").on("click", function() {
    let el = $(this);
    alert("This pokemon is number " + el.attr("data-id") + ".");
  });
});
