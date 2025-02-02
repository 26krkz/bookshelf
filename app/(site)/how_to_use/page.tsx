import Image from "next/image";
import styles from "./styles.module.css";
import getDeviceFlag from "@/_services/getDeviceFlag";

export default function Page() {
  const deviceFlag = getDeviceFlag();
  const isPC = deviceFlag === "desktop";
  return (
    <>
      <div className={styles.descriptionArea}>
        <p className={styles.descriptionTitle}>ShelfShare - シェアする本棚 - とは</p>
        <p>
          このアプリは、<span className={styles.textBold}>自分がシェアしたい本だけを集めた本棚を作成し、共有できるアプリです。</span>
        </p>
        <p>
          便利な本棚アプリは世の中にたくさんありますが、アプリで管理している全ての本を共有する仕組みでは、
          <br />
          まるで自分の頭の中を覗かれているようで、少し恥ずかしいと感じていました。
        </p>
        <p>そこで、自分のおすすめ本やシェアしたい本だけを集めた本棚を作ることで、恥ずかしさを感じずに本を共有できると考え、このアプリを作成しました。</p>
        <p>ぜひ、見せたい本だけを集めたあなただけの本棚を作り、友人や家族とシェアしてみてください。</p>
        <p className={styles.descriptionTitle}>本を検索する</p>
        <p>本棚に追加したい本を簡単に検索できます。</p>
        <Image src="/search-area.png" alt="検索エリアの画像" width={isPC ? 700 : 300} height={isPC ? 350 : 150} className={styles.descriptionImage} />
        <p className={styles.descriptionTitle}>本棚に追加する</p>
        <p>（会員登録が必要です。）</p>
        <p>「本棚に追加する」ボタンをクリックするだけで、選んだ本を本棚に追加できます。</p>
        <p>本棚に追加した本を削除するには、もう一度「本棚に追加する」ボタンをクリックするか、マイページからアクセスできる本棚編集ページで削除が可能です。</p>
        <Image src="/add-bookshelf.png" alt="本棚に追加するボタンの画像" width={isPC ? 700 : 300} height={isPC ? 350 : 150} className={styles.descriptionImage} />
        <p className={styles.descriptionTitle}>本棚を閲覧する</p>
        <p>マイページから、自分のシェアする本棚を閲覧できます。</p>
        <p>
          シェアする本棚は、<span className={styles.textBold}>会員登録がなくても閲覧できるため</span>、アプリを使ったことがない人にもURLを共有して、ぜひあなたの本棚をシェアしてください。
        </p>
        <Image src="/user-bookshelf-page.png" alt="シェアする本棚の画像" width={isPC ? 700 : 300} height={isPC ? 350 : 150} className={styles.descriptionImage} />
        <p className={styles.descriptionTitle}>お気に入りリストに追加する</p>
        <p>（会員登録が必要です。）</p>
        <p>本棚に追加する予定はないけれど、後で読みたい本や気になる本を「お気に入りリスト」に追加して管理できます。</p>
        <p>お気に入りリストから本棚に追加することも可能です。</p>
        <p>お気に入りリストから削除するには、もう一度「お気に入りに追加する」ボタンを押すか、マイページの編集ページで削除できます。</p>
        <Image src="/add-favorite.png" alt="お気に入りに追加するボタンの画像" width={isPC ? 700 : 300} height={isPC ? 350 : 150} className={styles.descriptionImage} />
      </div>
    </>
  );
}
