$(document).ready(function () {
  // click
  $('#searchBtn').click(function() {
    var query = $('#searchBar').val();
    cleanSearch();
    ajaxGetMovie(query);
  })
  // keypress
  $('#searchBar').keypress(function(event) {
    if (event.which == 13) {
      var query = $('#searchBar').val();
      cleanSearch();
      ajaxGetMovie(query);
    }
  })
  
});

function cleanSearch() {
  $('.covers').html('');
  $('#searchBar').val('');
}

function ajaxGetMovie(string) {
  var url = 'https://api.themoviedb.org/3/search/movie';
  var api_key = '3f9e54b15da66f4097aa9e87583c6db8';

  $.ajax({
    url: url,
    method: 'GET',
    data: {
      api_key: api_key,
      query: string,
      language: 'it-IT'
    },
    success: function (data) {
      var movie = data.results;
      console.log(movie);
      printMovie(movie);
    },
    error: function (request, state, errors) {
      console.log(errors);
    }
  });
}



function printMovie(movie) {

  var source = $('#film-template').html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < movie.length; i++) {
    var thisMovie = movie[i];
    console.log(thisMovie);

    var context = {
      title: thisMovie.title,
      original_title: thisMovie.original_title,
      original_language: thisMovie.original_language,
      vote_average: thisMovie.vote_average,
    };
    var html = template(context);
    $('.covers').append(html);
  }
}
