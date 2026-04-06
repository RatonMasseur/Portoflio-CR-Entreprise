import { DotLottie } from '@lottiefiles/dotlottie-web';

const canvases = document.querySelectorAll<HTMLCanvasElement>('canvas[data-lottie-src]');

canvases.forEach((canvas) => {
  const src = canvas.getAttribute('data-lottie-src');
  if (!src) return;

  const dotlottie = new DotLottie({
    canvas,
    src,
    autoplay: false,
    loop: true,
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          dotlottie.play();
          observer.unobserve(canvas);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(canvas);
});
