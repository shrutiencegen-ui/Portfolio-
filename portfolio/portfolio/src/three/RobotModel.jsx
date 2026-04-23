import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export default function RobotModel({ scale = 1, ...props }) {
  const group = useRef();

  const { scene, animations } = useGLTF("/robot.glb");
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions || names.length === 0) return;

    const action = actions[names[0]];

    if (action) {
      action
        .reset()
        .fadeIn(0.5)
        .setLoop(THREE.LoopRepeat, Infinity) // 🔁 continuous loop
        .play();
    }

    return () => {
      action?.fadeOut(0.3);
    };
  }, [actions, names]);

  return (
    <group ref={group} {...props}>
      <primitive 
        object={scene}
        scale={scale} // ✅ scale control parent kade
        position={[0, -1.2, 0]} 
      />
    </group>
  );
}

useGLTF.preload("/robot.glb");