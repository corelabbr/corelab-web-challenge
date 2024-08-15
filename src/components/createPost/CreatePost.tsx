import { ChangeEvent, useRef, useState } from "react";
import star from "../../assents/Vector.png";
import starYellow from "../../assents/Group 2464.png";
import pencil from "../../assents/ferramenta-lapis.png";
import exit from "../../assents/Vector (1).png"
import paint from "../../assents/balde-de-tinta.png";
import right from "../../assents/marca-de-verificacao.png"
import "./CreatePost.scss"
import Color from "../color/Color";
import listColor from "../../assents/color.json"
import React from "react";
import pdf from "../../assents/pdfn.png"
import { usePosts } from "../../hooks/usePosts";
import cloudinary from "../../lib/cloudinary";

interface create {
    authentication:()=>void;
    loadingFunction:(value:boolean)=>void;
}

export default function CreatePost ({authentication, loadingFunction}:create){

    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [color, setColor] = useState("#ffffff")
    const [favorite, setFavorite] = useState<boolean>(false)
    const [seeColor, setSeeColor] = useState(false)
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [truePost, setTruePost] = useState(false)
    const {authenticationP} = usePosts()
    const fileInputRef = useRef<HTMLInputElement>(null);

    const HandleChanges = {
        handleText: (e: ChangeEvent<HTMLTextAreaElement>) => {
          setText(e.target.value);
        },
        handleTitle:(e:ChangeEvent<HTMLInputElement>)=>{
            setTitle(e.target.value)
        },
      };

      const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = () => {
                    setFilePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
                setFileName(null);
            } else if (file.type === 'application/pdf') {
                setFileName(file.name);
                const reader = new FileReader();
                reader.onload = () => {
                    setFilePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                setFileName(file.name);
                setFilePreview(null);
            }
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = () => {
                    setFilePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
                setFileName(null);
            } else if (file.type === 'application/pdf') {
                setFileName(file.name);
                const reader = new FileReader();
                reader.onload = () => {
                    setFilePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                setFileName(file.name);
                setFilePreview(null);
            }
        }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };


    const authenticationPost = () =>{
        loadingFunction(true)
        if(title === ""){
          
            const media:string[] = []
           if(filePreview){
                if(fileName){
                    const cloud = cloudinary(filePreview)
                    cloud.then(element=>{
                        media.push(element.secure_url)
                        media.push(fileName)
                        media.push(element.public_id)

                        const post = {
                            title: "Título",
                            text: text,
                            favorite: favorite,
                            color: color,
                            media: media
                       }
                        const res = authenticationP(post)
                        res.then(value=>{
                            if(value === "Post created successfully."){ 
                                loadingFunction(false)
                                authentication()
                                setText("")
                                setTitle("")
                                setFavorite(false)
                                setFilePreview(null)
                                setFileName(null)
                            }
                        })
                    })
                }else{
                    const cloud = cloudinary(filePreview)
                    cloud.then(element=>{
                        media.push(element.secure_url)
                        media.push(element.public_id)

                        const post = {
                            title: "Título",
                            text: text,
                            favorite: favorite,
                            color: color,
                            media: media
                       }
                        const res = authenticationP(post)
                        res.then(value=>{
                            if(value === "Post created successfully."){
                                authentication()
                                setText("")
                                setTitle("")
                                setFavorite(false)
                                setFilePreview(null)
                                setFileName(null)
                                loadingFunction(false)
                            }
                            
                        })
                    })
                    
                }
           }else{
            const post = {
                title: "Título",
                text: text,
                favorite: favorite,
                color: color,
                media: media
           }
            const res = authenticationP(post)
            res.then(value=>{
                if(value === "Post created successfully."){
                    authentication()
                    setText("")
                    setTitle("")
                    setFavorite(false)
                    setFilePreview(null)
                    setFileName(null)
                    loadingFunction(false)
                }
            })
           }

           

        }else{
          
            const media:string[] = []
            if(filePreview){
                if(fileName){
                  
                    const cloud = cloudinary(filePreview)
                    cloud.then(element=>{
                        media.push(element.secure_url)
                        media.push(fileName)
                        media.push(element.public_id)
                        const post = {
                            title: title,
                            text: text,
                            favorite: favorite,
                            color: color,
                            media: media
                       }
                        const res = authenticationP(post)
                        res.then(value=>{
                            if(value === "Post created successfully."){
                                authentication()
                                setText("")
                                setTitle("")
                                setFavorite(false)
                                setFilePreview(null)
                                setFileName(null)
                                loadingFunction(false)
                            }
                        })
                    })
                }else{
                    
                    const cloud = cloudinary(filePreview)
                    cloud.then(element=>{
                        media.push(element.secure_url)
                        media.push(element.public_id)

                        const post = {
                            title: title,
                            text: text,
                            favorite: favorite,
                            color: color,
                            media: media
                       }
                        const res = authenticationP(post)
                        res.then(value=>{
                            if(value === "Post created successfully."){
                                authentication()
                                setText("")
                                setTitle("")
                                setFavorite(false)
                                setFilePreview(null)
                                setFileName(null)
                                loadingFunction(false)
                            }
                        })
                    })
                }
           }else{
            const post = {
                title: title,
                text: text,
                favorite: favorite,
                color: color,
                media: media
           }
            const res = authenticationP(post)
            res.then(value=>{
                if(value === "Post created successfully."){
                    authentication()
                    setText("")
                    setTitle("")
                    setFavorite(false)
                    setFilePreview(null)
                    setFileName(null)
                    loadingFunction(false)
                }
            })
           }

          
          
           
        }
    }

    
    return (
        truePost ? (
            <main className="allCreatePost" style={{ backgroundColor: color }}>
                <div className="TitleCreatePost">
                    <input type="text" placeholder="Título" onChange={HandleChanges.handleTitle} value={title}/>
                    {favorite ? (
                        <img 
                            src={starYellow} 
                            alt="estrela amarela" 
                            onClick={() => setFavorite(false)} 
                        />
                    ) : (
                        <img 
                            src={star} 
                            alt="estrela" 
                            onClick={() => setFavorite(true)} 
                        />
                    )}
                </div>
                <hr 
                    style={{ 
                        border: color === "#ffffff" 
                            ? "1px solid rgba(217, 217, 217, 1)" 
                            : "1px solid #ffffff" 
                    }} 
                />
                <textarea 
                    onChange={HandleChanges.handleText} 
                    placeholder="Clique ou arraste o arquivo para esta área para fazer upload" 
                    value={text}
                />
                <div
                    className="upload"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileSelect}
                    />
                    {filePreview && fileName == null? (
                        <div >
                            <img src={filePreview} className="imgFile" alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                            <img 
                                src={exit} 
                                alt="x" 
                                className="exitImg" 
                                onClick={() => setFilePreview(null)} 
                            />
                        </div>
                    ) : fileName && filePreview ? (
                        <div>
                            <img src={pdf} alt="pdf" className="pdf" />
                            <p>{fileName}</p>
                            <img 
                                src={exit} 
                                alt="x" 
                                className="exitImg" 
                                onClick={() => {
                                    setFilePreview(null);
                                    setFileName(null);
                                }} 
                            />
                        </div>
                    ) : null}
                </div>
                <div className="optionCreatePost">
                    <div className="editOptionCreatePost">
                        <div 
                            className={seeColor 
                                ? "colorEditOptionCreatePostSelected" 
                                : "colorEditOptionCreatePost"} 
                            onClick={() => setSeeColor(!seeColor)}
                        >
                            <img src={paint} alt="tinta" />
                        </div>
                    </div>
                    <div className="confirmOptionCreatePost">
                        <img 
                            src={right} 
                            alt="certo" 
                            className="rightConfirmOptionCreatePost" 
                            onClick={authenticationPost} 
                        />
                        <img 
                            src={exit} 
                            alt="x" 
                            className="exitConfirmOptionCreatePost" 
                            onClick={()=>{
                                setTruePost(false)
                                setText("")
                                setTitle("")
                                setFavorite(false)
                                setFilePreview(null)
                                setFileName(null)
                            }}
                        />
                    </div>
                </div>
                {seeColor && (
                    <div className="divColorBall">
                        <div className="divColorBallCarrosel">
                            {listColor.map((value) => (
                                <Color 
                                    key={value.color} 
                                    cor={value.color} 
                                    nameColor={value.nameColor} 
                                    authentication={() => setColor(value.color)} 
                                    showColor={value.color === color} 
                                />
                            ))}
                        </div>
                    </div>
                )}
            </main>
        ) : (
            <main className="allCreatePostFalse" style={{backgroundColor:"white"}} onClick={()=>{
                setTruePost(true)
            }}>
               <div className="TitleCreatePost">
                    <input type="text" placeholder="Título" onChange={HandleChanges.handleTitle} />
                    <img 
                            src={star} 
                            alt="estrela" 
                            onClick={() => setFavorite(false)} 
                        />
                </div>
                <hr 
                    style={{border:"1px solid rgba(217, 217, 217, 1)"}} 
                />
                <textarea 
                    onChange={HandleChanges.handleText} 
                    placeholder="Criar nota..." 
                />
            </main>
        )
    );
    
}