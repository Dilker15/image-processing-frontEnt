import { useState } from 'react';
import '../styles/home.css';
import { CustomHooks } from '../hooks/customHooks';
import { ProcessImage } from '../helpers/Images';

export function HomePage() {
    const [quality, setQuality] = useState(100);
    const [image, setImage] = useState(null); 

    const {data,updateDatas,clearData} = CustomHooks({
        size_width:"0",
        size_height:"0",
        rotate:"0",
        quality:"100",
        filter:"1",
        format:"1",
        water:"1",
        cloud:"1",
        image:image,
    });
    
    const sendDataForm = async(event) => {
        event.preventDefault();
        const formData = new FormData();
        if (data.image) {
            formData.append('image', data.image);
        }
    
        for (const key in data) {
            if (key !== 'image') {
                formData.append(key, data[key]);
            }
        }
        const{bufferData,body} = await ProcessImage(formData);
        
    };

    const updateFormData = (event)=>{
        const element = event.target;

        if(element.name === 'quality'){
           setQuality(element.value);
        }

        updateDatas(element);
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            updateDatas({name:"image","value":file}); 
        }
    };

    return (
        <>
            <h1>Image Processing</h1>
            <div className="container-elements">
                <form action="" onSubmit={sendDataForm}>
                    <div className="container-data">
                        <div className="items-container">
                            <div className="image-container-item">
                                {image ? (
                                    <img src={URL.createObjectURL(image)} alt="Selected" className="preview-image"  onChange={updateFormData}/>
                                ) : (
                                    <span>No image selected</span>
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="actions-button button_image"
                                name='image'
                                id='image'
                            />
                        </div>

                        <div className="items-container items-container-button">
                            <div className="container-buttons">
                                <div className="row">
                                    <div className="container-actions-buttons">
                                        <label htmlFor="size">Resize</label>
                                        <div className="row-inputs">
                                            <input
                                                type="number"
                                                id="size_width"
                                                name="size_width"
                                                className="form form-control"
                                                placeholder="width"
                                                onChange={updateFormData}
                                                min={0}
                                            />
                                            <input
                                                type="number"
                                                id="size_height"
                                                name="size_height"
                                                className="form form-control"
                                                placeholder="height"
                                                onChange={updateFormData}
                                                min={0}
                                            />
                                        </div>
                                    </div>
                                    <div className="container-actions-buttons">
                                        <label htmlFor="quality">Quality</label>
                                        <div className="row-inputs">
                                            <input
                                                type="range"
                                                id="quality"
                                                name="quality"
                                                max={100}
                                                min={1}
                                                defaultValue={100}
                                                onChange={updateFormData}
                                            />
                                            <span>{quality} %</span>
                                        </div>
                                    </div>
                                    <div className="container-actions-buttons">
                                        <label htmlFor="rotate">Rotate</label>
                                        <div className="row-inputs">
                                            <input
                                                type="number"
                                                id="rotate"
                                                name="rotate"
                                                className="form form-control"
                                                placeholder="Rotate"
                                                onChange={updateFormData}
                                                min={1}
                                                max={360}
                                            />
                                            <span>Degrees</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="container-actions-buttons">
                                        <label htmlFor="filter">Filters</label>
                                        <select name="filter" id="filter" className="form-select form-select-sm" onChange={updateFormData}>
                                            <option value="1" >Grayscale</option>
                                            <option value="2">Sepia</option>
                                        </select>
                                    </div>
                                    <div className="container-actions-buttons">
                                        <label htmlFor="format">Change format to:</label>
                                        <select name="format" id="format" className="form-select form-select-sm" onChange={updateFormData}>
                                            <option value="1">.jpeg</option>
                                            <option value="2">.jpg</option>
                                            <option value="3">.png</option>
                                        </select>
                                    </div>
                                    <div className="container-actions-buttons">
                                        <label htmlFor="watermark">WaterMark</label>
                                        <select name="water" id="water" className="form-select form-select-sm" onChange={updateFormData}>
                                            <option value="1">
                                                No
                                            </option>
                                            <option value="2">Yes</option>
                                        </select>
                                    </div>
                                    <div className="container-actions-buttons">
                                        <label htmlFor="cloud">Save on:</label>
                                        <select name="cloud" id="cloud" className="form-select form-select-sm" onChange={updateFormData}>
                                            <option value="1">
                                                Cloudinary
                                            </option>
                                            <option value="2">Aws S3</option>
                                            <option value="3">Google Cloud</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="actions-button">
                                Process
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
