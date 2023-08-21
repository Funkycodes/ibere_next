import React from 'react';
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import Scrollbar from "@/components/scrollbar";
import cn from "clsx";
import s from "./layout.module.scss";

const Layout = ({ children }) => {
  const lenis = useLenis(({ scroll, limit }) => {
    console.log(scroll, limit);
  });
  return (
    <ReactLenis root>
      <Scrollbar />
      <div className={cn(s.layout)}>
        <header className={cn(s.header)}>
          <nav className={cn(s.nav)}></nav>
        </header>
        <main className={cn(s.child)}>{children}</main>
      </div>
    </ReactLenis>
  );
};

export default Layout;
