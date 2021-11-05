import React,{useState} from 'react'
import "./card.css"
import Heart from '../../images/heart.png'
import Heartfilled from '../../images/heartfilled.png'
import Comment from '../../images/comment.png'
import Share from '../../images/share.png'
import Info from '../../images/info.png'

const Card = ({post, socket, user}) => {
    const [liked, setLiked] = useState(false);

    const handleNotification = (type) =>{
        type === 1 && setLiked(true);
        socket.emit("sendNotification",{
            senderName: user,
            receiverName:post.username,
            type,
        });
    }

    return (
        <div className="card">
            <div className="info">
                <img src={post.userImg} alt="" className="userImg"/>
                <span>{post.fullname}</span>
            </div>
            <img src={post.postImg} alt="" className="postImg"/>
            <div className="interaction">
                {liked ? (<img src={Heartfilled} alt="" className="cardIcon"/>) : (
                    <img src={Heart} alt="" className="cardIcon" 
                    onClick={()=>handleNotification(1)}/>
                )}
                <img src={Comment} alt="" className="cardIcon" onClick={()=>handleNotification(2)}/>
                <img src={Share} alt="" className="cardIcon" onClick={()=>handleNotification(3)}/>
                <img src={Info} alt="" className="cardIcon infoIcon" onClick={()=>handleNotification(4)}/>
            </div>
        </div>
    )
}

export default Card
