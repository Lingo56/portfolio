window.onload = function () {
  const params = {
    plane01: {
      constant: 1,
      negated: false,
      displayHelper: true,
    },

    stencilMesh: {
      z: 0,
    },
  };

  const canvas = document.getElementById("threejs-canvas");
  if (!canvas) {
    console.error("Canvas not found");
    return;
  }

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const clock = new THREE.Clock();

  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 2;

  // CONTROLS
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.rotateSpeed = 0.5;
  controls.zoomSpeed = 1.2;
  controls.enablePan = false;
  let isInteracting = false; // Detect if canvas is being dragged

  // Event listener to detect when interaction starts
  controls.addEventListener("start", () => {
    isInteracting = true;
  });

  // Event listener to detect when interaction ends
  controls.addEventListener("end", () => {
    isInteracting = false;
  });

  function initCube() {
    const textureLoader = new THREE.TextureLoader();

    const addCubeFace = (
      objectGeom,
      objectColor,
      stencilRef,
      planePos,
      planeRot,
      isTextured = false,
      texturePath = ""
    ) => {
      // CUBE FACE
      const planeGeom = new THREE.PlaneGeometry();
      const stencilMat = new THREE.MeshBasicMaterial({ color: "white" });
      stencilMat.depthWrite = false;
      stencilMat.stencilWrite = true;
      stencilMat.stencilRef = stencilRef;
      stencilMat.stencilFunc = THREE.AlwaysStencilFunc;
      stencilMat.stencilZPass = THREE.ReplaceStencilOp;
      const stencilMesh = new THREE.Mesh(planeGeom, stencilMat);
      stencilMesh.position.copy(planePos);
      stencilMesh.rotation.x = planeRot.x;
      stencilMesh.rotation.y = planeRot.y;
      stencilMesh.rotation.z = planeRot.z;
      scene.add(stencilMesh);

      // OBJECT INSIDE CUBE
      if (isTextured) {
        // Load and apply texture
        textureLoader.load(texturePath, function (texture) {
          texture.flipY = false;
          const texturedPlaneGeom = new THREE.PlaneGeometry(0.5, 0.5);

          const texturedPlaneMat = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
          });

          // Apply stencil settings
          texturedPlaneMat.stencilWrite = true;
          texturedPlaneMat.stencilRef = stencilRef;
          texturedPlaneMat.stencilFunc = THREE.EqualStencilFunc;

          const texturedPlane = new THREE.Mesh(
            texturedPlaneGeom,
            texturedPlaneMat
          );

          texturedPlane.position
            .copy(planePos)
            .add(new THREE.Vector3(0, 0.4, 0));

          texturedPlane.rotation.set(planeRot.x, planeRot.y, planeRot.z);
          scene.add(texturedPlane);
        });
      } else {
        // Standard 3D object inside the cube
        const objectMat = new THREE.MeshBasicMaterial({ color: objectColor });
        objectMat.stencilWrite = true;
        objectMat.stencilRef = stencilRef;
        objectMat.stencilFunc = THREE.EqualStencilFunc;

        const object = new THREE.Mesh(objectGeom, objectMat);
        scene.add(object);
      }
    };

    addCubeFace(
      new THREE.ConeGeometry(0.25, 0.5, 4),
      "red",
      1,
      new THREE.Vector3(0, 0, 0.5),
      new THREE.Vector3(0, 0, 0)
    );
    addCubeFace(
      new THREE.CylinderGeometry(0.15, 0.15, 0.5),
      "yellow",
      2,
      new THREE.Vector3(0, 0.5, 0),
      new THREE.Vector3(-Math.PI / 2, 0, 0)
    );
    addCubeFace(
      new THREE.OctahedronGeometry(0.25),
      "magenta",
      4,
      new THREE.Vector3(0, 0, -0.5),
      new THREE.Vector3(Math.PI, 0, 0)
    );
    addCubeFace(
      null,
      null,
      3,
      new THREE.Vector3(0, -0.5, 0),
      new THREE.Vector3(Math.PI / 2, 0, 0),
      true,
      "./images/cat.png"
    );
    addCubeFace(
      new THREE.TorusGeometry(0.25, 0.1),
      "blue",
      5,
      new THREE.Vector3(-0.5, 0, 0),
      new THREE.Vector3(0, -Math.PI / 2, 0)
    );
    addCubeFace(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      "green",
      6,
      new THREE.Vector3(0.5, 0, 0),
      new THREE.Vector3(0, Math.PI / 2, 0)
    );
  }

  function applyInertia() {
    if (!isInteracting && Math.abs(rotationSpeedY) > 0.001) {
      // Continue rotating with the last speed
      scene.rotation.y += rotationSpeedY;
      rotationSpeedY *= dampingFactor; // Apply damping
    }
  }

  function animate() {
    const delta = clock.getDelta();

    requestAnimationFrame(animate);

    // Rotate the scene only if the user isn't interacting with the canvas
    if (!isInteracting) {
      scene.rotation.y += 0.01;
    }

    controls.update();
    renderer.render(scene, camera);
  }

  // initPlanes();
  initCube();
  animate();
};
