const { Expo } = require('expo-server-sdk');

// Create a new Expo SDK client
let expo = new Expo();

exports.handler = async (event, context) => {
    // 通知メッセージを取得
    // const messages = await getMessages(event);
    // 通知する
    const messages = event.body;
    const tickets = await sendPushNotifications(messages);

    // 通知結果を保存する（必要に応じて）
    // await saveTickets(tickets);
}

const getMessages = async (event) => {
    // ここに通知するメッセージを取得する処理を書く
    
    return [
        // 1つ1つのメッセージは以下の形式で
        {
                to: pushToken, // Expoプッシュトークン
                sound: 'default',  // 通知時の音を鳴らすかどうかの設定
                title: title,  // 通知タイトル
                body: body  // 通知本文
            }
    ]
}

const sendPushNotifications = async (messages) => {
    // The Expo push notification service accepts batches of notifications so
    // that you don't need to send 1000 requests to send 1000 notifications. We
    // recommend you batch your notifications to reduce the number of requests
    // and to compress them (notifications with similar content will get
    // compressed).
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];

    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
        try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            console.log(ticketChunk);
            tickets.push(...ticketChunk);
            // NOTE: If a ticket contains an error code in ticket.details.error, you
            // must handle it appropriately. The error codes are listed in the Expo
            // documentation:
            // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
        } catch (error) {
            console.error(error);
        }
    }
    return tickets;
}

const saveTickets = async (tickets) => {
    // ticketsをデータベースに保存するような処理
}
