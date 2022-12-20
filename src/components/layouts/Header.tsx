import { FC } from "react";
import Link from "next/link";
import styles from "./header.module.scss";
import { useRouter } from "next/router";

export const Header: FC = () => {
  const router = useRouter();
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div className={styles.logo}>LOGO</div>
        <div className={styles.items}>
          <nav>
            <Link
              href="/register"
              className={`${styles.link} ${
                router.pathname === "/register" && styles.active
              }`}
            >
              회원가입
            </Link>
            <Link
              href="/login"
              className={`${styles.link} ${
                router.pathname === "/login" && styles.active
              }`}
            >
              로그인
            </Link>
            <Link
              href="/me"
              className={`${styles.link} ${
                (router.pathname === "/me" && styles.active) ||
                (router.pathname === "/me/ChangePassword" && styles.active)
              }`}
            >
              프로필
            </Link>
            <Link
              href="/authentication/logout"
              className={`${styles.link} ${
                router.pathname === "/logout" && styles.active
              }`}
            >
              로그아웃
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};
