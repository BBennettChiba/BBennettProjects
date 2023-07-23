import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import IconBtn from "./IconBtn";

export default function Footer() {
  return (
    <footer className="footer h-16 footer-center mt-auto rounded bg-base-200 p-5 text-base-content">
      <div>
        <div className="grid grid-flow-col gap-4">
          <a href="mailto:brysoncbennett@gmail.com">
            <IconBtn Icon={FaEnvelope} />
          </a>
          <a href="https://www.linkedin.com/in/bryson-bennett/">
            <IconBtn Icon={FaLinkedin} />
          </a>
          <a href="https://github.com/BBennettChiba">
            <IconBtn Icon={FaGithub} />
          </a>
        </div>
      </div>
    </footer>
  );
}
