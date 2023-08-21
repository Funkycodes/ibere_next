import cn from "clsx";
import s from "./animated-link.module.scss";

const AnimatedLink = ({ children, className, ...props }) => {
  return (
    <span className={cn(s.link, className)} {...props}>
      <span className={cn(s.inner)}>
        <span>
          {children}
        </span>
        <span className={cn(s.animated)}>
          {children}
        </span>
      </span>
    </span>
  );
};

export default AnimatedLink;
