import "../../styles/footer.css";
import "../../styles/home.css";

import { Create } from "./Create";


export default function Home() {

  return (
    <>
      <Create />
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-content-logo">
            
          </div>
          <div className="footer-content-text">
            <p>
              <span>VAds</span> desenvolvido com ♡ por CT.
            </p>
            <div className="footer-links"></div>
          </div>
        </div>
      </footer>
    </>
  );
}