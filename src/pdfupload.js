import React, { useState } from "react";
import { LiaUploadSolid } from "react-icons/lia";
import invoiceLogo from './invoice-logo.png';


export default function PdfUpload(props) {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); 
    props.handleSelectedFile(event.target.files[0])
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click(); 
  };


  return (<div style={{
    flex: 1,
    background: "white",
    border: "2px dashed gray",
    padding: "20px",
    width: "200px",
    textAlign: "center",
    borderRadius: "8px",
    marginLeft: '20px',
    marginTop: '15px',
    marginBottom: '15px',
    justifyContent: 'center',
    alignContent: 'center'
  }}>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontWeight: 'bold', fontSize: 15 }}>
          Upload Your Invoice
        </div>
        <div >
          To auto-populate fieds and save time
        </div>
      </div>
      <div>
        <img src={invoiceLogo} alt="Invoice Logo" width="150" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', gap: '10px' }}>

        <button
          onClick={handleUploadClick}
          style={{
            display: 'flex',
            borderRadius: "5px",
            backgroundColor: 'transparent',
            border: "1px solid grey",
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center', width: 'auto',
            paddingLeft: '8px',
            paddingRight: '8px',
            paddingTop: '3px',
            paddingBottom: '3px'
          }}>
          Upload File
          <LiaUploadSolid size={25} />
        </button>
        <div style={{ display: 'flex', gap: '5px' }}>
          <div>
            <div onClick={handleUploadClick} style={{ fontSize: '15px', color: 'deepskyblue', cursor: 'pointer' }}>
              click to upload </div>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

          </div>
          <div style={{ fontSize: '15px' }}>
            or Drag and Drop</div>
        </div>
      </div>

      {selectedFile && <p>Selected File: {selectedFile.name}</p>}

    </div>
  </div>)

}
