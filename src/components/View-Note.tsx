"use client";

type Props = {
    note: {
        title: string;
        content: string;
    } | null;
};

export default function ViewNoteFrom({note}: Props) {

    if (!note) return null;

    return (
        <>
            {/* The button to open modal */}

                {/* Put this part before </body> tag */}
                <input type="checkbox" id="my_modal_2" className="modal-toggle"/>
                <div className="modal" role="dialog">
                    <div className="modal-box">
                        <div className="modal-action">
                            <label htmlFor="my_modal_2"
                                   className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</label>
                        </div>
                        <div className="flex flex-col items-center justify-center">

                            <fieldset className="fieldset gap-3 mb-5 w-full p-5">
                                <legend className="fieldset-legend text-xl mb-2 ml-4">{note.title}</legend>
                                <label className="label text-lg mb-6 ml-6">
                                    {note.content}
                                </label>

                            </fieldset>

                        </div>

                    </div>
                </div>
        </>
    )
}