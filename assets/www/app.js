// Lecteur audio
var audio = null;

// Une fois la fenêtre du navigateur chargée, initialise PhoneGap
window.addEventListener('load', function(){
	document.addEventListener("deviceready", onDeviceReady, false);
}, false);

// Cette méthode est appelée une fois que PhoneGap est chargé
function onDeviceReady(){
	// Création du bouton de lecture du fichier audio son.mp3
	var btnPlay = $('#btnPlay');
	btnPlay.click(function(){
		// Démarre la lecture du fichier son.mp3 se trouvant dans les assets
		audio = new Media ("/android_asset/son.mp3", function() {
	    }, function(error) {
	    	alert ('Erreur: ' + error.message);
	    });
	    audio.play();
		// Désactive le bouton Play et active le bouton Pause
	    btnPlay.button('disable');
		btnPause.button('enable');
		window.plugins.socialmessage.send("C'est un message test");
	});
	
	// Création du bouton de pause de lecture du fichier son
	var btnPause = $('#btnPause');
	btnPause.click(function(){
	    // Mise en pause de la lecture du fichier son
		if (audio) {
	        audio.pause();
	    }
		btnPause.button('disable');
		btnPlay.button('enable');
	});
	
	// Création du bouton d'arrêt de lecture du fichier son
	var btnStop = $('#btnStop');
	btnStop.click(function(){
	    // Arrêt de la lecture du fichier son et libération des ressources
		if (audio) {
	        audio.stop();
	        audio.release();
	    }
		// Désactive le bouton Pause et active le bouton Play
		btnPause.button('disable');
	    btnPlay.button('enable');
	});
	
	// Création du bouton d'enregistrement audio
	var btnRecord = $('#btnRecord');
	btnRecord.click(function(){
		// Arrêt de la lecture du fichier son et libération des ressources
		if (audio) {
	        audio.stop();
	        audio.release();
	    }
		// Désactive les boutons Record et Pause et active le bouton Play 
		btnRecord.button('disable');
		btnPlay.button('enable');
		btnPause.button('disable');
		// Fixe la durée de l'enregistrement
		var compteur = 10;
		// Démarre l'enregistrement dans le fichier capture_audio.mp3
		audioRec = new Media ('capture_audio.mp3', function(){
	    }, function(error){
	    	alert ("Erreur: " + error.message);
	    });
	    audioRec.startRecord();
	    // Indique le début de l'enregistrement
	    $('#capture').text('Enregistrement en cours...');
	    // Arrête l'enregistrement au bout de 10 secondes
	    setTimeout (function() {
	    	// Indique la fin de l'enregistrement
	    	$('#capture').text("Arrêt de l'enregistrement à " + compteur + " secondes");
	    	// Arrête l'enregistrement
	    	audioRec.stopRecord();
	    	audioRec.release();
			// Lit le contenu de l'enregistrement audio
	    	btnRecord.button('enable');
			audio = new Media ('capture_audio.mp3', function() {
		    }, function(error) {
		    	alert ('Erreur: ' + error.message);
		    });
		    audio.play();
	    }, 10000);
	});
}
