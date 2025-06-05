"use client"

import NotesList from "@/components/Note-List";
import TextEditor from "@/components/Text-Editor";
import PdfSummery from "../../../components/Pdf-Summery";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileLines, faNoteSticky, faSpellCheck} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function NoteMaster() {

    return (
        <>
            {/* name of each tab group should be unique */}
            <div className="p-5 ">
                <div className="tabs tabs-lift rounded-xl ">
                    <label className="tab gap-1 backdrop-blur-lg">
                        <input type="radio" name="my_tabs_4" defaultChecked/>
                        <FontAwesomeIcon icon={faNoteSticky} size="lg"/>
                        My Notes
                    </label>
                    <div className="tab-content backdrop-blur-md border-base-300 p-6">

                        <NotesList/>
                    </div>
                    <label className="tab gap-1 backdrop-blur-lg">
                        <input type="radio" name="my_tabs_4"/>
                        <FontAwesomeIcon icon={faSpellCheck} size="lg"/>
                        Format Text
                    </label>
                    <div className="tab-content backdrop-blur-lg  border-base-300 p-6">
                        <TextEditor/>
                    </div>
                    <label className="tab gap-1 backdrop-blur-lg">
                        <input type="radio" name="my_tabs_4"/>
                        <FontAwesomeIcon icon={faFileLines} size="lg"/>
                        PDF Summery
                    </label>
                    <div className="tab-content backdrop-blur-lg border-base-300 p-6">
                        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                            <div className="card bg-base-100 w-96">
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title">Notice!!</h2>
                                    <p>The feature is currently unavailable</p>
                                </div>
                            </div>
                        </div>
                        <PdfSummery/>
                    </div>
                </div>
            </div>
        </>
    );
}