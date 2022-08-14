var container = document.getElementById("three");
var renderer, scene, camera;
var sze = 100;
var mouse = {pos:new THREE.Vector2()};
var boy;
var inc = 0.0;
init();
function init(){

	scene = new THREE.Scene();

	scene.add( new THREE.HemisphereLight( 0x111111, 0x444444 ) );
	var light = new THREE.DirectionalLight( 0xebf3ff, 1.5 );
	light.position.set( 0, 140, 500 ).multiplyScalar( 1.1 );
	scene.add( light );

	camera = new THREE.PerspectiveCamera( 30, sze / sze, 1, 100000 );
	camera.position.set( 0, 0, 70 );
	
	renderer = new THREE.WebGLRenderer( { antialias: true, alpha:true } );
	renderer.toneMapping = THREE.LinearToneMapping;
	renderer.setPixelRatio( window.devicePixelRatio );
	container.appendChild( renderer.domElement );
	renderer.setSize( sze, sze );

	var manager = new THREE.LoadingManager();
	var loader = new THREE.ObjectLoader(manager);
	
	loader.load( "tools/js/keith2EXP.json", function ( loadedScene ) {
		console.log(loadedScene)
		//var base = new THREE.MeshStandardMaterial({color:0x999999});
		var base = new THREE.MeshBasicMaterial({color:0xffffff});
		
		 for(var i = 0;i<loadedScene.children.length; i++){
			
			var child = loadedScene.children[i].clone();
			child.material = base;
			scene.add(child);
			var s = 10.8;
			child.scale.set(s,s,s);
			boy = child;
			
		}

		//console.log(loadedScene)
		animate();
	});

	document.addEventListener("mousemove", onMouseMove);
}

function onMouseMove(e){
	mouse.pos.x = ( e.pageX - (window.innerWidth/2) );
	mouse.pos.y = ( e.pageY - (window.innerHeight/2) );
}

function animate(){
	requestAnimationFrame( animate );
	camera.lookAt(scene.position);
	inc+=0.05;
	$("#title-kc span").each(function(i){
		var t = Math.sin((i*0.5)+inc)*10;
		$(this).css("margin-top", t+"px");
	})
	boy.rotation.y = mouse.pos.x*0.002;
	boy.rotation.x = mouse.pos.y*0.002;

	renderer.render( scene, camera );
}