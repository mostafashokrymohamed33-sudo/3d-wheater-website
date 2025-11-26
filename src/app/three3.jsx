'use client'

import * as THREE from "three";
import { useEffect, useRef } from "react";
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function ThreeScene(prop) {
  const canvasRef = useRef(null);
  const cloudREF1=useRef(null);
  const cloudREF2=useRef(null);

  useEffect(() => {

    const scene = new THREE.Scene();
    
    const loaderrr = new THREE.TextureLoader();
        loaderrr.load('./ian-schneider-dqMxDqdhg_4-unsplash.jpg', (texture) => {
        
        // Convert it to an environment map
        texture.mapping = THREE.EquirectangularReflectionMapping;

        // Assign to scene environment
        scene.environment = texture;
        
        // Optional: keep background invisible
        scene.background = null; 
    });

    const camera = new THREE.PerspectiveCamera(
      35,window.innerWidth / window.innerHeight,
      1,1000
    );
    // x: 3.8761675607753956, y: -0.08055187989147222, z: 5.828279028618873
    camera.position.set(3.87, 0, 7); 
    camera.lookAt(0,0,0)
    const pointLight2 = new THREE.PointLight('rgba(0, 255, 238, 1)',10);
    pointLight2.position.set(-10, 10, -50);
    scene.add(pointLight2);
    const pointLight3 = new THREE.PointLight('rgba(87, 93, 255, 1)', 10);
    pointLight3.position.set(-25, 20, -50);
    scene.add(pointLight3);





    const loader=new STLLoader ();
    loader.load('/snow.stl',(geometry)=>{
        const material =new THREE.MeshPhysicalMaterial({
            color:"rgba(255, 255, 255, 0)",
            transmission:0.1,
            roughness:0,
            ior:3.7,
            thickness:5,
            opacity: 26.6,   
            metalness:.5,
        });
        const mesh =new THREE.Mesh(geometry,material);
        mesh.position.set(0,0,-50);
        mesh.rotation.x=1
        scene.add(mesh)
        cloudREF1.current=mesh
    })











    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("rgba(0, 0, 0, 1)", 0);
    const controls = new OrbitControls(camera, renderer.domElement);





    const clock = new THREE.Clock();

    function animate() {
        let alpased =clock.elapsedTime
      requestAnimationFrame(animate);
      if(cloudREF1.current){
        cloudREF1.current.rotation.y +=.01;
        cloudREF1.current.rotation.z =window.scrollY*0.001 ;
      }
      camera.aspect=window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.render(scene, camera)

        controls.update();
    }

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="th"
      style={{ 
        backgroundImage:"linear-gradient(rgba(210, 189, 237, 1),rgba(105, 149, 147, 1))",
      }}
    ></canvas>
  );
}