var jar = new CookieJar({
  expires:31536000, // seconds
  path: '/'
});

var upvote = function(song_id, playlist_hash, song_votes) {
  vote = 0;
  up_id = "#up_" + song_id;
  down_id = "#down_" + song_id;
  song_votes = parseInt(song_votes);
  original_votes = song_votes;
  if ($(up_id).hasClass('secondary') === true) {
    $(up_id).removeClass('secondary');
    song_votes += 1;
    vote = 1;
  } else {
    $(up_id).addClass('secondary');
    song_votes -= 1;
    vote = 0;
  }
  if ($(down_id).hasClass('secondary') === false) {
    $(down_id).addClass('secondary');
    song_votes += 1;
  }
  change_of_votes = song_votes - original_votes;
  if (change_of_votes > 0) {
    $.post("/playlists/" + playlist_hash + "/" + song_id + "/up/" + change_of_votes);
  } else {
    $.post("/playlists/" + playlist_hash + "/" + song_id + "/down/" + Math.abs(change_of_votes));
  }
  votes_id = "#votes_" + song_id;
  $(votes_id).text(song_votes);

  addToCookie(song_id, vote);
};

var downvote = function(song_id, playlist_hash, song_votes) {
  vote = 0;
  up_id = "#up_" + song_id;
  down_id = "#down_" + song_id;
  song_votes = parseInt(song_votes);
  original_votes = song_votes;
  if ($(down_id).hasClass('secondary') === true) {
    $(down_id).removeClass('secondary');
    song_votes -= 1;
    vote = -1;
  } else {
    $.post("/playlists/" + playlist_hash + "/" + song_id + "/up");
    song_votes += 1;
    vote = 0;
  }
  if ($(up_id).hasClass('secondary') === false) {
    $(up_id).addClass('secondary');
    song_votes -= 1;
  }
  change_of_votes = song_votes - original_votes;
  if (change_of_votes > 0) {
    $.post("/playlists/" + playlist_hash + "/" + song_id + "/up/" + change_of_votes);
  } else {
    $.post("/playlists/" + playlist_hash + "/" + song_id + "/down/" + Math.abs(change_of_votes));
  }
  votes_id = "#votes_" + song_id;
  $(votes_id).text(song_votes);

  addToCookie(song_id, vote);
};

var checkCookie = function() {
  var forte = jar.get('forte');
  if (forte != null) {
    console.log(forte);
  } else {
    forte = {};
    jar.put('forte', forte);    
  }
  return;
};

var addToCookie = function(song_id, vote) { 
  var forte = jar.get('forte');
  if(vote == 0) {
    delete forte[song_id];
  } else {
    forte[song_id] = vote;
  }
  jar.put('forte', forte);
};

var applyVotes = function() {
  var forte = jar.get('forte');
  for (song in forte) {
    if (forte[song] == 1) {
      up_id = "#up_" + song;
      $(up_id).removeClass("secondary");
    } else {
      down_id = "#down_" + song;  
      $(down_id).removeClass("secondary");
    }
  }
};