const Chance = require("chance");
const kafka = require("./kafka/index.js")
const topics = require("./kafka/topics.js")

const chance = new Chance();
const producer = kafka.producer();

const produce = async () => {
    const value = JSON.stringify(chance.currency())
    const [topic] = await kafka.admin().listTopics();
    await producer.send({
        topic,
        messages: [{ value }]
    })
}

const exec = async (interval = 100) => {
    await kafka.admin().createTopics({
        topics
    });
    await producer.connect();
    setInterval(produce, interval)
}

exec().catch(console.log)