import React, { useEffect } from "react";
import "./styles/notification.css";

export default function Notification({message, onClose}) {
    useEffect(() => {
        const notifTimeout = setTimeout(() => {
            onClose();},3000);
        return () => {clearTimeout(notifTimeout)}
    })
  return (
    <div className="notif">
      <p>{message}</p>
    </div>
  );
}
