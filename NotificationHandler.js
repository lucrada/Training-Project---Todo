/* eslint-disable prettier/prettier */
import notifee, { TriggerType } from '@notifee/react-native';

const onCreateTriggerNotification = async (body, triggerDate, id) => {
    const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: triggerDate.getTime(),
    };

    const channelId = 'channelId1';
    await notifee.createChannel({
        id: channelId,
        name: 'channel1',
    });

    await notifee.createTriggerNotification(
        {
            id: id,
            title: 'You have a task to do right now',
            body: body,
            android: {
                channelId: channelId,
            },
        },
        trigger,
    );
};

export async function cancelNotification(id) {
    try {
        await notifee.cancelNotification(id);
    } catch (_) {
    }
}

export default onCreateTriggerNotification;
