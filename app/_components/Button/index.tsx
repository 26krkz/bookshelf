import { Button as RadixButton } from "@radix-ui/themes";

type Props = { type: "button" | "submit" | "reset" | undefined; children: React.ReactNode; className?: string; onClick?: () => void; disabled?: boolean };

export default function Button(props: Props) {
  return <RadixButton {...props} />;
}
