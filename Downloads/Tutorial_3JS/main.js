import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';

function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );

	const fov = 75;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.z = 3;

	const controls = new OrbitControls( camera, canvas );
	controls.target.set( 0, 0, 0 );
	controls.update();

	const scene = new THREE.Scene();

	{

		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( - 1, 2, 4 );
		scene.add( light );

	}

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );
	const cylGeo = new THREE.CylinderGeometry(1, 1, 2)
	const pyr = new THREE.ConeGeometry(1, 3, 4)
	const fur_pyr = new THREE.ConeGeometry(1, 1, 4)

	//fish! fish, fish, fish

	{
		const mtlLoader = new MTLLoader();
			mtlLoader.load('12265_Fish_v1_L2.mtl', (mtl) => {
		  		mtl.preload();
				const objLoader = new OBJLoader();
		  		objLoader.setMaterials(mtl);
		  		objLoader.load('12265_Fish_v1_L2.obj', (root) => {
					scene.add(root);
		  		});
			});
	}
	
	function makeInstance( geometry, color, x , mtl=null) {

		if (mtl == null) {
			mtl = new THREE.MeshPhongMaterial( { color } );
		}		
		const cube = new THREE.Mesh( geometry, mtl );
		scene.add( cube );

		cube.position.x = x;

		return cube;

	}

	const loader = new THREE.TextureLoader();
	const texture = loader.load( 'fur.jpg' );
	texture.colorSpace = THREE.SRGBColorSpace; 
	const fur = new THREE.MeshBasicMaterial({
  		color: 0xFF8844,
  		map: texture,
	});
	
	const loader2 = new THREE.TextureLoader();
	const texture2 = loader.load( 'Scales83.jpg' );
	const scales = new THREE.MeshBasicMaterial({
		color: 0x1983CC,
		map: texture2
	})
	const cubes = [
		makeInstance( geometry, 0x44aa88, -20 ),
		makeInstance( cylGeo, 0x8388bb, - 24 ),
		makeInstance( pyr, 0x198383, 22 ),
		makeInstance( fur_pyr, 0x198383, 28, fur )	
	];
	//make cylinder
	


	{

		const loader = new THREE.TextureLoader();
		const texture = loader.load(
			'./2294472375_0f11ed3731_k.jpg',
			() => {

				texture.mapping = THREE.EquirectangularReflectionMapping;
				texture.colorSpace = THREE.SRGBColorSpace;
				scene.background = texture;

			} );

	}

	function resizeRendererToDisplaySize( renderer ) {

		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );

		}

		return needResize;

	}

	function render( time ) {

		time *= 0.001;

		if ( resizeRendererToDisplaySize( renderer ) ) {

			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();

		}

		cubes.forEach( ( cube, ndx ) => {

			const speed = 1 + ndx * .1;
			const rot = time * speed;
			cube.rotation.x = rot;
			cube.rotation.y = rot;

		} );

		renderer.render( scene, camera );

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

}

main();
