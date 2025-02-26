const NotificationList = () => {
    return (
      <div>
        <h3>Your Notifications</h3>
        <ul className="list-group">
          {notifications.map((notification) => (
            <li key={notification.id} className="list-group-item">
              {notification.message} - {new Date(notification.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    );
  };
