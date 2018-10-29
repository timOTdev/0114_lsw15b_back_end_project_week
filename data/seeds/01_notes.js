
exports.seed = function (knex, Promise) {
  return knex('notes')
    .truncate()
    .then(function () {
      return knex('notes').insert([
        { title: "1. Get a rucksack", text: "Find a nice rucksack that can hold all your backpacking gear." },
        { title: "2. Grab a buddy", text: "Find an outdoorsy friend that loves to rough it up." },
        { title: "3. Trailblazing", text: "Get out there and breathe in nature. Throw on those hiking boots!" },
        { title: "4. Go to the store", text: "Read reviews online and find the rucksack that best fits your needs." },
        { title: "5. Find a buddy", text: "Go with hiking groups and find a new backpacking buddy." },
        { title: "6. Backpacking", text: "Plan out your trip and head to the woods to set off on a wild adventure." }
      ]);
    });
};
