"use client"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

export default function MyDetailsComponent() {

    return (
        <>
            {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <div className="modal" role="dialog" id="my_modal_10">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">My contacts!</h3>
                    <p className="py-4"><FontAwesomeIcon icon={faEnvelope} /> tamasrupain02@gmail.com </p>
                    <p className="py-4"><FontAwesomeIcon icon={faWhatsapp} /> +91 9903958424</p>
                    <div className="modal-action">
                        <a href="#" className="btn">close!</a>
                    </div>
                </div>
            </div>
        </>
    );
}