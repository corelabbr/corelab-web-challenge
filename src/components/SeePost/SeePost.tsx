import { ChangeEvent, useEffect, useRef, useState } from "react";
import star from "../../assents/Vector.png";
import starYellow from "../../assents/Group 2464.png";
import pencil from "../../assents/ferramenta-lapis.png";
import exit from "../../assents/Vector (1).png"
import paint from "../../assents/balde-de-tinta.png";
import right from "../../assents/marca-de-verificacao.png"
import "./SeePost.scss"
import Color from "../color/Color";
import listColor from "../../assents/color.json"
import React from "react";
import pdf from "../../assents/pdfn.png"
import cloudinary from "../../lib/cloudinary";
import { usePutPosts } from "../../hooks/usePutPosts";
import { useDeletePosts } from "../../hooks/useDeletePosts";


export type postSee = {
    title: string;
    text?: string;
    media: string[];
    color: string;
    favorite: boolean;
    id: number;
    authentication: ()=>void;
    loadingFunction:(value:boolean)=>void;
    trueDeletePost: boolean;
    authenticationDelete: ()=>void;

  }

export default function SeePost ({color, favorite, id, media, title, text, authentication, loadingFunction, authenticationDelete, trueDeletePost}:postSee){

    const [titleN, setTitleN] = useState(title)
    const [textN, setTextN] = useState(text)
    const [colorN, setColorN] = useState(color)
    const [favoriteN, setFavoriteN] = useState<boolean>(favorite)
    const [idPost, setIdPost] = useState(id)
    const [idPostCloud, setIdPostCloud] = useState<string|null>("")
    const [seeColor, setSeeColor] = useState(false)
    const [seeEditPost, setSeeEditPost] = useState(false)
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const {authenticationPU} = usePutPosts()
    const {authenticationDE} = useDeletePosts()
    const [updateMedia, setUpdateMedia] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        if(media.length === 3){
            setIdPostCloud(media[2])
            setFileName(media[1])
            setFilePreview(media[0])
        }else if(media.length === 2){
            setIdPostCloud(media[1])
            setFilePreview(media[0])
        }
        setTextN(text)
        setTitleN(title)
    },[media])

    useEffect(()=>{
        
        if(trueDeletePost){
            const res = authenticationDE(id)
            res.then(value=>{
                if(value === "Post deleted successfully."){
                    authentication()
                }
            })
        }
    },[trueDeletePost])

    const HandleChanges = {
        handleText: (e: ChangeEvent<HTMLTextAreaElement>) => {
          setTextN(e.target.value);
        },
        handleTitle:(e:ChangeEvent<HTMLInputElement>)=>{
            setTitleN(e.target.value)
        },
      };

      const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        setSeeEditPost(true)
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
        setSeeEditPost(true)
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
          
            const mediaL:string[] = []
           if(filePreview && filePreview !== media[0]){
                if(fileName){
                    const cloud = cloudinary(filePreview)
                    cloud.then(element=>{
                        mediaL.push(element.secure_url)
                        mediaL.push(fileName)
                        mediaL.push(element.public_id)

                        const post = {
                            title: "Título",
                            text: textN,
                            favorite: favoriteN,
                            color: colorN,
                            media: mediaL,
                            id: idPost
                       }
                        const res = authenticationPU(post)
                        res.then(value=>{
                            if(value === "Post updated successfully."){
                                loadingFunction(false)
                                authentication()
                                setSeeEditPost(false)
                            }
                        })
                    })
                }else{
                    const cloud = cloudinary(filePreview)
                    cloud.then(element=>{
                        mediaL.push(element.secure_url)
                        mediaL.push(element.public_id)

                        const post = {
                            title: "Título",
                            text: textN,
                            favorite: favoriteN,
                            color: colorN,
                            media: mediaL,
                            id: idPost
                       }
                        const res = authenticationPU(post)
                        res.then(value=>{
                            if(value === "Post updated successfully."){
                                loadingFunction(false)
                                authentication()
                                setSeeEditPost(false)
                            }
                           
                        })
                    })
                    
                }
           }else{
            const post = {
                title: "Título",
                text: textN,
                favorite: favoriteN,
                color: colorN,
                media: media,
                id: idPost
           }
            const res = authenticationPU(post)
            res.then(value=>{
                if(value === "Post updated successfully."){
                    loadingFunction(false)
                    authentication()
                    setSeeEditPost(false)
                }
            })
           }

           

        }else{
           
            const mediaL:string[] = []
            if(filePreview && filePreview !== media[0]){
                if(fileName){
                  
                    const cloud = cloudinary(filePreview)
                    cloud.then(element=>{
                        mediaL.push(element.secure_url)
                        mediaL.push(fileName)
                        mediaL.push(element.public_id)
                        const post = {
                            title: titleN,
                            text: textN,
                            favorite: favoriteN,
                            color: colorN,
                            media: mediaL,
                            id: idPost
                       }
                        const res = authenticationPU(post)
                        res.then(value=>{
                            if(value === "Post updated successfully."){
                                loadingFunction(false)
                                authentication()
                                setSeeEditPost(false)
                            }
                        })
                    })
                }else{
                    
                    const cloud = cloudinary(filePreview)
                    cloud.then(element=>{
                        mediaL.push(element.secure_url)
                        mediaL.push(element.public_id)

                        const post = {
                            title: titleN,
                            text: textN,
                            favorite: favoriteN,
                            color: colorN,
                            media: mediaL,
                            id: idPost
                       }
                        const res = authenticationPU(post)
                        res.then(value=>{
                            if(value === "Post updated successfully."){
                                loadingFunction(false)
                                authentication()
                                setSeeEditPost(false)
                            }
                        })
                    })
                }
           }else{
            const post = {
                title: titleN,
                text: textN,
                favorite: favoriteN,
                color: colorN,
                media: media,
                id: idPost
           }
            const res = authenticationPU(post)
            res.then(value=>{
                if(value === "Post updated successfully."){
                    loadingFunction(false)
                    authentication()
                    setSeeEditPost(false)
                }
            })
           }

          
          
           
        }
    }

    

    const favoriteFunction = () =>{
        setFavoriteN(!favorite)
        const postN = {
            id: idPost,
            favorite: !favoriteN,
       }
      
        const res = authenticationPU(postN)
        res.then(value=>{
            authentication()
        })
    }

    useEffect(()=>{
        if(seeEditPost === false){
            setColorN(color)
            setFavoriteN(favorite)
            setTextN(text)
            setTitleN(title)
            if(media.length === 3){
                setIdPostCloud(null)
                setFileName(null)
                setFilePreview(null)
                setIdPostCloud(media[2])
                setFileName(media[1])
                setFilePreview(media[0])
            }else if(media.length === 2){
                setIdPostCloud(null)
                setFilePreview(null)
                setFileName(null)
                setIdPostCloud(media[1])
                setFilePreview(media[0])
            }else{
                setIdPostCloud(null)
                setFilePreview(null)
                setFileName(null)
            }
        }
    },[seeEditPost])

    
    return (
        <main className="allCreatePostN" style={{backgroundColor:colorN}}>
            
        <div className="TitleCreatePost">
            <input type="text" placeholder="Título" value={titleN} onChange={HandleChanges.handleTitle}  onClick={()=>{
                setSeeEditPost(true)
            }}/>
            {favoriteN ? (
                <img 
                    src={starYellow} 
                    alt="estrela amarela" 
                    onClick={() => {
                        favoriteFunction()
                    }

                    } 
                />
            ) : (
                <img 
                    src={star} 
                    alt="estrela" 
                    onClick={() => {
                        favoriteFunction()
                    }} 
                />
            )}
        </div>
        <hr 
            style={{ 
                border: colorN === "#ffffff" 
                    ? "1px solid rgba(217, 217, 217, 1)" 
                    : "1px solid #ffffff" 
            }} 
        />
        <textarea 
            onChange={HandleChanges.handleText} 
            placeholder="Clique ou arraste o arquivo para esta área para fazer upload" 
            value={textN}
            onClick={()=>{
                setSeeEditPost(true)
            }}
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
                <div>
                    <img src={filePreview}  className="imgFile" alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    {seeEditPost?(
                        <img 
                        src={exit} 
                        alt="x" 
                        className="exitImg" 
                        onClick={() => {
                            setFilePreview(null);
                            setFileName(null);
                        }} 
                    />
                    ):null}
                </div>
            ) : fileName && filePreview ? (
                <div className="divPdf">
                    <img src={pdf} alt="pdf" className="pdf" />
                    <p >{fileName}</p>
                    {seeEditPost?(
                        <img 
                        src={exit} 
                        alt="x" 
                        className="exitImg" 
                        onClick={() => {
                            setFilePreview(null);
                            setFileName(null);
                        }} 
                    />
                    ):null}
                </div>
            ) : null}
        </div>
        <div className="optionCreatePost">
            <div className="editOptionCreatePost">
                <div 
                    className={seeEditPost 
                        ? "textEditOptionCreatePostSelected" 
                        : "textEditOptionCreatePost"} 
                   onClick={()=>{setSeeEditPost(!seeEditPost)}}
                >
                    <img src={pencil} alt="lápis" />
                </div>
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
                {seeEditPost?(
                    <img 
                    src={right} 
                    alt="certo" 
                    className="rightConfirmOptionCreatePost" 
                    onClick={authenticationPost} 
                />
                ):null}
                <img 
                    src={exit} 
                    alt="x" 
                    className="exitConfirmOptionCreatePost" 
                    onClick={()=>{
                        authenticationDelete()
                    }}
                />
            </div>
        </div>
        {seeColor && (
            <div className="divColorBall">
                {listColor.map((value) => (
                    <Color 
                        key={value.color} 
                        cor={value.color} 
                        nameColor={value.nameColor} 
                        authentication={() => {
                            setColorN(value.color)
                            setSeeEditPost(true)
                            setSeeColor(false)
                        }} 
                        showColor={value.color === colorN} 
                    />
                ))}
            </div>
        )}
    </main>
    );
    
}