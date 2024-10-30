import { Link as LinkRadix } from "@radix-ui/themes";
import LinkNext from "next/link";

interface Props {
  href: string;
  children: string;
}

const Link = ({ href, children }: Props) => {
  return (
    <LinkNext href={href} passHref legacyBehavior>
      <LinkRadix>{children}</LinkRadix>
    </LinkNext>
  );
};

export default Link;
