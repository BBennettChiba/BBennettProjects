import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import IconBtn from "./IconBtn";

export default function Footer() {
  return (
    <footer className="footer footer-center mt-auto rounded bg-base-200 text-base-content p-5">
      <div>
        <div className="grid grid-flow-col gap-4">
          <a>
            <IconBtn Icon={FaEnvelope} />
          </a>
          <a>
            <IconBtn Icon={FaLinkedin} />
          </a>
          <a>
            <IconBtn Icon={FaGithub} />
          </a>
        </div>
      </div>
    </footer>
  );
}
