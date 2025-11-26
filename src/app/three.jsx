'use client'

import * as THREE from "three";
import { useEffect, useRef } from "react";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
export default function ThreeScene(prop) {
  const canvasRef = useRef(null);
  const cloudREF1=useRef(null);
  const cloudREF2=useRef(null);
  const cloudREF3=useRef(null);
  useEffect(() => {

    const scene = new THREE.Scene();
    const gltfLoader =new GLTFLoader();

    const camera = new THREE.PerspectiveCamera(
      35,window.innerWidth / window.innerHeight,
      1,1000
    );
    camera.position.set(0, 0, 7); 
    camera.lookAt(-2,-1.5,0)

    const pointLight = new THREE.PointLight('rgba(126, 165, 163, 1)', 100);
    pointLight.position.set(0, 3, 4);
    scene.add(pointLight)
    const pointLight2 = new THREE.PointLight('rgba(0, 178, 205, 1)', 10);
    pointLight2.position.set(0, -3, 0);
    scene.add(pointLight2);

    const sunLight = new THREE.PointLight( prop.night?"rgba(29, 23, 107, 1)":"rgba(253, 122, 0, 1)", 100);
    sunLight.position.set(0, 5, 0);
    scene.add(sunLight);
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(.5, 9, 9),
      new THREE.MeshPhongMaterial({
            color: "rgba(255, 239, 184, 1)",
            emissive: prop.night?"rgba(50, 0, 149, 1)":"rgba(253, 67, 0, 1)",
            emissiveIntensity: .7,
            shininess:1000
      })
    );
    scene.add(sun);

    if(prop.cloud){
        gltfLoader.load('./low_poly_cloud/scene.gltf',(gltf)=>{
            const mesh =gltf.scene;
            mesh.position.set(-.7,-0.2,.3);
            mesh.scale.set(.2,.2,.2)
            mesh.traverse((child)=>{
                if(child.isMesh){
                    child.material.metalness=.7;
                    child.material.roughness=0;
                    child.material.color=new THREE.Color(3,3,3)
                }
            })
            scene.add(mesh);
            cloudREF1.current=mesh;
        })

        gltfLoader.load('./low_poly_cloud/scene.gltf',(gltf)=>{
            const mesh =gltf.scene;
            mesh.position.set(.2,0.2,0.5);
            mesh.scale.set(.1,.1,.1)
            mesh.traverse((child)=>{
                if(child.isMesh){
                    child.material.metalness=.6;
                    child.material.roughness=.1;
                    child.material.color=new THREE.Color(2,2,2)
                }
            })
            scene.add(mesh);
            cloudREF2.current=mesh;

        })
    }

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      sun.rotation.y += 0.01;
      sun.position.x +=Math.sin(sun.rotation.y)/1000;
      if(cloudREF1.current){
        cloudREF1.current.position.x +=Math.cos(sun.rotation.y)/500;
      }
      if(cloudREF2.current){
        cloudREF2.current.position.x +=Math.sin(sun.rotation.y)/900;
      }
      camera.aspect=window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.render(scene, camera)
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      renderer.dispose();
    };
  }, [prop.night]);

  return (
    <canvas
      ref={canvasRef}
      className="th"
      style={{ 
        backgroundImage: prop.night?"linear-gradient(rgb(36, 34, 80),rgb(98, 39, 88))":"linear-gradient(rgb(4, 229, 214),rgb(1, 112, 145))",
      }}
    ></canvas>
  );
}
