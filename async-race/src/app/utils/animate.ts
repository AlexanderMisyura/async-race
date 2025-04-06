const FULL_ANIMATION = 1;

export default function animate(animationParameter: {
  duration: number;
  timing: (timeFraction: number) => number;
  draw: (progress: number) => void;
}): void {
  const { timing, draw, duration } = animationParameter;

  const start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > FULL_ANIMATION) timeFraction = FULL_ANIMATION;

    const progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < FULL_ANIMATION) {
      requestAnimationFrame(animate);
    }
  });
}
