var upvote = function(song_id, playlist_hash, song_votes) {
  
  up_id = "#up_" + song_id;
  down_id = "#down_" + song_id;

  if ($(up_id).hasClass('secondary') === true) {
    $.post("/playlists/" + playlist_hash + "/" + song_id + "/up");
    $(up_id).removeClass('secondary');
    song_votes += 1;
  } else {
    $.post("/playlists/" + playlist_hash + "/" + song_id + "/down");
    $(up_id).addClass('secondary');
  }
  if ($(down_id).hasClass('secondary') === false) {
    $.post("/playlists/" + playlist_hash + "/" + song_id + "/up");
    $(down_id).addClass('secondary');
  }

  votes_id = "#votes_" + song_id;
  $(votes_id).text(song_votes);
  sortSongs();
};

var downvote = function(song_id, playlist_hash, song_votes) {
  up_id = "#up_" + song_id;
  down_id = "#down_" + song_id;

  if ($(down_id).hasClass('secondary') === true) {
    $.post("/playlists/" + playlist_hash + "/" + song_id + "/down");
    $(down_id).removeClass('secondary');
    song_votes -= 1;
  } else {
    $.post("/playlists/" + playlist_hash + "/" + song_id + "/up");
    $(down_id).addClass('secondary');
  }
  if ($(up_id).hasClass('secondary') === false) {
    $.post("/playlists/" + playlist_hash + "/" + song_id + "/down");
    $(up_id).addClass('secondary');
  }

  votes_id = "#votes_" + song_id;
  $(votes_id).text(song_votes);
  sortSongs();
};

var sortSongs = function(){
  sorted = $('#sortable > div').sort(function(a, b) {
    return $("p", a).text() < $("p", b).text()
  });
  $('#sortable').html('');
  sorted.each(function(i, a) {$('#sortable').append(a)});
}