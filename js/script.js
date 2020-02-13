$(document).ready(function () {
  // click
  $('#searchBtn').click(function() {
    var query = $('#searchBar').val();
    cleanSearch();
    addContainer();
    ajaxGetMovie(query);
    ajaxGetTVseries(query);
  })
  // keypress
  $('#searchBar').keypress(function(event) {
    if (event.which == 13) {
      var query = $('#searchBar').val();
      cleanSearch();
      addContainer();
      ajaxGetMovie(query);
      ajaxGetTVseries(query);
    }
  })

});

// F U N Z I O N I //

function ajaxGetMovie(string) {
  var url = 'https://api.themoviedb.org/3/search/movie';
  var api_key = '3f9e54b15da66f4097aa9e87583c6db8';

  $.ajax({
    url: url,
    method: 'GET',
    data: {
      api_key: api_key,
      query: string,
      language: 'it-IT',
    },
    success: function (data) {
      // controllo risultato ricerca
      if (data.total_results > 0) {
        var movie = data.results;
        printResearch('Film', movie);
      }
      //
      else {

        noReturn($('.movies'));
      }
    },
    error: function (request, state, errors) {
      console.log(errors);
    }
  });
}

function ajaxGetTVseries(string) {
  var url = 'https://api.themoviedb.org/3/search/tv';
  var api_key = '3f9e54b15da66f4097aa9e87583c6db8';

  $.ajax({
    url: url,
    method: 'GET',
    data: {
      api_key: api_key,
      query: string,
      language: 'it-IT',
    },
    success: function (data) {
      // controllo risultato ricerca
      if (data.total_results > 0) {
        var series = data.results;
        printResearch('Serie TV', series);
      }
      //
      else {

        noReturn($('.tvSeries'));
      }
    },
    error: function (request, state, errors) {
      console.log(errors);
    }
  });
}

function printResearch(type, results) {

  var source = $('#film-template').html();
  var template = Handlebars.compile(source);
  var title;
  var original_title;

  for (var i = 0; i < results.length; i++) {
    var thisResult = results[i];
    // verifica serie/film
    if (type == 'Film') {
      title = thisResult.title;
      original_title = thisResult.original_title;
      var videoType = $('.movies');
    }
    else if (type == 'Serie TV') {
      title = thisResult.name;
      original_title = thisResult.original_name;
      var videoType = $('.tvSeries');
    }
    // // // // // // // //

    var context = {
      type: type,
      title: title,
      original_title: original_title,
      original_language: languageFlag(thisResult.original_language),
      vote_average: starsRate(thisResult.vote_average),
      poster: posterPrint(thisResult.poster_path),
      overview: printOverview(thisResult.overview)
    };
    var html = template(context);
    videoType.append(html);
  }
}

function printOverview(overview){
  var overviewText;
  overviewText = overview;
  return overviewText;
}

function posterPrint(poster_path, title) {
  var posterImg;
  var urlPosterImg = 'https://image.tmdb.org/t/p/w185';
  if (poster_path == null) {
    posterImg = '<img class="posterImg" src="img/default-img.png">';
  }
  else {
    posterImg = '<img src="'+ urlPosterImg + poster_path +'">';
  }
  return posterImg;
}

function noReturn(videoType) {
  var source = $('#noReturn-template').html();
  var template = Handlebars.compile(source);
  var html = template();
  videoType.append(html);
}

function cleanSearch() {
  $('.movies').html('');
  $('.tvSeries').html('');
  $('#searchBar').val('');
}

function starsRate(number){
  number = Math.ceil(number / 2);
  var string = '';

  for (var i = 1; i <= 5; i++) {
    if (i <= number) {
      string += '<i class="fas fa-star"></i>';
    } else {
      string += '<i class="far fa-star"></i>';
    }
  }
  return string;
}

function languageFlag(string){
  var flagAvailable = [
    'en',
    'it'
  ];
  // per preferenza, niente bandiera O.o //

   // if (flagAvailable.includes(string)) {
   //    string = '<img class="languageImg" src="img/' + string + '.svg">';
   // }

  return string;
}

function getSrcWord(){
  var srcWord = $('#searchBar').val();
  return srcWord;
  console.log(srcWord);
}

function addContainer() {
  $('#searchList').empty()
  $('#searchList').append('<h2 id="srcWord">Risultati per: ""</h2>')
  $('#searchList').append('<h2>Film:</h2>', '<div id="mainList" class="movies"></div>');
  $('#searchList').append('<h2>Serie tv:</h2>', '<div id="mainList" class="tvSeries"></div>');
}







///////////DOMANDE//////////

// come posso organizzare uno slider manuale per gli elementi di ricerca?  (tenendo conto del numero dei risultati e organizzarne max 4 per pagina)
