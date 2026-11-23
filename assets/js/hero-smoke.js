/*
 * Hero background: fluid smoke effect.
 * Original WebGL implementation — domain-warped fractal noise (a published,
 * generic technique for smoke/ink-like fields), tuned to the site's black
 * and orange brand palette. No external library or dependency.
 */
(function () {
  "use strict";

  var canvas = document.getElementById("hero-smoke-bg");
  if (!canvas) return;

  var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  if (!gl) return;

  var VERT_SRC = [
    "attribute vec2 aPosition;",
    "void main() {",
    "  gl_Position = vec4(aPosition, 0.0, 1.0);",
    "}",
  ].join("\n");

  var FRAG_SRC = [
    "#ifdef GL_FRAGMENT_PRECISION_HIGH",
    "precision highp float;",
    "#else",
    "precision mediump float;",
    "#endif",
    "",
    "uniform vec2 uResolution;",
    "uniform float uTime;",
    "uniform vec2 uMouse;",
    "uniform float uMouseStrength;",
    "uniform float uSpeed;",
    "uniform float uScale;",
    "uniform float uWarp;",
    "uniform float uRise;",
    "uniform float uSwirl;",
    "uniform float uContrast;",
    "uniform float uSoftness;",
    "uniform vec3 uBg;",
    "uniform vec3 uColor1;",
    "uniform vec3 uColor2;",
    "",
    "float hash(vec2 p) {",
    "  p = fract(p * vec2(123.34, 456.21));",
    "  p += dot(p, p + 45.32);",
    "  return fract(p.x * p.y);",
    "}",
    "",
    "float noise(vec2 p) {",
    "  vec2 i = floor(p);",
    "  vec2 f = fract(p);",
    "  vec2 u = f * f * (3.0 - 2.0 * f);",
    "  float a = hash(i);",
    "  float b = hash(i + vec2(1.0, 0.0));",
    "  float c = hash(i + vec2(0.0, 1.0));",
    "  float d = hash(i + vec2(1.0, 1.0));",
    "  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);",
    "}",
    "",
    "float fbm(vec2 p) {",
    "  float v = 0.0;",
    "  float amp = 0.5;",
    "  for (int i = 0; i < 5; i++) {",
    "    v += amp * noise(p);",
    "    p *= 2.02;",
    "    amp *= 0.5;",
    "  }",
    "  return v;",
    "}",
    "",
    "float pattern(vec2 p, float t) {",
    "  vec2 q = vec2(fbm(p), fbm(p + vec2(5.2, 1.3)));",
    "  vec2 r = vec2(",
    "    fbm(p + 4.0 * q + vec2(1.7, 9.2) + 0.15 * t),",
    "    fbm(p + 4.0 * q + vec2(8.3, 2.8) + 0.126 * t)",
    "  );",
    "  return fbm(p + 4.0 * r);",
    "}",
    "",
    "void main() {",
    "  vec2 uv = gl_FragCoord.xy / uResolution.xy;",
    "  float aspect = uResolution.x / uResolution.y;",
    "  vec2 p = vec2(uv.x * aspect, uv.y) * uScale;",
    "",
    "  p.y -= uTime * uSpeed * uRise;",
    "",
    "  vec2 mp = vec2(uMouse.x * aspect, uMouse.y) * uScale;",
    "  vec2 toMouse = p - mp;",
    "  float d2 = dot(toMouse, toMouse);",
    "  float swirlAmt = uMouseStrength * exp(-d2 * 1.5);",
    "  float ma = swirlAmt * 3.0;",
    "  float ms = sin(ma), mc = cos(ma);",
    "  p = mp + mat2(mc, -ms, ms, mc) * toMouse;",
    "",
    "  float aAngle = uSwirl * sin(uTime * 0.05) * 0.6;",
    "  float as_ = sin(aAngle), ac = cos(aAngle);",
    "  p = mat2(ac, -as_, as_, ac) * p;",
    "",
    "  float n = pattern(p * (0.6 + uWarp), uTime * uSpeed);",
    "  n = pow(clamp(n, 0.0, 1.0), uContrast);",
    "",
    "  float density = smoothstep(1.0 - uSoftness, 1.0, n);",
    "  vec3 col = mix(uBg, uColor1, density);",
    "  float wisp = smoothstep(0.35, 0.9, n);",
    "  col = mix(col, uColor2, wisp * 0.35);",
    "",
    "  gl_FragColor = vec4(col, 1.0);",
    "}",
  ].join("\n");

  function compileShader(type, src) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  var vertShader = compileShader(gl.VERTEX_SHADER, VERT_SRC);
  var fragShader = compileShader(gl.FRAGMENT_SHADER, FRAG_SRC);
  if (!vertShader || !fragShader) return;

  var program = gl.createProgram();
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);

  var posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW
  );
  var posLoc = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  var uniforms = {};
  [
    "uResolution",
    "uTime",
    "uMouse",
    "uMouseStrength",
    "uSpeed",
    "uScale",
    "uWarp",
    "uRise",
    "uSwirl",
    "uContrast",
    "uSoftness",
    "uBg",
    "uColor1",
    "uColor2",
  ].forEach(function (name) {
    uniforms[name] = gl.getUniformLocation(program, name);
  });

  // Brand palettes: dark theme = near-black backdrop with ember-orange smoke;
  // light theme = white backdrop with a warmer, deeper rust/amber smoke so it
  // still reads clearly against white.
  var PALETTES = {
    dark: {
      bg: [0.02, 0.01, 0.008],
      color1: [0.72, 0.24, 0.03],
      color2: [1.0, 0.55, 0.16],
    },
    light: {
      bg: [1.0, 1.0, 1.0],
      color1: [0.82, 0.36, 0.08],
      color2: [0.96, 0.62, 0.28],
    },
  };

  var config = {
    speed: 0.12,
    scale: 1.5,
    warp: 1.0,
    rise: 0.12,
    swirl: 0.5,
    contrast: 1.5,
    softness: 0.55,
    mouseStrength: 0.7,
    bg: PALETTES.dark.bg.slice(),
    color1: PALETTES.dark.color1.slice(),
    color2: PALETTES.dark.color2.slice(),
  };

  var targetPalette = document.body.classList.contains("theme-dark")
    ? PALETTES.dark
    : PALETTES.light;

  function lerpColor(current, target, amt) {
    for (var i = 0; i < 3; i++) {
      current[i] += (target[i] - current[i]) * amt;
    }
  }

  if ("MutationObserver" in window) {
    var themeObserver = new MutationObserver(function () {
      targetPalette = document.body.classList.contains("theme-dark")
        ? PALETTES.dark
        : PALETTES.light;
    });
    themeObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  var heroEl = canvas.parentElement;
  var mouse = { x: 0.5, y: 0.6, tx: 0.5, ty: 0.6 };
  var running = true;
  var startTime = performance.now();

  function resize() {
    var rect = heroEl.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.max(1, Math.floor(rect.width * dpr));
    var h = Math.max(1, Math.floor(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  }

  window.addEventListener("resize", resize);
  resize();

  heroEl.addEventListener("pointermove", function (e) {
    var rect = heroEl.getBoundingClientRect();
    mouse.tx = (e.clientX - rect.left) / rect.width;
    mouse.ty = 1.0 - (e.clientY - rect.top) / rect.height;
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        running = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);
  }

  function frame(now) {
    requestAnimationFrame(frame);
    if (!running) return;

    var t = (now - startTime) / 1000;
    mouse.x += (mouse.tx - mouse.x) * 0.04;
    mouse.y += (mouse.ty - mouse.y) * 0.04;

    lerpColor(config.bg, targetPalette.bg, 0.05);
    lerpColor(config.color1, targetPalette.color1, 0.05);
    lerpColor(config.color2, targetPalette.color2, 0.05);

    gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
    gl.uniform1f(uniforms.uTime, t);
    gl.uniform2f(uniforms.uMouse, mouse.x, mouse.y);
    gl.uniform1f(uniforms.uMouseStrength, config.mouseStrength);
    gl.uniform1f(uniforms.uSpeed, config.speed);
    gl.uniform1f(uniforms.uScale, config.scale);
    gl.uniform1f(uniforms.uWarp, config.warp);
    gl.uniform1f(uniforms.uRise, config.rise);
    gl.uniform1f(uniforms.uSwirl, config.swirl);
    gl.uniform1f(uniforms.uContrast, config.contrast);
    gl.uniform1f(uniforms.uSoftness, config.softness);
    gl.uniform3fv(uniforms.uBg, config.bg);
    gl.uniform3fv(uniforms.uColor1, config.color1);
    gl.uniform3fv(uniforms.uColor2, config.color2);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  requestAnimationFrame(frame);
})();
