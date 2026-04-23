import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, ContactShadows, Environment } from "@react-three/drei";
import RobotModel from "../three/RobotModel";
export default function CanvasScene() {
  return (
    <Canvas 
      // Camera position [x, y, z] - 'y' kmi kelyane robot khali yeil
      camera={{ position: [0, 0, 5], fov: 45 }} 
      gl={{ antialias: true, alpha: true }}
      className="z-0"
    >
      <ambientLight intensity={1.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

      <Suspense fallback={null}>
        {/* Center component robot la screen chya madho-madh alignment deto */}
        <Center>
          {/* Scale 1 kela aahe jya mule to medium size cha disel */}
          <RobotModel scale={1} position={[0, 0, 0]} />
        </Center>
        
        <ContactShadows 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={4} 
          resolution={256} 
          color="#000000" 
          position={[0, -1.2, 0]} // Shadow thodi khali
        />
        <Environment preset="city" /> 
      </Suspense>

      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        // Robot la farch varti-khali firvne block karnyasaathi limits
        minPolarAngle={Math.PI / 2.5} 
        maxPolarAngle={Math.PI / 1.8} 
      />
    </Canvas>
  );
}