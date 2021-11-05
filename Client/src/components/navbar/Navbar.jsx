import React, {useState, useEffect} from 'react'
import "./navbar.css"
import Notification from '../../images/notification.png'
import Message from '../../images/message.png'
import Setting from '../../images/settings.png'


const Navbar = ({socket}) => {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        socket.on("getNotification", (data)=>{
            setNotifications((prev) => [...prev, data]);
        });
    }, [socket])

    console.log(notifications)

    const displayNotifications = ({senderName, type})=>{
        let action;

        if(type===1){
            action="liked"
        } else if(type===2){
            action="commented"
        }else{
            action = "shared"
        }
        return (
            <span className="notification">{`${senderName} ${action} your post`}</span>
        )
    }
      
     const handleRead = () => {
         setNotifications([]);
         setOpen(false);
     }

    return (
        <div className="navbar">
            <span className="logo">Emon App</span>
            <div className="icons">
               <div className="icon" onClick={()=> setOpen(!open)}>
                   <img src={Notification} className="iconImg" alt=""/>
                   {
                  notifications.length >0 &&
                       <div className="counter">{notifications.length}</div>
                    }
               </div>
               <div className="icon" onClick={()=> setOpen(!open)}>
                   <img src={Message} className="iconImg" alt=""/>
                   
               </div>
               <div className="icon" onClick={()=> setOpen(!open)}>
                   <img src={Setting} className="iconImg" alt=""/>
                   
               </div>
               </div>
              {open && (
                  <div className="notifications">
                   {notifications.map((n) => displayNotifications(n))}
                   <button className="nButton" onClick={handleRead}>Mark as read</button>
            </div>
         )}
        </div>
    )
}

export default Navbar
