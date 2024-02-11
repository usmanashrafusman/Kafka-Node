const kafka = require("./kafka/index.js")

const consumer = kafka.consumer({ groupId: "currency-group" });

const exec = async () => {
    const [topic] = await kafka.admin().listTopics()
    await consumer.connect();
    await consumer.subscribe({ topic });
    await consumer.run({
        eachMessage: ({ message, partition }) => {
            console.log({ partition, offset: message.offset, value: message.value.toString() })
        }
    })
}

exec().catch(console.log)
