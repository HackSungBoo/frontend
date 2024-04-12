<template>
    <div class="rendering">
        <h2>3D Sample Ver.</h2>
        <canvas ref="canvasRef" width="800" height="400" display="block" boxSizing="border-box"></canvas>
    </div>
</template>

<script>
import { onMounted, ref } from "vue";
import * as SPLAT from "gsplat";

export default {
    name: "Rendering",
    props: {
        url: String
    },
    setup(props) {
        const canvasRef=ref(null);
        let renderer;
        let controls;

        const scene = new SPLAT.Scene();
        const camera = new SPLAT.Camera();

        const loadModel = async () => {
//            await SPLAT.Loader.LoadAsync(props.url, scene, () => { });
            await SPLAT.PLYLoader.LoadAsync(props.url, scene, () => { });
        };

        const render = () => {
            const frame = () => {   
                controls.update();
                renderer.render(scene, camera);
                requestAnimationFrame(frame);
            };
            requestAnimationFrame(frame);
        };

        onMounted(async () => {
            renderer=new SPLAT.WebGLRenderer(canvasRef.value);
            controls = new SPLAT.OrbitControls(camera, renderer.canvas);

            await loadModel();
            render();
        });

        return { scene, camera, renderer, controls, canvasRef };
    },
};
</script>

<style scoped>
.rendering {
    width: 100%;
    height: 100%;
    
}
</style>
