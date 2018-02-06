
  var recognition = new webkitSpeechRecognition();

  $('#start_img').on('click', function () {
    // This will make your browser start
    // listening to the user
    recognition.start();
  }) ;

  $('.welcome-screen button').on('click', function() {           // EVENT 
  var name = $('#name-input').val();

  if(name.length > 2) {
    var message = "Welcome, " +  name;
    $('.main .user-name').text(message);
    $('.welcome-screen').addClass('hidden');
    $('.main').removeClass('hidden');
    
    fetchSongs() ;
  }
  else {
  $('#name-input').addClass('error');
}
});  

  function fetchSongs() {

      $.ajax({
        'url': 'https://api.jsonbin.io/b/5a33ec99e16b1771645da15d',
        'dataType': 'json',
        'method': 'GET',
        'success': function (responseData) {
          // do something with the data here
          songs = responseData ;
          // Data is here, let's do everything else
            setUpPlaylist() ;
            changeCurrentSongDetails(0);

        }
      }).fail(function() {
    alert( "error" );
  }) ;

    }

    
   
       var songs = [
 
];
       

  var currentSongPosition = null ;
  

        function setUpPlaylist() {

      var songDetailsHTML = '<span class="song-name"> </span>' +
        '<span class="song-artist"> </span>'+'<span class="song-album"> </span>' +
        '<span class="song-length"> </span>' ;

      for(var i=0; i < songs.length ; i++) {
    
    $('.song-list').append('<div id="song' + i + '" class="song">'+ songDetailsHTML +'</div>') ;

    var song = songs[i];

    $('#song'+ i + ' .song-name').text(song.name);
    $('#song'+ i + ' .song-artist').text(song.artist);
    $('#song'+ i + ' .song-album').text(song.album);
    $('#song'+ i + ' .song-length').text(song.duration);


    $('#song'+ i).attr('data-song-position', i) ;

    $('#song' + i).click(function () {
      var audio = document.querySelector('audio');


      // Condition to check if song is not current one
      if ($(this).attr('data-song-position') != currentSongPosition){

        var songPosition = parseInt($(this).attr('data-song-position')) ;
        audio.src = songs[songPosition].fileName 
        changeCurrentSongDetails(songPosition);

    // Make sure you update the variable
    // to mark the current song
    currentSongPosition = songPosition ;
  }

  toggleSong();
});
      } ;
    }

    function changeCurrentSongDetails(songPosition) {
  var songObj = songs[songPosition] ;
  $('.current-song-image').attr('src',songObj.image) ;                // AFTER: here we put imgs url(and songs)in src attribute(and in songs object)
                                                                      // directly through AJAX , this is 'dynamic '
 // $('.current-song-image').attr('src','img/' + songObj.image) ;     // BEFORE : frstly we put song-covers in img foldr (this is 'hard coding data') but
                                                                      // it's not easy and handy to put thousands of imgs in folder again and again 
                                                                      // therefore we put imgs and songs directly through AJAX
  $('.current-song-name').text(songObj.name) ;
  $('.current-song-album').text(songObj.album) ;
}

       function fancyTimeFormat(time) {   
           // Hours, minutes and seconds
           var hrs = ~~(time / 3600);            // ~~ means Math.floor() here
           var mins = ~~((time % 3600) / 60);
           var secs = time % 60;

           // Output like "1:01" or "4:03:59" or "123:03:59"
           var ret = "";

           if (hrs > 0) {
               ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
           }

           ret += "" + mins + ":" + (secs < 10 ? "0" : "");
           ret += "" + secs;
           return ret;
       }


       function updateCurrentTime() {
          var song = document.querySelector('audio');

          var currentTime = Math.floor(song.currentTime);
          currentTime = fancyTimeFormat(currentTime);

          var duration = Math.floor(song.duration);
          duration = fancyTimeFormat(duration);
          // Get the elements with the class and set the text
          $('.time-elapsed').text(currentTime);
          $('.song-duration').text(duration);
        }


      function toggleSong() {
         var song = document.querySelector('audio');               //  here we select and thn put audio into song variable.
         updateCurrentTime();

         console.log(song.paused) ;

         // chk whether song paused or not if so thn run if condn code otherwise run else condn code.
         if(song.paused == true) {
              console.log('Playing');
              $('.play-icon').removeClass('fa-play').addClass('fa-pause');
              song.play();
          }
         else {
             console.log('Pausing');
             $('.play-icon').removeClass('fa-pause').addClass('fa-play');
             song.pause();
         }
     } 


      // Instead of writing the same code twice, we wrote it once in a function and just called it in these two events

   	  $('.play-icon').on('click',function() {               // EVENT: run the code whn u clk the play icon class i.e. fa-play icon
   	  	  toggleSong();
      }); 
 

     /*  here browser tells us that some event occur and pass it to the fnctn. 
     The (event) part is the list of information we are getting from the browser.
     The list of information has one particular line which tells us the key code. */
    
      $('body').on('keypress',function(event) {              
         if (event.keyCode == 32){                              // EVENT: here fnctn chks the event type. here it is press of spacebar having keycode=32
     	    toggleSong();

         }
      });
 
