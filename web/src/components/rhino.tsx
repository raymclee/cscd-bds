import {
  Center,
  Environment,
  GizmoHelper,
  GizmoViewcube,
  Loader,
  OrbitControls,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Group, MathUtils } from "three";
import { Rhino3dmLoader } from "three/examples/jsm/loaders/3DMLoader.js";

export function Rhino() {
  return (
    <>
      <Canvas
        // camera={{ position: [10, 10, 1545] }}
        // linear
        camera={{ position: [0, 15, 30], fov: 70 }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <ambientLight intensity={2} />
        <pointLight position={[40, 40, 40]} />
        <Suspense fallback={null}>
          <RhinoModel />

          <GizmoHelper alignment="bottom-right" margin={[50, 50]}>
            <GizmoViewcube />
          </GizmoHelper>
          <OrbitControls makeDefault />
          {/* <Environment
            background
            near={1}
            far={1000}
            resolution={256}
            preset="sunset"
          /> */}
          <Environment
            files="https://storage.googleapis.com/abernier-portfolio/lebombo_2k.hdr"
            background
          />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}

function RhinoModel() {
  const object = useLoader(
    Rhino3dmLoader,
    "/3dm/2752_2MR_PRK_CAR_241126_V7_Texture.3dm",
    // "/3dm/20240201.3dm",
    (loader) => {
      loader.setLibraryPath(
        "https://cdn.jsdelivr.net/npm/rhino3dm@8.15.0-beta/",
      );
    },
  );
  const viewport = useThree((state) => state.viewport);

  return (
    <Rig>
      <Center
        onCentered={({ container, height }) => {
          return container.scale.setScalar(viewport.height / height);
        }}
      >
        <primitive object={object} />
      </Center>
    </Rig>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const outer = useRef<Group>(null!);
  const inner = useRef<Group>(null!);
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    outer.current.position.y = MathUtils.lerp(
      outer.current.position.y,
      0,
      0.05,
    );
    inner.current.rotation.y = Math.sin(t / 8) * Math.PI;
    inner.current.position.z = 5 + -Math.sin(t / 2) * 10;
    inner.current.position.y = -5 + Math.sin(t / 2) * 2;
  });
  return (
    <group position={[0, -100, 0]} ref={outer}>
      <group ref={inner}>{children}</group>
    </group>
  );
}
