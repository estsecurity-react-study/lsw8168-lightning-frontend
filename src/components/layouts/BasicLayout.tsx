import { FC, PropsWithChildren } from "react";
import styles from "./index.module.scss";

export const BasicLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.layout}>
    <main className={styles.main}>{children}</main>
  </div>
);
