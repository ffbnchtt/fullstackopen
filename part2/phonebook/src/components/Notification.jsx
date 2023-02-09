const Notification = ({ message }) => message.show ? <div className={"message " + message.type}>{message.content}</div> : ""
export default Notification;