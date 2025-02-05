window.onload = function () {
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

  // Create the camera with initial aspect ratio
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 2); // Camera position
  camera.lookAt(new THREE.Vector3(0, 0, 0)); // Look at the center

  function resizeCanvas() {
    const parent = canvas.parentElement;
    const width = parent.clientWidth; // Get width of the parent
    let height = canvas.clientHeight; // Get height of the parent

    // If the parent height isn't updating properly, fall back to window's height
    if (height === 0) {
      height = window.innerHeight; // Use the window's inner height as a fallback
    }

    // Set the canvas size
    canvas.width = width;
    canvas.height = height;

    // Update camera aspect ratio and projection matrix
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // Resize the renderer to match the canvas size
    renderer.setSize(width, height);
  }

  // Handle window resize events
  window.addEventListener("resize", resizeCanvas, false);

  // Ensure the canvas size is set properly on load
  resizeCanvas();

  // CONTROLS
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.rotateSpeed = 0.5;
  controls.enableZoom = false;
  controls.enablePan = false;

  let isInteracting = false; // Detect if canvas is being dragged
  controls.addEventListener("start", () => {
    isInteracting = true;
  });
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
      const planeGeom = new THREE.PlaneGeometry();
      const stencilMat = new THREE.MeshBasicMaterial({ color: "white" });
      stencilMat.depthWrite = false;
      stencilMat.stencilWrite = true;
      stencilMat.stencilRef = stencilRef;
      stencilMat.stencilFunc = THREE.AlwaysStencilFunc;
      stencilMat.stencilZPass = THREE.ReplaceStencilOp;
      const stencilMesh = new THREE.Mesh(planeGeom, stencilMat);
      stencilMesh.position.copy(planePos);
      stencilMesh.rotation.set(planeRot.x, planeRot.y, planeRot.z);
      scene.add(stencilMesh);

      if (isTextured) {
        textureLoader.load(texturePath, function (texture) {
          texture.flipY = false;
          const texturedPlaneGeom = new THREE.PlaneGeometry(0.5, 0.5);

          const texturedPlaneMat = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
          });

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
        const objectMat = new THREE.MeshBasicMaterial({ color: objectColor });
        objectMat.stencilWrite = true;
        objectMat.stencilRef = stencilRef;
        objectMat.stencilFunc = THREE.EqualStencilFunc;

        const object = new THREE.Mesh(objectGeom, objectMat);
        scene.add(object);
      }
    };

    // Add faces to the cube, all centered at (0, 0, 0)
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

  function animate() {
    requestAnimationFrame(animate);

    // Only rotate the scene if user is not interacting
    if (!isInteracting) {
      scene.rotation.y += 0.01;
    }

    controls.update();
    renderer.render(scene, camera);
  }

  // Initialize the cube and start the animation loop
  initCube();
  animate();
};
