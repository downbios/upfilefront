import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { DropContainer } from "./styles";

export default class Upload extends Component {
  state = {
    hasInvalidFiles: false,
  };

  render() {
    return (
      <Dropzone
        accept=".pdf, .doc, .docx, .odt"
        onDropAccepted={(acceptedFiles) => {
          const hasInvalidFiles = acceptedFiles.some(
            (file) =>
              ![
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/vnd.oasis.opendocument.text",
              ].includes(file.type)
          );

          if (hasInvalidFiles) {
            this.setState({ hasInvalidFiles: true });
            console.log("Arquivos inválidos encontrados!");
          } else {
            this.setState({ hasInvalidFiles: false });
            console.log("Todos os arquivos são válidos!");
          }
        }}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject && this.state.hasInvalidFiles}
          >
            <input {...getInputProps()} />
            Drop Here!
          </DropContainer>
        )}
      </Dropzone>
    );
  }
}
