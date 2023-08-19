import Image from "next/image";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="fixed flex gap-2 items-center bottom-5 left-5 text-xs">
      <Image
        src="/img/logo/textualgameslogolight.png"
        alt="logo"
        className="shadow-md w-auto"
        width={20}
        height={20}
      />
      <h2>Textual Games</h2>
    </div>
  );
};

export default Footer;
