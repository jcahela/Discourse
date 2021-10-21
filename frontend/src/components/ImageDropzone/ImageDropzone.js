import { useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import './ImageDropzone.css'

function ImageDropzone({ setImage }) {
    const imageRef = useRef();
    const [imageSelected, setImageSelected] = useState(false)
    const onDrop = useCallback(acceptedFiles => {
        setImage(acceptedFiles[0])

        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                setImageSelected(true)
                imageRef.current.src = reader.result
            }
        })
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})
    return ( 
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={`new-server-image-container image-selected-${imageSelected === true}`}>
                { imageSelected ? (
                    <img className="new-server-image" ref={imageRef} src="" alt="" />
                ):(
                    <>
                        <span class="material-icons new-server-photo-icon">photo_camera</span>
                        {isDragActive ? (
                            <p className="new-server-image-text">Drop here</p>
                        ):(
                            <p className="new-server-image-text">Select or Drop</p>
                        )}
                        <div className="new-image-plus-icon">
                            +
                        </div>
                    </>

                )}
            </div>
        </div>
    );
}

export default ImageDropzone;
