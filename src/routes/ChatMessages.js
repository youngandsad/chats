import { useForm} from "react-hook-form"
import PropTypes from 'prop-types'
import styles from '../style.module.css'


function ChatMessages({onSubmit}) {

    const {register, handleSubmit} = useForm();
    
    const onFormSubmit = data => {
        onSubmit(data);
    };
    
        return (
            <form onSubmit = {handleSubmit(onFormSubmit)}>
            <div>
            <div className={styles.chatField}>
                <textarea
                    {...register('text')}>
                </textarea>
                <button>Отправить</button>
            </div>
            </div>
            </form>
        )
    }
    
    ChatMessages.propTypes = {
        onSubmit: PropTypes.func.isRequired
    }
    
    export default ChatMessages