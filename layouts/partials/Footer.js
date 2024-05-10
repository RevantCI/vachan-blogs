import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";

const Footer = () => {
  const { footerText } = config.params;
  return (
    <footer className="pt-8 pb-8">
      <div className="container text-center">
        {/* copyright */}
        {markdownify(footerText, "h5", "text-text")}
      </div>
    </footer>
  );
};

export default Footer;
