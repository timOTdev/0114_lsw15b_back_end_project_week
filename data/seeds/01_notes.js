
exports.seed = function (knex, Promise) {
  return knex('notes')
    .truncate()
    .then(function () {
      return knex('notes').insert([
        { title: "1. Get a rucksack", text: "Find a nice rucksack that can hold all your backpacking gear.", tags: '["rucksack", "gear"]' },
        { title: "2. Grab a buddy", text: "Find an outdoorsy friend that loves to rough it up.", tags: '["buddy", "outdoorsy"]' },
        { title: "3. Trailblazing", text: "Get out there and breathe in nature. Throw on those hiking boots!", tags: '["trailblaze", "nature"]' },
        { title: "4. Go to the store", text: "Read reviews online and find the rucksack that best fits your needs.", tags: '["store", "reviews"]' },
        { title: "5. Find a buddy", text: "Go with hiking groups and find a new backpacking buddy.", tags: '["buddy", "group"]' },
        { title: "6. Backpacking", text: "Plan out your trip and head to the woods to set off on a wild adventure.", tags: '["backpacking", "adventure"]' }
      ]);
    });
};
