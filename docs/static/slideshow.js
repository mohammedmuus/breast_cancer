
        const featureList = document.querySelector('.feature-list');
        let currentIndex = 0;
        let isMouseDown = false;
        let startX = 0;
        let scrollLeft = 0;

        function showNextFeature() {
            currentIndex = (currentIndex + 1) % featureList.children.length;
            updateSlide();
        }

        function showPreviousFeature() {
            currentIndex = (currentIndex - 1 + featureList.children.length) % featureList.children.length;
            updateSlide();
        }

        function updateSlide() {
            const translateValue = -currentIndex * (featureList.children[0].offsetWidth + 20);
            featureList.style.transform = `translateX(${translateValue}px)`;
        }

        featureList.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            startX = e.pageX - featureList.offsetLeft;
            scrollLeft = featureList.scrollLeft;
        });

        featureList.addEventListener('mouseleave', () => {
            isMouseDown = false;
        });

        featureList.addEventListener('mouseup', () => {
            isMouseDown = false;
        });

        featureList.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            e.preventDefault();
            const x = e.pageX - featureList.offsetLeft;
            const walk = (x - startX) * 2; // Adjust the multiplier as needed
            featureList.scrollLeft = scrollLeft - walk;
        });

        setInterval(showNextFeature, 10000); // Change slide every 10 seconds

