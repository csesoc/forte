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
  if ($j(up_id).hasClass('secondary') === true) {
    $j(up_id).removeClass('secondary');
    song_votes += 1;
    vote = 1;
  } else {
    $j(up_id).addClass('secondary');
    song_votes -= 1;
    vote = 0;
  }
  if ($j(down_id).hasClass('secondary') === false) {
    $j(down_id).addClass('secondary');
    song_votes += 1;
  }
  change_of_votes = song_votes - original_votes;
  if (change_of_votes > 0) {
    $j.post("/playlists/" + playlist_hash + "/" + song_id + "/up/" + change_of_votes);
  } else {
    $j.post("/playlists/" + playlist_hash + "/" + song_id + "/down/" + Math.abs(change_of_votes));
  }
  votes_id = "#votes_" + song_id;
  $j(votes_id).text(song_votes);
  sortSongs();
  addToCookie(song_id, vote);
};

var downvote = function(song_id, playlist_hash, song_votes) {
  vote = 0;
  up_id = "#up_" + song_id;
  down_id = "#down_" + song_id;
  song_votes = parseInt(song_votes);
  original_votes = song_votes;
  if ($j(down_id).hasClass('secondary') === true) {
    $j(down_id).removeClass('secondary');
    song_votes -= 1;
    vote = -1;
  } else {
    $j(down_id).addClass('secondary');
    song_votes += 1;
    vote = 0;
  }
  if ($j(up_id).hasClass('secondary') === false) {
    $j(up_id).addClass('secondary');
    song_votes -= 1;
  }
  change_of_votes = song_votes - original_votes;
  if (change_of_votes > 0) {
    $j.post("/playlists/" + playlist_hash + "/" + song_id + "/up/" + change_of_votes);
  } else {
    $j.post("/playlists/" + playlist_hash + "/" + song_id + "/down/" + Math.abs(change_of_votes));
  }
  votes_id = "#votes_" + song_id;
  $j(votes_id).text(song_votes);
  sortSongs();
  addToCookie(song_id, vote);
};

var sortSongs = function(){
  sorted = $j('#sortable > div').sort(function(a, b) {
    return parseInt($j("p", a).text()) < parseInt($j("p", b).text())
  });
  $j('#sortable').html('');
  sorted.each(function(i, a) {$j('#sortable').append(a)});
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
      $j(up_id).removeClass("secondary");
    } else {
      down_id = "#down_" + song;  
      $j(down_id).removeClass("secondary");
    }
  }
};