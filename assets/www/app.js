// Lecteur audio
var audio = null;

// Une fois la fen�tre du navigateur charg�e, initialise PhoneGap
window.addEventListener('load', function(){
	document.addEventListener("deviceready", onDeviceReady, false);
}, false);

// Cette m�thode est appel�e une fois que PhoneGap est charg�
function onDeviceReady(){
	// Cr�ation du bouton de lecture du fichier audio son.mp3
	var btnPlay = $('#btnPlay');
	btnPlay.click(function(){
		// D�marre la lecture du fichier son.mp3 se trouvant dans les assets
		audio = new Media ("/android_asset/son.mp3", function() {
	    }, function(error) {
	    	alert ('Erreur: ' + error.message);
	    });
	    audio.play();
		// D�sactive le bouton Play et active le bouton Pause
	    btnPlay.button('disable');
		btnPause.button('enable');
		window.plugins.socialmessage.send("C'est un message test");
	});
	
	// Cr�ation du bouton de pause de lecture du fichier son
	var btnPause = $('#btnPause');
	btnPause.click(function(){
	    // Mise en pause de la lecture du fichier son
		if (audio) {
	        audio.pause();
	    }
		btnPause.button('disable');
		btnPlay.button('enable');
	});
	
	// Cr�ation du bouton d'arr�t de lecture du fichier son
	var btnStop = $('#btnStop');
	btnStop.click(function(){
	    // Arr�t de la lecture du fichier son et lib�ration des ressources
		if (audio) {
	        audio.stop();
	        audio.release();
	    }
		// D�sactive le bouton Pause et active le bouton Play
		btnPause.button('disable');
	    btnPlay.button('enable');
	});
	
	// Cr�ation du bouton d'enregistrement audio
	var btnRecord = $('#btnRecord');
	btnRecord.click(function(){
		// Arr�t de la lecture du fichier son et lib�ration des ressources
		if (audio) {
	        audio.stop();
	        audio.release();
	    }
		// D�sactive les boutons Record et Pause et active le bouton Play 
		btnRecord.button('disable');
		btnPlay.button('enable');
		btnPause.button('disable');
		// Fixe la dur�e de l'enregistrement
		var compteur = 10;
		// D�marre l'enregistrement dans le fichier capture_audio.mp3
		audioRec = new Media ('capture_audio.mp3', function(){
	    }, function(error){
	    	alert ("Erreur: " + error.message);
	    });
	    audioRec.startRecord();
	    // Indique le d�but de l'enregistrement
	    $('#capture').text('Enregistrement en cours...');
	    // Arr�te l'enregistrement au bout de 10 secondes
	    setTimeout (function() {
	    	// Indique la fin de l'enregistrement
	    	$('#capture').text("Arr�t de l'enregistrement � " + compteur + " secondes");
	    	// Arr�te l'enregistrement
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
