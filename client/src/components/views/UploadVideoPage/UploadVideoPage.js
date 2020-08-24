import React,{useState,useEffect} from "react";
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from "react-redux";
import { projectStorage, projectFirestore, timestamp } from './firebase';
import ProgressBar from "./ProgressBar";

const { Title } = Typography;
const { TextArea } = Input;

const UploadVideoPage = (props) => {

    const user = useSelector(state => state.user);
    const [title,setTitle] =useState("");
    const [description,setDescription] = useState("");
    const [FilePath, setFilePath] = useState("");
     const [Duration, setDuration] = useState("")
    const [Thumbnail, setThumbnail] = useState("");
    const [progress, setProgress] = useState(0);
    const [thumbnailProgress, setThumbnailProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    const [thumbnailUrl,setThumbnailUrl]=useState(null);

    const handleChangeTitle = (event) => {
        setTitle(event.currentTarget.value)
    }

    const handleChangeDecsription = (event) => {
        console.log(event.currentTarget.value)

        setDescription(event.currentTarget.value)
    }


    console.log(url);

    const onDrop = (files) => {
        console.log(files[0]);
        const storageRef = projectStorage.ref(files[0].name);
        // const collectionRef = projectFirestore.collection('images');
        
        storageRef.put(files[0]).on('state_changed', (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        }, (err) => {
          setError(err);
        }, async () => {
          const url = await storageRef.getDownloadURL();
          setUrl(url);
        });






        // let formData = new FormData();
        // const config = {
        //     header: { 'content-type': 'multipart/form-data' }
        // }
        // console.log(files)
        // formData.append("file", files[0])

        // axios.post('/api/video/uploadfiles', formData, config)
        //     .then(response => {
        //         if (response.data.success) {

        //             let variable = {
        //                 filePath: response.data.filePath,
        //                 fileName: response.data.fileName
        //             }
        //             setFilePath(response.data.filePath);
        //             alert("Video uploaded successfully");


        //         } else {
        //             alert('failed to save the video in server')
        //         }
        //     })

    }

    const handleChangeThumbnail = (e) => {

        const storageRef = projectStorage.ref(e.target.files[0].name);
        // const collectionRef = projectFirestore.collection('images');
        
        storageRef.put(e.target.files[0]).on('state_changed', (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setThumbnailProgress(percentage);
        }, (err) => {
          setError(err);
        }, async () => {
          const url = await storageRef.getDownloadURL();
          setThumbnailUrl(url);
        });


    }

    const onSubmit = (e) => {

        e.preventDefault();
        console.log("submitting....");

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in First')
        }



        if (title === "" || description === "" || url === "" || thumbnailUrl === "") {
            return alert('Please first fill all the fields')
        }

        const variables = {
            writer: user.userData._id,
            title: title,
            description: description,
            filePath: url,
            thumbnail: thumbnailUrl
        }

        axios.post('/api/video/uploadVideo', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload video')
                }
            })

    }

    return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2} > Upload Video</Title>
    </div>

    <form onSubmit={(e) => onSubmit(e)}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}>
                {({ getRootProps, getInputProps }) => (
                    <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />

                    </div>
                )}
            </Dropzone>
            
            <h3>{Math.floor(progress)}%</h3>
            {/* {Thumbnail !== "" &&
                <div>
                    <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
                </div>
            } */}
        </div>
        <ProgressBar progress={progress} />
        <br /><br />
        <label>Upload thumbnail</label>  
        <ProgressBar progress={thumbnailProgress} />
        <br></br>
        <input style={{"margin-left":"10px;"}} type="file" name="thumbnail" onChange={(e) => handleChangeThumbnail(e)} />
        <br></br>
        <label>Title</label>   
        <Input
            onChange={handleChangeTitle}
            value={title}
        />
        <br /><br />
        <label>Description</label>
        <TextArea
            onChange={handleChangeDecsription}
            value={description}
        />
        <br /><br />

        {/* <select onChange={handleChangeOne}>
            {Private.map((item, index) => (
                <option key={index} value={item.value}>{item.label}</option>
            ))}
        </select> */}
        <br /><br />

        {/* <select onChange={handleChangeTwo}>
            {Catogory.map((item, index) => (
                <option key={index} value={item.label}>{item.label}</option>
            ))}
        </select>
        <br /><br /> */}

        <button type="primary" size="large" >
            Submit
    </button>

    </form>
</div>
)
}

export default UploadVideoPage;