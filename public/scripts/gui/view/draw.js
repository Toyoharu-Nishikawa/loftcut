const elements = {
  draw: document.getElementById("draw")
}

const transpose = A=>A[0].map((k,i)=>A.map((v)=>v[i]))

const getThreePolylineObj = (points,color="white",closed=true) =>{ 
  const ps = points.flatMap(v=>[v[0],v[1],v[2]])
  if(closed){
    ps.push(ps[0])
    ps.push(ps[1])
    ps.push(ps[2])
  }
  const vertices = new Float32Array(ps)
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))             
                 
  //const points3D = new THREE.Geometry();

  //points3D.vertices = ps

  const line2 = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: color}));
  //scene.add(line2);
  return line2 
}

export const draw = (sections2) => {
  const width = 800
  const height = 800
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45,width/height, 0.1, 3000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color("rgb(0,0,0)"));
  renderer.setSize(width, height);

  const controls =  new THREE.OrbitControls( camera, elements.draw );
  const axes = new THREE.AxesHelper(100);
  scene.add(axes);
  

 
  
//filet  

  sections2.forEach(v=>{
    const line = getThreePolylineObj(v,"red",true)   
    scene.add(line)
  })
  
  const sections2T = transpose(sections2) 
  sections2T.forEach(v=>{
    const line = getThreePolylineObj(v,"red",false)   
    scene.add(line)
  }) 
  
  
  camera.position.x = 100;
  camera.position.y = 100;
  camera.position.z = 100; 
  
  const animate =() =>{
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    controls.update();
  }

  elements.draw.appendChild(renderer.domElement);

  
//renderer.render(scene, camera)

  animate();
}
