"use client"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {faAddressBook} from "@fortawesome/free-solid-svg-icons";
import MyDetailsComponent from "./ContactMeDetails";

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
                        <a href="#my_modal_10" className="">
                            <FontAwesomeIcon icon={faAddressBook} size="2xl"/>
                            <MyDetailsComponent/>
                        </a>
                    </div>
                </nav>
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - @tamasrupain</p>
                </aside>
            </footer>
        </>
    );
}