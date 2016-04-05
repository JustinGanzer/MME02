/**
 * Created by Justin on 05-Apr-16.
 */

/**
 * This function is called every time the document changes its state and
 * is executed once it matches "complete".
 */
document.onreadystatechange = function(){
    if(document.readyState === 'complete'){
        

        initialize();
    }
}


//initialize-function zur besseren Übersicht
function initialize(){

	//hole die Controller
	var controller = document.getElementsByClassName("controller");

	//iteriere über alle Controller
	for(var i = 0; i < controller.length; i++){

		//hole das zum Controller zugehörige Video und merke es
		controller[i].video = controller[i].parentElement.children[0]

		//EventListener hinzufügen
		controller[i].addEventListener("click", function(){

			//Überpüfe, ob pausiert oder nicht und spiele ab/pausiere
			if(this.video.paused)
				this.video.play();
			else
				this.video.pause();
		});
	}
}