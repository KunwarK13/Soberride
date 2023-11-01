import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import VertexShader from "./VertexShader";
import fragmentShader from "./FragmentShader";
import { useFrame } from "@react-three/fiber/native";
import { MathUtils } from "three";

const Blob = ({ sober, toRender }) => {
    const mesh = useRef();
    const hover = useRef(false);
    const uniforms = useMemo(() => {
        return {
            u_time: { value: 0 },
            u_intensity: { value: 0.5 },
            u_color_const: { value: sober ? 2.0 : 1.42 },
        };
    }, []);

    useFrame((state) => {
        const { clock } = state;
        if (mesh.current) {
            mesh.current.material.uniforms.u_time.value =
                0.4 * clock.getElapsedTime();

            mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
                mesh.current.material.uniforms.u_intensity.value,
                sober ? 0.2 : 0.69,
                0.02
            );

            mesh.current.material.uniforms.u_color_const.value = sober
                ? 2.0
                : 1.42;
        }
    });

    if (toRender) {
        return (
            <mesh
                ref={mesh}
                scale={1.5}
                position={[0, 0, 0]}
                onPointerOver={() => (hover.current = true)}
                onPointerOut={() => (hover.current = false)}
            >
                <icosahedronGeometry args={[2, 20]} />
                <shaderMaterial
                    vertexShader={VertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                />
            </mesh>
        );
    } else {
        return null;
    }
};

export default Blob;
