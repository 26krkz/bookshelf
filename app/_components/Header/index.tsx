import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { getServerSession } from "@/lib/auth";
import prisma from "../../../prisma";
import LoginButton from "../LoginButton";
import DropdownMenu from "../DropdownMenu";
import HamburgerMenu from "../HamburgerMenu";
import getDeviceFlag from "@/_services/getDeviceFlag";

export default async function Header() {
  const session = await getServerSession();
  const profile = await prisma.user.findFirst({
    where: { id: session?.user.id },
  });
  const deviceType = getDeviceFlag();

  return (
    <header className={styles.header}>
      <div className={styles.headerComponent}>
        <Link className={styles.headerLink} href="/">
          <span className={styles.logoText}>ShelfShare</span>
          <span className={styles.logoTextSmall}>- シェアする本棚 -</span>
        </Link>
        {!!session && !!profile ? (
          <DropdownMenu image={profile?.image} name={profile?.name} bookshelfId={profile?.bookshelf_id} deviceType={deviceType} />
        ) : (
          <>
            <div className={styles.pcHeaderSideMenu}>
              <Link href="/how_to_use" className={styles.howToUseLink}>
                アプリの使いかた
              </Link>
              <LoginButton />
            </div>
            <div className={styles.spHeaderSideMenu}>
              <HamburgerMenu />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
