import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { ChevronDownIcon } from "@radix-ui/themes";
import LogoutButton from "../LogoutButton";

type Props = {
  name?: string | null;
  image?: string | null;
  bookshelfId?: string | null;
  deviceType: "desktop" | "mobile";
};

export default function DropdownMenu({ name, image, bookshelfId, deviceType }: Props) {
  const link = [
    { text: "アプリの使いかた", href: "/how_to_use" },
    { text: "マイページ", href: "/mypage" },
    { text: "本棚を閲覧する", href: `/bookshelf/${bookshelfId}` },
    { text: "本棚の編集", href: "/bookshelfEdit" },
    { text: "お気に入りリスト", href: "/favorite" },
  ];
  const isPC = deviceType === "desktop";
  return (
    <>
      <RadixDropdownMenu.Root>
        <RadixDropdownMenu.Trigger asChild>
          <button type="button" className={styles.userCntainer}>
            {image ? (
              <Image className={styles.userIcon} src={image} height={isPC ? 30 : 40} width={isPC ? 30 : 40} alt="" />
            ) : (
              <span className={styles.icon}>
                <PersonIcon className={styles.dummyIcon} />
              </span>
            )}
            <span className={styles.userName}>{name}</span>
            <ChevronDownIcon className={styles.chevronDownIcon} />
          </button>
        </RadixDropdownMenu.Trigger>
        <RadixDropdownMenu.Content asChild>
          <div className={styles.dropdownMenuContent}>
            <ul className={styles.dropdownMenuList}>
              {link.map((li, index) => {
                return (
                  <li key={index} className={styles.listItem}>
                    <RadixDropdownMenu.Item asChild>
                      <Link className={styles.link} href={li.href}>
                        {li.text}
                      </Link>
                    </RadixDropdownMenu.Item>
                  </li>
                );
              })}
            </ul>
            <div className={styles.logoutButtonArea}>
              <LogoutButton />
            </div>
          </div>
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Root>
    </>
  );
}
