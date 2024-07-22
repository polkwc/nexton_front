import { useNotification } from '../hooks/useNotifications';
import { setInfoMessage, setWarningMessage } from '../../helpers/Messages';

export default function About() {
    const { setNotificationMessage } = useNotification();
    
    const showLegend = (ev: any) => {
        const notification = setInfoMessage('This kind of message are using context as storage manager in order to present messages from each component');
        setNotificationMessage(notification);
    }

  return (
    <div className='m-auto flex flex-col gap-7'>
        <span className="text-lg font-bold text-gray-500">
          This page was developed as a challenge for NEXTON
        </span>
        
        <button onClick={(event) => showLegend(event)}
          className="focus:shadow-outline rounded bg-gray-600 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >Click to see</button>
    </div>
  )
}
