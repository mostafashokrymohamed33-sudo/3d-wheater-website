'use client'

import * as THREE from "three";
import { useEffect, useRef } from "react";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
export default function ThreeScene(prop) {
  const canvasRef = useRef(null);
  const cloudREF1=useRef(null);
  const cloudREF2=useRef(null);
  const cloudREF3=useRef(null);
  const cloudREF4=useRef(null);
  const cloudREF5=useRef(null);
  useEffect(() => {

    const scene = new THREE.Scene();
    const gltfLoader =new GLTFLoader();

    const camera = new THREE.PerspectiveCamera(
      35,window.innerWidth / window.innerHeight,
      1,1000
    );
    camera.position.set(0, 0, 7); 
    camera.lookAt(-3,-1.5,0)

    const pointLight = new THREE.PointLight('rgba(186, 186, 186, 1)', 700);
    pointLight.position.set(-10, -40, -10);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight('rgba(175, 170, 170, 0.97)', 700);
    pointLight2.position.set(-20,10, 15);
    scene.add(pointLight2);

    gltfLoader.load('./low_poly_cloud/scene.gltf',(gltf)=>{
        const mesh =gltf.scene;
        mesh.position.set(-7,-0.2,-30);
        mesh.scale.set(3.5,3.5,3.5);
        mesh.traverse((child)=>{
            if(child.isMesh){
                child.material.metalness=.7;
                child.material.roughness=0;
                child.material.color=new THREE.Color(5,5,5)
            }
        })
        scene.add(mesh);
        cloudREF1.current=mesh;
    })

    gltfLoader.load('./low_poly_cloud/scene.gltf',(gltf)=>{
        const mesh =gltf.scene;
        mesh.position.set(-17,.5,-40);
        mesh.scale.set(3.5,3.5,3.5)
        mesh.traverse((child)=>{
            if(child.isMesh){
                child.material.metalness=.7;
                child.material.roughness=0;
                child.material.color=new THREE.Color(5,5,5)
            }
        })
        scene.add(mesh);
        cloudREF2.current=mesh;
    })

    gltfLoader.load('./low_poly_cloud/scene.gltf',(gltf)=>{
        const mesh =gltf.scene;
        mesh.position.set(-29,.2,-20);
        mesh.scale.set(3.5,3.5,3.5)
        mesh.traverse((child)=>{
            if(child.isMesh){
                child.material.metalness=.7;
                child.material.roughness=0;
                child.material.color=new THREE.Color(3,3,3)
            }
        })
        scene.add(mesh);
        cloudREF3.current=mesh;
    })

    gltfLoader.load('./low_poly_cloud/scene.gltf',(gltf)=>{
        const mesh =gltf.scene;
        mesh.position.set(0,0,0);
        mesh.scale.set(.5,.5,.5)
        mesh.traverse((child)=>{
            if(child.isMesh){
                child.material.metalness=.7;
                child.material.roughness=0;
                child.material.color=new THREE.Color(3,3,3)
            }
        })
        scene.add(mesh);
        cloudREF4.current=mesh;
    })

    gltfLoader.load('./low_poly_cloud/scene.gltf',(gltf)=>{
        const mesh =gltf.scene;
        mesh.position.set(-5,0,0);
        mesh.scale.set(.5,.5,.5)
        mesh.traverse((child)=>{
            if(child.isMesh){
                child.material.metalness=.7;
                child.material.roughness=0;
                child.material.color=new THREE.Color(3,3,3)
            }
        })
        scene.add(mesh);
        cloudREF5.current=mesh;
    })


    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const clock = new THREE.Clock();

    function animate() {
        let elapsed =clock.getElapsedTime() 
      requestAnimationFrame(animate);
      camera.aspect=window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.render(scene, camera)
      if(cloudREF1.current){
        cloudREF1.current.position.x+=Math.sin(elapsed)/100
      }
      if(cloudREF2.current){
        cloudREF2.current.position.x+=Math.sin(elapsed)/100
      }
      if(cloudREF3.current){
        cloudREF3.current.position.x+=Math.sin(elapsed)/100
      }
      if(cloudREF4.current){
        cloudREF4.current.position.x+=Math.sin(elapsed)/100
      }
      if(cloudREF5.current){
        cloudREF5.current.position.x+=Math.sin(elapsed)/100
      }
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
        backgroundImage: "linear-gradient(rgba(127, 152, 151, 1),rgba(40, 35, 35, 1))",
      }}
    ></canvas>
  );
}