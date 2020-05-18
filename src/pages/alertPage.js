import React from "react";
import usePushNotifications from "../usePushNotifications";

export default function PushNotificationDemo() {
  const {
    userConsent,
    pushNotificationSupported,
    userSubscription,
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    onClickSendNotification,
    error,
    loading
  } = usePushNotifications();

  return (
    <div>
      {error && (
        <section className="app-error">
          <h2>{error.name}</h2>
          <p>Error message : {error.message}</p>
          <p>Error code : {error.code}</p>
        </section>
      )}
      {loading && "Loading, please stand by"}
      <p>Push notification are {!pushNotificationSupported && "NOT"} supported by your device.</p>
      <p>
        User consent to recevie push notificaitons is <strong>{userConsent}</strong>.
      </p>
      <button onClick={onClickAskUserPermission}>Ask user permission</button>
      <button onClick={onClickSusbribeToPushNotification}>Create Notification subscription</button>
      <button onClick={onClickSendSubscriptionToPushServer}>Send subscription to push server</button>
      <button onClick={onClickSendNotification}>Send a notification</button>
    </div>
  );
}