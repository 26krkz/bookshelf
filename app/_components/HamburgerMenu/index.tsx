import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import LoginButton from "../LoginButton";
import styles from "./styles.module.css";

export default function HamburgerMenu() {
  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger asChild>
        <button type="button" className={styles.hamburgerMenuButton}>
          <HamburgerMenuIcon width={25} height={25} />
        </button>
      </RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Content asChild>
        <div className={styles.hamburgerMenuContent}>
          <ul className={styles.hamburgerMenuList}>
            <li className={styles.listItem}>
              <RadixDropdownMenu.Item asChild>
                <Link className={styles.link} href="/how_to_use">
                  アプリの使いかた
                </Link>
              </RadixDropdownMenu.Item>
            </li>
            <li className={styles.loginButtonArea}>
              <RadixDropdownMenu.Item asChild>
                <LoginButton />
              </RadixDropdownMenu.Item>
            </li>
          </ul>
        </div>
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Root>
  );
}
