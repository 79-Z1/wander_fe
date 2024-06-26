export enum ENUM_SOCKET_EMIT {
  SET_USER_SOCKET_ID = 'set-user-socket-id',
  SEND_FRIEND_REQUEST = 'send-friend-request',
  CANCEL_FRIEND_REQUEST = 'cancel-friend-request',
  ACCEPT_FRIEND_REQUEST = 'accept-friend-request',
  REJECT_FRIEND_REQUEST = 'reject-friend-request',
  UN_FRIEND = 'un-friend',
  SEND_MESSAGE = 'send-message',
  JOIN_CONVERSATION = 'join-conversation',
  LEAVE_CONVERSATION = 'leave-conversation',
  PUSH_NOTIFICATION = 'push-notification',
  MARK_AS_READ = 'mark-as-read'
}

export enum ENUM_SOCKET_LISTENER {
  UPDATE_FRIEND = 'update-friend',
  UPDATE_FRIEND_REQUEST = 'update-friend-request',
  UPDATE_FRIEND_SENT = 'update-friend-sent',
  UPDATE_MESSSAGES = 'update-messages',
  UPDATE_NOTIFICATION = 'update-notification'
}
