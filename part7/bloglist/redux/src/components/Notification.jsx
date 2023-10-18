import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  console.log('NOTI', notification);
  if (notification.message === '') {
    return null;
  }

  return (
    <div className={notification.error ? 'error' : 'notify'}>
      {notification.message}
    </div>
  );
};

export default Notification;
