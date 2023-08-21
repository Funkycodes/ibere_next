import { useRef, useState, useEffect } from "react";
import { useLenis } from "@studio-freight/react-lenis";

import { clamp, mapRange } from "@/utils/maths";
import { useWindowSize, useRect } from "@/hooks";
import s from "./scrollbar.module.scss";

export default function Scrollbar({
  theme = {
    color: '#ff0000',
    borderColor: '#fff',
    borderSize: '1px',
    borderRadius: '4px',
    minHeight: '20px',
    positionRight: '4px',
  },
}
) {
  const thumb = useRef();
  const inner = useRef();
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const { height: innerHeight } = useRect(inner);
  const { height: thumbHeight } = useRect(thumb);
  const lenis = useLenis();
  useLenis(({ scroll, limit }) => {
    const progress = scroll / limit;

    thumb.current.style.transform = `translate3d(0,${progress * (innerHeight - thumbHeight)}px,0)`;
  });

  const [ clicked, setClicked ] = useState(false);

  useEffect(() => {
    if (!clicked) return;

    function onPointerMove(e) {
      e.preventDefault();

      const offset = (windowHeight - innerHeight) / 2;
      const y = mapRange(0, windowHeight, e.clientY, -offset, innerHeight + offset);

      const progress = clamp(0, y / innerHeight, 1);
      const newPos = lenis.limit * progress;

      lenis.direction === 'vertical' ? window.scrollTo(0, newPos) : window.scrollTo(newPos, 0);
    }

    function onPointerUp() {
      setClicked(false);
    }

    window.addEventListener('pointermove', onPointerMove, false);
    window.addEventListener('pointerup', onPointerUp, false);

    return () => {
      window.removeEventListener('pointermove', onPointerMove, false);
      window.removeEventListener('pointerup', onPointerUp, false);
    };
  }, [ clicked, windowHeight, windowWidth, innerHeight, lenis ]);

  return (
    <div
      className={s.scrollbar}
      style={{
        '--color': theme.color,
        '--border': theme.border,
        '--min-height': theme.minHeight,
        '--position-right': theme.positionRight,
        '--border-size': theme.borderSize,
        '--border-radius': theme.borderRadius,
      }}
    >
      <div ref={inner} className={s.inner}>
        <div
          className={s.thumb}
          ref={thumb}
          onPointerDown={() => {
            setClicked(true);
          }}
        />
      </div>
    </div>
  );
}
