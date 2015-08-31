var IS_ONLINE = window.location.protocol.indexOf ("http") == 0;

var BASE_PATH = IS_ONLINE ? "/_Resources/Static/Packages/Wysiwyg.Vamos/img/gallery/"  : "data/images/";
//var BASE_PATH = IS_ONLINE ? "/templates/img/gallery/images/"  : "data/images/";
var FAST_PASS = !IS_ONLINE;

var USE_HIGH_RESOLUTION = window.devicePixelRatio > 1;


function preloadFonts () {
	var fontsToPreload = [ /*
		{name: "FontAwesome"},
		{name: "OfficinaSansITCW01-Book 734509"},
		{name: "OfficinaSansITCW01-Bold"}
		
	*/ ];
	var numFontsToPreload = fontsToPreload.length;
	
	if (numFontsToPreload) {
		for (var i = numFontsToPreload; i--;) {
			var fontDescription = fontsToPreload [i];
			var fontName = fontDescription.name;
			
			var job = new FontLoaderJob (fontName);
			job.testCharacter = fontDescription.testCharacter;
			
			job.addListener ("complete", completeFont);
			job.load ();
			
		}
		
	} else {
		startUp ();
		
	}
	
	function completeFont (job) {
		// trace ("preloaded", job.path, numFontsToPreload - 1, "to come.");
		
		if (!--numFontsToPreload)
			startUp ();
		
	}
	
}
