// Setup three.js WebGL renderer
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor(0xddddfd);

// Append the canvas element created by the renderer to document body element.
document.body.appendChild(renderer.domElement);

// Create a three.js scene
var scene = new THREE.Scene();

// Create a three.js camera
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
scene.add(camera);
camera.position.set(0, 1, 0);

// Apply VR headset positional data to camera.
var controls = new THREE.VRControls(camera);

// Apply VR stereo rendering to renderer
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);

// VR Scene Below

var pi = 3.141592653589793238;
var phi = 1.618033988749894848;

scene.fog = new THREE.FogExp2(0xddddfd, 0.07);

var everything = new THREE.Object3D();
scene.add(everything);

// ground
var groundGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
var groundMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, side: THREE.DoubleSide, wireframe: false});
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -pi / 2;
everything.add(ground);

for (var i = 0; i<ground.geometry.vertices.length; i++) {
  ground.geometry.vertices[i].z = (Math.random() + 1) - 1.5 * Math.sin(ground.geometry.vertices[i].y/5) - 1.5 * Math.sin(ground.geometry.vertices[i].x/5) - 2.8 * Math.cos(ground.geometry.vertices[i].y/18);
}

// sky
var skyGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
var skyMaterial = new THREE.MeshBasicMaterial({color: 0xbcbcbc, side: THREE.DoubleSide, wireframe: false});
var sky = new THREE.Mesh(skyGeometry, skyMaterial);
sky.rotation.x = -pi / 2;
sky.position.y = 12;
everything.add(sky);
for (var i = 0; i<sky.geometry.vertices.length;i++) {
  sky.geometry.vertices[i].z = 2.3 * Math.sin(sky.geometry.vertices[i].y / 5) - 1.2 * Math.sin(sky.geometry.vertices[i].x / 4);
}

// snow
var snowFloor = -3;
var particles = new THREE.Geometry();
var partCount = 2200;
for (var p = 0; p<partCount; p++) {
  var part = new THREE.Vector3(
    24 * Math.random() - 12,
    12 * Math.random() + snowFloor,
    24 * Math.random() - 12
);
  part.velocity = new THREE.Vector3(
    Math.random() / 100,
    -Math.random() * 0.05,
    Math.random() / 100
);
  particles.vertices.push(part);
}
var partMat = new THREE.PointCloudMaterial({color: 0xffffff, size: 0.09});
var partSystem = new THREE.PointCloud(particles, partMat);
partSystem.sortParticles = true;
partSystem.frustumCulled = false;
everything.add(partSystem);

// normal trees
var tree = [];
var treeVector = [];
var treeHeight = [];
var treeWidth = [];
var treeNumber = 18;
for (var i = 0; i<treeNumber; i++) {
  treeVector[i] = new THREE.Vector2();
  treeWidth[i] = Math.random() / 4 + 1;
  treeHeight[i] = Math.random() * 7 + 3;
  tree[i] = new THREE.Mesh(
    new THREE.CylinderGeometry(0.01, treeWidth[i], treeHeight[i]),
    new THREE.MeshLambertMaterial({color: 0x00bb00, side: THREE.DoubleSide, wireframe: false})
);
  tree[i].position.x = Math.random() * 100 - 50;
  tree[i].position.z = Math.random() * 100 - 50;
  everything.add(tree[i]);
}

// cool trees
var pine = [];
var pineNumber = 12;
for (var i = 0; i<pineNumber; i++) {
  var branchNumber = Math.random() * 20 + 10;
  pine[i] = new THREE.Object3D();
  for (var b = 0; b<branchNumber; b++) {
    branch = new THREE.Mesh(
      new THREE.TetrahedronGeometry(),
      new THREE.MeshLambertMaterial({color: 0x00ee00, side: THREE.DoubleSide, wireframe: false})
);
    branch.geometry.vertices[1].z = 1 / (b + 3);
    branch.position.y = b / branchNumber * 10;
    branch.rotation.y = b * phi * pi;
    branch.scale.set(branchNumber / (b + 5) + 1, branchNumber / (b + 5) + 1, branchNumber / (b + 5) + 1);
    branch.frustrumCulled = false;
    pine[i].add(branch);
  }
  pine[i].scale.set(0.5, 0.5, 0.5);
  pine[i].position.x = Math.random() * 100 - 50;
  pine[i].position.z = Math.random() * 100 - 50;
  everything.add(pine[i]);
}

