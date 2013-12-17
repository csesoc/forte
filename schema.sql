drop table if exists playlists;
drop table if exists songs;
create table playlists (
  id integer primary key autoincrement,
  hash, text,
  name text,
  description text
);
create table songs (
  id integer primary key autoincrement,
  name text,
  artist text,
  youtube text,
  votes, integer,
  playlist integer,
  foreign key(playlist) references playlists(id)
);