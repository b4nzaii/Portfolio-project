import * as React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import * as s from "./Layout.module.scss";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className={s.shell}>
      <Header />
      <main className={s.main}>{children}</main>
      <Footer />
    </div>
  );
}
