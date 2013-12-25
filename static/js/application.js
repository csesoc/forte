var jar = new CookieJar({
  expires:31536000, // seconds
  path: '/'
});

var upvote = function(song_id, playlist_hash, song_votes) {
  vote = 0;
  up_id = "#up_" + song_id;
  down_id = "#down_" + song_id;
  song_votes = parseInt(song_votes, 10);
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
  $j("#votes_" + song_id).text(song_votes);
  sortSongs();
  addToCookie(song_id, vote);
};

var downvote = function(song_id, playlist_hash, song_votes) {
  vote = 0;
  up_id = "#up_" + song_id;
  down_id = "#down_" + song_id;
  song_votes = parseInt(song_votes, 10);
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
  $j("#votes_" + song_id).text(song_votes);
  sortSongs();
  addToCookie(song_id, vote);
};

var sortSongs = function(){
  var $Ul = $j('#Grid');
  $Ul.css({position:'relative',height:$Ul.height(),display:'block'});
  var iLnH;
  var $Li = $j('ul>li');
  $Li.each(function(i,el){
    var iY = $j(el).position().top;
    $j.data(el,'h',iY);
    if (i===1) iLnH = iY;
  });
  $Li.tsort('div>div>h5',{order:'desc'}).each(function(i,el){
    var $El = $j(el);
    var iFr = $j.data(el,'h');
    var iTo = i*iLnH;
    $El.css({position:'absolute',top:iFr}).animate({top:iTo},500);
  });
};

var editSong = function(song_id, song_name, song_artist, song_youtube, playlist_hash) {
  var form_selector = "#song_" + song_id + " div.small-10.columns";
  $j(form_selector).replaceWith('<form id=edit_' + song_id + ' method="POST" action="/playlists/' + playlist_hash + '/' + song_id + '/edit"> \
      <div>\
        <div class="row">\
          <div class="large-10 columns"> \
            <div class="row"> \
              <div class="large-6 columns"> \
              <div class="input-wrapper"> \
                <input id="name_' + song_id + '" type="text" name="name" placeholder="Song name..." required/> \
                <small class="error">You must include a name.</small> \
                </div> \
              </div> \
              <div class="large-6 columns"> \
                <div class="input-wrapper"> \
                  <input id="artist_' + song_id + '" type="text" name="artist" placeholder="Song artist..." required/> \
                  <small class="error">You must include an artist.</small> \
                </div> \
              </div> \
            </div> \
            <div class="row"> \
              <div class="large-8 columns"> \
                <div class="input-wrapper"> \
                  <input id="link_' + song_id + '" type="text" name="youtube" placeholder="Youtube link..." required pattern="youtube"> \
                  <small class="error">You must include a youtube link in the format http://www.youtube.com/watch?v=VIDEOID</small> \
                </div> \
              </div> \
              <div class="large-2 columns"> \
                <input type="submit" class="button postfix" class="no-margin" value="Edit"> \
              </div> \
              <div class="large-2 columns"> \
                <input type="button" class="button postfix secondary" class="no-margin" value="Cancel" onClick="cancelEdit(' + song_id + ',\'' + song_name + '\',\'' + song_artist + '\',\'' + song_youtube + '\',\'' + playlist_hash +'\')"> \
              </div> \
            </div> \
          </div> \
        </div> \
      </div> \
    </form'); 
  $j("#name_" + song_id).val(song_name);
  $j("#artist_" + song_id).val(song_artist);
  $j("#link_" + song_id).val("http://www.youtube.com/watch?v=" + song_youtube);
  var youtube_selector = "#youtube_" + song_id;
  $j(youtube_selector).remove();
  return;
};

var cancelEdit = function(song_id, song_name, song_artist, song_youtube, playlist_hash) {
  var selector = "#edit_" + song_id;
  if (song_youtube) { 
    $j(selector).replaceWith('<div class="small-10 columns"> \
        <h4><img src="/static/img/edit.png"/ onClick="editSong(' + song_id + ',\'' + song_name + '\',\'' + song_artist + '\',\'' + song_youtube + '\',\'' + playlist_hash + '\')"/> ' + song_name + '</h4> \
        <img src="/static/img/delete.png" onClick="deleteSong(' + song_id + ',\'' + song_name + '\',\'' + song_artist + '\',\'' + playlist_hash + '\')"/><i>by</i> ' + song_artist + ' \
      </div> \
      <div id="youtube_' + song_id + '" class="small-1 columns text-center"> \
        <a data-reveal-id="videoModal_' + song_id + '"><i class="fi-social-youtube youtube"></i></a>  \
      </div>');
  } else {
    $j(selector).replaceWith('<div class="small-10 columns"> \
        <h4><img src="/static/img/edit.png"/ onClick="editSong(' + song_id + ',\'' + song_name + '\',\'' + song_artist + '\',\'' + song_youtube + '\',\'' + playlist_hash + '\')"/> ' + song_name + '</h4> \
        <img src="/static/img/delete.png" onClick="deleteSong(' + song_id + ',\'' + song_name + '\',\'' + song_artist + '\',\'' + playlist_hash + '\')"/><i>by</i> ' + song_artist + ' \
      </div>');
  }
}

var deleteSong = function(song_id, song_name, song_artist, playlist_hash) {
  var r = confirm("Are you sure you want to delete " + song_name + " by " + song_artist + "?");
  if (r==true) {
    
    var id = "#song_" + song_id;
    $j(id).animate({
        height:'toggle',
        opacity: '0'
      },
      function() {
        $j(id).remove();    
      }
    );
    
    $j.post("/playlists/" + playlist_hash + "/" + song_id +"/delete");
  }
};

var checkCookie = function() {
  var forte = jar.get('forte');
  if (forte !== null) {
   // console.log(forte);
  } else {
    forte = {};
    jar.put('forte', forte);
  }
  return;
};

var addToCookie = function(song_id, vote) {
  checkCookie();
  var forte = jar.get('forte');
  if(vote === 0) {
    delete forte[song_id];
  } else {
    forte[song_id] = vote;
  }
  jar.put('forte', forte);
};

var applyVotes = function() {
  var forte = jar.get('forte');
  for (var song in forte) {
    if (forte[song] == 1) {
      up_id = "#up_" + song;
      $j(up_id).removeClass("secondary");
    } else {
      down_id = "#down_" + song; 
      $j(down_id).removeClass("secondary");
    }
  }
};