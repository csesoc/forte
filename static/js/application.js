var upvote = function(song_id, playlist_hash, song_votes) {
  
  up_id = "#up_" + song_id;
  down_id = "#down_" + song_id;

  if ($(up_id).hasClass('voted') === false) {
    $.post("/playlists/" + playlist_hash + "/" + song_id + "/up");
    $(up_id).addClass('voted');
    song_votes += 1;
  } else {
    $.post("/playlists/" + playlist_hash + "/" + song_id + "/down");
    $(up_id).removeClass('voted');
  }
  if ($(down_id).hasClass('voted') === true) {
    $.post("/playlists/" + playlist_hash + "/" + song_id + "/up");
    $(down_id).removeClass('voted');
  }

  votes_id = "#votes_" + song_id;
  $(votes_id).text(song_votes);
};

var downvote = function(song_id, playlist_hash, song_votes) {
  up_id = "#up_" + song_id;
  down_id = "#down_" + song_id;

  if ($(down_id).hasClass('voted') === false) {
    $.post("/playlists/" + playlist_hash + "/" + song_id + "/down");
    $(down_id).addClass('voted');
    song_votes -= 1;
  } else {
    $.post("/playlists/" + playlist_hash + "/" + song_id + "/up");
    $(down_id).removeClass('voted');
  }
  if ($(up_id).hasClass('voted') === true) {
    $.post("/playlists/" + playlist_hash + "/" + song_id + "/down");
    $(up_id).removeClass('voted');
  }

  votes_id = "#votes_" + song_id;
  $(votes_id).text(song_votes);
};