// lights
var light = new THREE.PointLight(0xffffff, 1.25, 100);
light.position.set(0, 25, 0);
light.castShadow = true;
everything.add(light);

// directional cubes because I am completely unable to think spatially
var cubePosX = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0x00ff00}));
cubePosX.position.set(1, 3, 0);
// everything.add(cubePosX);

var cubePosY = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0x0000ff}));
cubePosY.position.set(0, 4, 0);
// everything.add(cubePosY);

var cubePosZ = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0xff0000}));
cubePosZ.position.set(0, 3, 1);
// everything.add(cubePosZ);

/* sled which I can't
  var sled = new THREE.Object3D();

  // var sledCenter = new THREE.Mesh(
  //  new THREE.TetrahedronGeometry(),
  //  new THREE.MeshLambertMaterial({color: 0xffff00})
  //);
  // sledCenter.scale.set(0.1,0.1,0.1);
  // sled.add(sledCenter);

  var sledFront = new THREE.Mesh(
    new THREE.TetrahedronGeometry(),
    new THREE.MeshLambertMaterial({color: 0x550000})
);
  sledFront.position.z = 0.5;
  sledFront.scale.set(0.1,0.1,0.1);
  sled.add(sledFront);

  var slat = new THREE.Mesh(
    new THREE.BoxGeometry(0.5,0.05,1),
    new THREE.MeshLambertMaterial({color: 0x330000})
);
  sled.add(slat);

  scene.add(sled);

  // var headProjection = new THREE.Mesh(
  //  new THREE.IcosahedronGeometry(),
  //  new THREE.MeshLambertMaterial({color: 0x0000ff})
  //);
  // headProjection.scale.set(0.1,0.1,0.1);
  // scene.add(headProjection);

  var pos = new THREE.Vector2;
  var moveVector = new THREE.Vector2;
  var crouchHeight = 1.2;
  var crouchToggleHeight = 0.5;
  var sledDistance = 0.8;
  var speed = 0.2;
  var sledToggle = 0;
  var sledToggleDistance = 0.4;

  var t = 0;*/

/*
Request animation frame loop function
*/
function animate() {
  // Apply any desired changes for the next frame here.
  for (var p = 0; p<partCount; p++) {
    // check if we need to reset particles
    if (particles.vertices[p].y<snowFloor) {
      particles.vertices[p].set(
        24 * Math.random() - 12 + camera.position.x,
        12 * Math.random(),
        24 * Math.random() - 12 + camera.position.z);
      particles.vertices[p].velocity.x = Math.random() / 100;
      particles.vertices[p].velocity.y = -Math.random() * 0.1;
      particles.vertices[p].velocity.z = Math.random() / 100;
    }
    
    particles.vertices[p].y += particles.vertices[p].velocity.y;
    particles.vertices[p].z += particles.vertices[p].velocity.z;
    particles.vertices[p].x += particles.vertices[p].velocity.x;
  }
  light.position.x = camera.position.x - 10;
  light.position.z = camera.position.z + 6;
      
  // Update VR headset position and apply to camera.
  controls.update();

  // Render the scene through the VREffect.
  effect.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();	// Kick off animation loop


/*
Listen for click event to enter full-screen mode.
We listen for single click because that works best for mobile for now
*/
document.body.addEventListener('click', function(){
  effect.setFullScreen(true);
})

/*
Listen for keyboard events
*/
function onkey(event) {
  event.preventDefault();

  if (event.keyCode == 90) { // z
    camera.rotation.z = 0; //zero rotation
  } else if (event.keyCode == 70 || event.keyCode == 13) { //f or enter
    effect.setFullScreen(true) //fullscreen
  }
};
window.addEventListener("keydown", onkey, true);

/*
Handle window resizes
*/
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  effect.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);
