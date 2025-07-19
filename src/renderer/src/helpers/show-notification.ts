import icon from '../../../../resources/icon.png'

interface NotificationOptions {
  title: string
  body: string
}

/**
 * Muestra una notificación nativa usando la API de Notifications.
 * @param options title, body de la notificación.
 */
export function showNotification(options: NotificationOptions) {
  const { title, body } = options

  if (window.Notification && Notification.permission === 'granted') {
    new window.Notification(title, { body, icon })
  } else if (window.Notification && Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new window.Notification(title, { body, icon })
      }
    })
  }
}
