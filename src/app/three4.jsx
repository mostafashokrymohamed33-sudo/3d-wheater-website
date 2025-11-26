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
  const cloudREF6=useRef(null);
  const cloudREF7=useRef(null);
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

    const pointLight2 = new THREE.PointLight('rgba(121, 161, 147, 0.97)', 700);
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
        mesh.position.set(-17,2,-35);
        mesh.scale.set(4.5,4.5,3.5);
        mesh.traverse((child)=>{
            if(child.isMesh){
                child.material.metalness=.7;
                child.material.roughness=0;
                child.material.color=new THREE.Color(.5,.5,.5)
            }
        })
        scene.add(mesh);
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
                child.material.color=new THREE.Color(1,1,1)
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

    const pointLight3 =new THREE.PointLight("rgba(68, 255, 236, 1)",100)
    pointLight3.position.set(5,-10,-20)
    scene.add(pointLight3);
    gltfLoader.load('./light/scene.gltf',(gltf)=>{
        const mesh =gltf.scene;
        mesh.position.set(5,-10,-20);
        mesh.scale.set(3,3,3)
        // mesh.traverse((child)=>{
        //     if(child.isMesh){
        //         child.material.metalness=.7;
        //         child.material.roughness=0;
        //         child.material.color=new THREE.Color(3,3,3)
        //     }
        // })
        scene.add(mesh);
        cloudREF6.current=mesh;
    })

    const pointLight4 =new THREE.PointLight("rgba(200, 176, 233, 1)",100)
    pointLight4.position.set(-20,-10,-20)
    scene.add(pointLight4);
    console.log(pointLight4);
    gltfLoader.load('./light/scene.gltf',(gltf)=>{
        const mesh =gltf.scene;
        mesh.position.set(-20,-10,-20);
        mesh.scale.set(2,2,2)
        // mesh.traverse((child)=>{
        //     if(child.isMesh){
        //         child.material.metalness=.7;
        //         child.material.roughness=0;
        //         child.material.color=new THREE.Color(3,3,3)
        //         child.material.transparent=true;
        //     }
        // })
        scene.add(mesh);
        cloudREF7.current=mesh;
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

    // if(cloudREF6.current){
    //     cloudREF6.current.material.transparent=true;
    //     cloudREF6.current.material.opacity=Math.abs(Math.sin(elapsed));
    // }

    if(cloudREF6.current){
        cloudREF6.current.position.x+=Math.sin(elapsed)/50;
        cloudREF6.current.traverse((child)=>{
            if(child.isMesh){
            child.material.transparent = true;
            child.material.opacity = (Math.cos(elapsed));
            }
        });
        pointLight3.intensity=(Math.cos(elapsed)>0?Math.cos(elapsed)*100:0)
    }
    if(cloudREF7.current){
        cloudREF7.current.position.x+=Math.sin(elapsed)/90;
        cloudREF7.current.traverse((child)=>{
            if(child.isMesh){
            child.material.transparent = true;
            child.material.opacity = (Math.cos(elapsed))-.5;
            }
        });
        
        pointLight4.intensity=(Math.cos(elapsed)>0?Math.cos(elapsed)*100:0)
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