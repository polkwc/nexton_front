/* eslint-disable react/display-name */
import { useEffect, useContext } from 'react';
import { LayoutContext } from '../../context/Layout';
import toast, { Toaster } from 'react-hot-toast';
import { MessageTypeEnum } from '../../helpers/Enums';
import { INotification } from '../../interfaces/INotifications';

function Notifications() {
  const { notifications, removeNotification } = useContext(LayoutContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        notifications.forEach((item: INotification) => {
          if (item.status === 'pending') {
            item.status = 'running';
            switch (item.type) {
              case MessageTypeEnum.success:
                toast.success(item.description);
                break;
              case MessageTypeEnum.error:
                toast.error(item.description);
                break;
              case MessageTypeEnum.info:
                toast(item.description, {
                  icon: (
                    <i className='bi bi-exclamation-circle-fill text-ligth text-info p-1 fs-4'></i>
                  ),
                  style: {
                    border: '3px solid #0D47A1',
                    background: '#BBDEFB',
                    // padding: '16px',
                    width: '800px',
                  },
                  iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                  },
                });
                break;
              case MessageTypeEnum.warning:
                toast(item.description, {
                  icon: (
                    <i className='bi bi-exclamation-circle-fill text-ligth text-warning p-1 fs-4'></i>
                  ),
                  style: {
                    border: '3px solid #E65100',
                    background: '#FFE0B2',
                    width: '800px',
                  },
                  iconTheme: {
                    primary: '#E65100',
                    secondary: '#FFE0B2',
                  },
                });
                break;
              case MessageTypeEnum.info:
                toast.custom(
                  <>
                    <div
                      // key={toast.arguments .id}
                      style={{
                        border: '3px solid #713200',
                        color: '#713200',
                        width: '800px',
                        padding: '.7rem',
                        background: '#BBDEFB',
                        transition: 'all 0.2s',
                      }}
                      // icon='bi bi-pencil'
                    >
                      <i
                        className='bi bi-exclamation-circle-fill text-ligth text-info p-2'
                        style={{ background: '#BBDEFB' }}
                      ></i>
                      {item.description}
                    </div>
                  </>,
                  { icon: 'bi-pencil' }
                );
                break;
              case MessageTypeEnum.warning:
                toast.custom(
                  <div
                    // key={toast.id}
                    style={{
                      width: '53rem',
                      padding: '.7rem',
                      background: 'rgba(175, 75, 62, 0.1)',
                      borderRadius: '3rem',
                      transition: 'all 0.2s',
                      // transform: `translateY(${offset}px)`,
                      // opacity: toast.visible ? 1 : 0,
                    }}
                  >
                    {item.description}
                  </div>
                );
                break;
            }

            setTimeout(function () {
              if (item.status === 'running') {
                handleRemoveItem(item);
              }
            }, 1000);
          }
        });

        // eslint-disable-next-line no-empty
      } catch (err) {}
    };

    const handleRemoveItem = async (item: INotification) => {
      item.status = 'runned'; // Status.runned;
      removeNotification(item.id);
    };

    fetchData();
  }, [notifications]);

  return (
    <>
      <Toaster
        position={'top-center'}
        toastOptions={{
          success: {
            style: {
              border: '3px solid #1B5E20',
              background: '#C8E6C9',
              width: '1800px',
            },
          },
          error: {
            style: {
              border: '3px solid #D50000',
              background: '#FFCDD2',
              width: '800px',
            },
          },
          loading: {
            style: {
              border: '3px solid #0D47A1',
              background: '#BBDEFB',
              width: '800px',
            },
          },
        }}
        containerStyle={{
          top: 20,
          left: 20,
          bottom: 100,
          right: 20,
        }}
      />
    </>
  );
}

export default Notifications;
