import React from 'react'

const pdfSummery = () => {
    return (
        <div className="flex flex-col items-center  gap-5 h-screen">
            <fieldset className="fieldset flex border rounded-lg p-5 gap-5">
                <legend className="fieldset-legend">Pick a file</legend>
                <div>
                    <input type="file" className="file-input"/>
                    <label className="label">Max size 2MB</label>
                </div>
                <div>
                    <button className="btn btn-soft">Submit</button>
                </div>
            </fieldset>
            <div className="bg-base-100 border rounded-lg p-4">
                <p>Waiting for content.....</p>
            </div>
        </div>
    )
}
export default pdfSummery
