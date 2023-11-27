const fs = require("fs");

let trainingsData = [];
const latestTrainingsData = [];

// Read data from a trainings.txt
function readDataFromFile() {
  try {
    const data = fs.readFileSync(__dirname + "/trainings.txt", "utf8");
    trainingsData = JSON.parse(data);
  } catch (error) {
    throw new Error("Error reading the file:", error);
  }
}

// Filter and retain the latest completions for each person
function filterLatestCompletions() {
  for (const person of trainingsData) {
    const latestCompletions = {};
    for (const completion of person.completions) {
      const trainingName = completion.name;
      if (
        !latestCompletions[trainingName] ||
        new Date(completion.timestamp) >
          new Date(latestCompletions[trainingName].timestamp)
      ) {
        latestCompletions[trainingName] = completion;
      }
    }
    latestTrainingsData.push({
      name: person.name,
      completions: Object.values(latestCompletions),
    });
  }
}

// List each completed training with a count of how many people have completed that training.
function countOfPeopleCompletedTrainings() {
  const trainingCounts = {};

  for (const person of latestTrainingsData) {
    for (const completedTraining of person.completions) {
      const trainingName = completedTraining.name;

      trainingCounts[trainingName] = trainingCounts[trainingName]
        ? trainingCounts[trainingName] + 1
        : 1;
    }
  }

  return trainingCounts;
}

//Given a list of trainings and a fiscal year (defined as 7/1/n-1 – 6/30/n), for each specified training,
//list all people that completed that training in the specified fiscal year.
function getPeopleCompletedTrainingsGivenYear(trainings, fiscalYear) {
  const startDate = new Date(`7/1/${fiscalYear - 1}`);
  const endDate = new Date(`6/30/${fiscalYear}`);

  const filteredTrainings = {};

  for (const training of trainings) {
    filteredTrainings[training] = [];
  }

  for (const person of latestTrainingsData) {
    for (const completion of person.completions) {
      const trainingName = completion.name;
      const timestamp = new Date(completion.timestamp);

      if (
        trainings.includes(trainingName) &&
        startDate <= timestamp &&
        timestamp <= endDate
      ) {
        filteredTrainings[trainingName].push(person.name);
      }
    }
  }

  return filteredTrainings;
}

//Given a date, find all people that have any completed trainings that have already expired, or will expire within one month of the specified date (A training is considered expired the day after its expiration date).
//For each person found, list each completed training that met the previous criteria, with an additional field to indicate expired vs expires soon.
function filterPeopleByExpiredTrainings(targetDate) {
  const expiredTrainings = {};

  for (const person of latestTrainingsData) {
    const expiredOrSoonToExpire = [];

    for (const completion of person.completions) {
      const trainingName = completion.name;
      const timestamp = new Date(completion.timestamp);
      const expirationDate = completion.expires
        ? new Date(completion.expires)
        : null;

      if (expirationDate) {
        const isExpired = expirationDate < targetDate;
        const isSoonToExpire =
          expirationDate >= targetDate &&
          expirationDate < new Date(targetDate.getTime() + 2592000000); // 1 month in milliseconds

        if (isExpired || isSoonToExpire) {
          expiredOrSoonToExpire.push({
            trainingName,
            status: isExpired ? "Expired" : "Expires Soon",
          });
        }
      }
    }

    if (expiredOrSoonToExpire.length) {
      expiredTrainings[person.name] = expiredOrSoonToExpire;
    }
  }

  return expiredTrainings;
}

// Generate output JSON files for different requirements
function generateOutputFiles() {
  try {
    const trainingCompletedCounts = countOfPeopleCompletedTrainings();
    fs.writeFileSync(
      "countOfPeopleCompletedTrainings.json",
      JSON.stringify(trainingCompletedCounts, null, 2)
    );

    const peopleCompletedTrainingsGivenYear =
      getPeopleCompletedTrainingsGivenYear(
        [
          "Electrical Safety for Labs",
          "X-Ray Safety",
          "Laboratory Safety Training",
        ],
        2024
      );
    fs.writeFileSync(
      "peopleCompletedTrainingsGivenYear.json",
      JSON.stringify(peopleCompletedTrainingsGivenYear, null, 2)
    );

    const peopleCompletedExpiredTrainings = filterPeopleByExpiredTrainings(
      new Date("Oct 1, 2023")
    );
    fs.writeFileSync(
      "peopleCompletedExpiredTrainings.json",
      JSON.stringify(peopleCompletedExpiredTrainings, null, 2)
    );
  } catch (error) {
    throw new Error("Error writing output files:", error);
  }
}

// Execute the code
function runApp() {
  try {
    readDataFromFile();
    filterLatestCompletions();
    generateOutputFiles();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

runApp(); // Run the application
