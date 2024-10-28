// /static/js/index.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js animation
    const initThreeJS = () => {
        const canvas = document.getElementById('experience-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true
        });

        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Add lights
        const ambientLight = new THREE.AmbientLight(0x4F46E5, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x4F46E5, 2);
        pointLight.position.set(2, 3, 4);
        scene.add(pointLight);

        // Create geometric shapes
        const geometry = new THREE.IcosahedronGeometry(2, 0);
        const material = new THREE.MeshPhongMaterial({
            color: 0x4F46E5,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });

        const icosahedron = new THREE.Mesh(geometry, material);
        scene.add(icosahedron);

        // Add rings
        const rings = [];
        for (let i = 0; i < 3; i++) {
            const ringGeometry = new THREE.TorusGeometry(3 + i * 0.8, 0.05, 16, 100);
            const ringMaterial = new THREE.MeshPhongMaterial({
                color: 0x4F46E5,
                transparent: true,
                opacity: 0.3
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.random() * Math.PI;
            ring.rotation.y = Math.random() * Math.PI;
            scene.add(ring);
            rings.push(ring);
        }

        camera.position.z = 8;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            icosahedron.rotation.x += 0.005;
            icosahedron.rotation.y += 0.005;

            rings.forEach((ring, i) => {
                ring.rotation.x += 0.002 * (i + 1);
                ring.rotation.y += 0.002 * (i + 1);
            });

            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height, false);
        });
    };

    // Initialize intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Initialize Three.js scene
    initThreeJS();
});