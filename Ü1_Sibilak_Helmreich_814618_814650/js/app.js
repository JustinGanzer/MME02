/**
 * Created by Justin on 05-Apr-16.
 */

/**
 * This function is called every time the document changes its state and
 * is executed once it matches "complete".
 */
document.onreadystatechange = function(){
	if(document.readyState === 'complete'){


		u1.initialize();
	}
}

var u1 = {
//initialize-function zur besseren Übersicht
	initialize : function() {

		//hole die Controller
		var controller = document.getElementsByClassName("controller");

		//iteriere über alle Controller
		for (var i = 0; i < controller.length; i++){

			//hole das zum Controller zugehörige Video und merke es
			var video = controller[i].parentElement.children[0];
			controller[i].children[0].video = video;
			controller[i].children[1].video = video;

			video.onended = function(){
				console.log("video ended");
				this.parentElement.children[1].children[0].innerHTML="play_arrow";
			}

			//EventListener hinzufügen für Play/Pause
			controller[i].children[0].addEventListener("click", function(){

				//Überpüfe, ob pausiert oder nicht und spiele ab/pausiere
				if(this.video.paused){
					this.video.play();
					this.innerHTML = "pause";
					console.log("video played");
				}
				else{
					this.video.pause();
					this.innerHTML = "play_arrow";
					console.log("video paused");
				}
			});

			//EventListener hinzufügen für Stop
			controller[i].children[1].addEventListener("click", function(){
				u1.stopVideo(this.video);
				this.parentElement.children[0].innerHTML = "play_arrow";
			});
		}
	},

//Stopt das Video
//@param video - das Video welches gestoppt werden soll
	stopVideo : function(video){
		video.pause();
		video.currentTime = 0;
		console.log("video stopped");
	}
}