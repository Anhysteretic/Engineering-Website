import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const scene = new THREE.Scene();
const loader = new GLTFLoader();
const loader1 = new GLTFLoader();
const skateboardScale = 0.75;



const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'), 
  alpha: true
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );


renderer.render( scene, camera);

// scene.background = new THREE.Color( 0xffffff );

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
// const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } )
// const torus = new THREE.Mesh( geometry, material );
// scene.add(torus);

let loadedSkateboard;

loader.load(
  '/Skateboard/Skateboard.glb',
  function (gltf) {
    
    loadedSkateboard = gltf
    
    const skateboard = gltf.scene;
    
    skateboard.position.set(0, -4, 0)
    skateboard.scale.set(skateboardScale,skateboardScale,skateboardScale);
    
    scene.add(skateboard);
    
  },
  
  function ( xhr ) {
    
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
  }
);

let loadedTrucks;

loader1.load(
  './Trucks.glb',
  function (gltf) {
    
    loadedTrucks = gltf
    
    const trucks = gltf.scene;
    
    trucks.position.set(2.5, -100, 0)
    trucks.scale.set(15,15,15)
    
    scene.add(trucks);
    
  },
  
  function ( xhr ) {
    
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
  }
);

const pointLight = new THREE.PointLight(0xffffff, 2, 0, 0.01);
pointLight.position.set(0,1,5);
const pointLight1 = new THREE.PointLight(0xffffff, 2, 0, 0.01);
pointLight1.position.set(0,1,300);
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper)

// const gridHelper = new THREE.GridHelper();
// scene.add(gridHelper)




function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material ); 
  const [x , y , z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 1000 ) );

  star.position.set(x,y,z);
  scene.add(star)
}

// Array(2000).fill().forEach(addStar)

function addNearStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const nearStar = new THREE.Mesh( geometry, material );

  const [x , y , z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

  nearStar.position.set(x,y,z);
  scene.add(nearStar)
}
// Array(20).fill().forEach(addNearStar)

// const controls = new OrbitControls(camera, renderer.domElement);
// scene.add(controls)

const Screenshot1 = new THREE.TextureLoader().load('./CADScreenshot1.jpg')

const CADScreenshot1 = new THREE.Mesh(
  new THREE.BoxGeometry(8,6,0.1),
  new THREE.MeshBasicMaterial( { map: Screenshot1 })
)
scene.add(CADScreenshot1)
CADScreenshot1.position.set(5, -100, -4)

const jackTexture = new THREE.TextureLoader().load('./Jack.jpg')

const jack = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial( { map: jackTexture } )
);
scene.add(jack)

jack.position.x = 2.5; 
jack.position.y = 0; 
jack.position.z = 0;

const moonTexture = new THREE.TextureLoader().load('./moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32), 
  new THREE.MeshStandardMaterial( { 
    map: moonTexture, 
    normalMap: normalTexture
  } )
);
moon.position.set(15,20,-20)
// scene.add(moon)



camera.position.z = 6;
camera.position.x;
camera.position.y; 


function moveCamera() {
  const t = document.body.scrollTop || document.documentElement.scrollTop || window.scrollY;



  // moon.rotation.x += 0.05;
  // moon.rotation.y += 0.075;
  // moon.rotation.z +=0.05;
  
  jack.rotation.x = t * 0.003;
  jack.rotation.z = t * 0.002;

  let s = 600
  if (t > s) {
    
    jack.position.y = ((t-s) * 0.00);
    // jack.position.z = (-5 + (s * 0.009)) - ((t-s) * 0.01);
    jack.position.x = ( (2.5 + ((s) * 0.004)) + ((t-s) * 0.05))
  }
  else {
    // jack.position.z = -5 + (t * 0.009);
    jack.position.x = (2.5 + ((t) * 0.004))
  }
  

  // loadedSkateboard.scene.position.x = 1.5 + ((t-1200) * 0.005) ;
  loadedSkateboard.scene.position.y = 2.5 + ((t-1000) * 0.0125);
  // loadedSkateboard.scene.position.z = 7 + ((t-1000) * 0.01);
  loadedSkateboard.scene.rotation.y = 1 + ((t-1000) * 0.005);
  loadedSkateboard.scene.rotation.x = (t-1000) * 0.0005;
  // loadedSkateboard.scene.position.z = t * 0.01 ;
  CADScreenshot1.position.y = -18 + ((t) * 0.015);
  // CADScreenshot1.position.z = 5 + ((t-1000) * 0.01);
  CADScreenshot1.rotation.y = 1.3 + ((t) * 0.001);

  loadedTrucks.scene.position.y = -4 + ((t-1000) * 0.01);
  // loadedTrucks.scene.position.z = 7 + ((t-1000) * 0.01);
  loadedTrucks.scene.rotation.y = ((t) * 0.005);
  loadedTrucks.scene.rotation.x = (t-1500) * 0.0005;
  
  

  // camera.position.z = (1 + t * 0.01);
  camera.position.x = ( t * 0.0002);
  camera.position.y = ( t * 0.0002); 
}

window.onscroll = moveCamera

function animate() {

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  // controls.update();

  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}

animate()
