import styles from './styles.module.css'
import MessageRecieved from './messages'

const Chat = ({socket}) => {
    return (
        <div className={styles.chatContainer}>
            <div>
                <MessageRecieved  socket = {socket}/>
            </div>
        </div>
    )
}

export default Chat;