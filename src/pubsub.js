const pubsub = {
  events: {},
  subscribe: function (evName, fn) {
    console.log(`PUBSUB: someone just subscribed to know about ${evName}`);
    this.events[evName] = this.events[evName] || [];
    this.events[evName].push(fn); 
  },
  unsubscribe: function(evName, fn) {
    console.log(`PUBSUB: someone just unsubscribe to know about ${evName}`);
    if (this.events[evName]) {
      this.events[evName] = this.events[evName].filter((f) => {f !== fn});
    }
  },
  publish: function(evName, data) {
    console.log(`PUBSUB: making a broadcast about ${evName} whith ${data}`);
    if (this.events[evName]) {
      this.events[evName].forEach((f) => {
        f(data);
      });
    }
  }

}

export default { pubsub };
