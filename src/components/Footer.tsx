"use client"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {faAddressBook} from "@fortawesome/free-solid-svg-icons";
import {faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

export default function FooterComponent() {

    return (
        <>
        <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-6">
            <nav>
                <div className="grid grid-flow-col gap-6">
                    <a href="https://github.com/TamasruPain" target="_blank">
                        <FontAwesomeIcon icon={faGithub} size='2xl'/>
                    </a>
                    <a href="https://www.linkedin.com/in/tamasrupain/" target="_blank">
                        <FontAwesomeIcon icon={faLinkedin} size="2xl"/>
                    </a>

                    {/* The button to open modal */}
                    <label htmlFor="my_modal_10">
                        <FontAwesomeIcon icon={faAddressBook} size="2xl"/>
                    </label>
                    {/* Put this part before </body> tag */}
                    <input type="checkbox" id="my_modal_10" className="modal-toggle"/>
                    <div className="modal" role="dialog">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">My contacts!</h3>
                            <p className="py-4"><FontAwesomeIcon icon={faEnvelope}/> tamasrupain02@gmail.com
                            </p>
                            <p className="py-4"><FontAwesomeIcon icon={faWhatsapp}/> +91 9903958424</p>
                            <div className="modal-action">
                                <label htmlFor="my_modal_10" className="btn">Close!</label>
                            </div>
                        </div>
                    </div>
            </div>
        </nav>
        <aside>
            <p>Copyright © {new Date().getFullYear()} - @Tamasru Pain</p>
        </aside>
        </footer>
</>
)
    ;
}