
/* =========================================
   PSMBR SNOWFALL EFFECT
========================================= */

(function () {

    "use strict";

    let canvas;
    let ctx;

    let snowEnabled = true;
    let snowflakes = [];

    const SNOW_COUNT = window.innerWidth < 700 ? 100 : 200;


    /* CREATE CANVAS */

    function setupCanvas() {

        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d");

        canvas.style.position = "fixed";
        canvas.style.inset = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "9999";

        document.body.appendChild(canvas);

        resizeCanvas();

    }


    /* RESIZE */

    function resizeCanvas() {

        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

        canvas.width = window.innerWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    }


    /* CREATE SNOWFLAKES */

    function createSnowflake() {

        return {

            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,

            radius: Math.random() * 0.9 + 0.3,
            speed: Math.random() * 1.5 + 0.6,
            drift: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.5 + 0.3

        };

    }


    function initialiseSnow() {

        snowflakes = [];

        for (let i = 0; i < SNOW_COUNT; i++) {
            snowflakes.push(createSnowflake());
        }

    }


    /* DRAW SNOW */

    function drawSnow() {

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        if (snowEnabled) {

            snowflakes.forEach(flake => {

                ctx.beginPath();

                ctx.arc(
                    flake.x,
                    flake.y,
                    flake.radius,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle = `rgba(247, 244, 237, ${flake.opacity})`;

                ctx.fill();

                flake.y += flake.speed;
                flake.x += flake.drift;


                if (flake.y > window.innerHeight + 5) {
                    flake.y = -5;
                    flake.x = Math.random() * window.innerWidth;
                }

                if (flake.x > window.innerWidth + 5) {
                    flake.x = -5;
                }

                if (flake.x < -5) {
                    flake.x = window.innerWidth + 5;
                }

            });

        }

        requestAnimationFrame(drawSnow);

    }


    /* PUBLIC CONTROLS */

    window.setSnowEnabled = function (enabled) {

        snowEnabled = Boolean(enabled);

        if (!snowEnabled) {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }

    };


    window.isSnowEnabled = function () {
        return snowEnabled;
    };


    /* START */

    function startSnow() {

        setupCanvas();
        initialiseSnow();

        window.addEventListener("resize", function () {
            resizeCanvas();
            initialiseSnow();
        });

        drawSnow();

    }


    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", startSnow);
    } else {
        startSnow();
    }

})();
