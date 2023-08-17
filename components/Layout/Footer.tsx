interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="fixed flex gap-2 items-center bottom-5 left-5 text-xs">
      <img
        src="/img/logo/textualgameslogolight.png"
        alt="logo"
        className="w-5 shadow-md"
      />
      <h2>Textual Games</h2>
    </div>
  );
};

export default Footer;
