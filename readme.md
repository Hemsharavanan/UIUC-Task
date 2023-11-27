# Training Data Application

This application reads data from a file containing training completion records, performs various analyses, and generates output in different formats.

## Table of Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Dual Output Formats](#dual-output-formats)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Output Files](#output-files)

## Overview

This application is designed to:

- Read data from a provided trainings.txt file containing training completion records.
- Perform operations on the data to generate three specific types of output in `.json` format.
- The application is written in JavaScript.

## Dual Output Formats

- This JavaScript application reads training completion records from `trainings.txt` and provides output in two formats: Array of Objects and Object with Key-Value Pairs.
- When the appArray.js is executed, the output will be created as `Array of Objects`. Below is the sample output when appArray.js(this is just a sample fromat, to view enitre output run the appArray.js file)

- When the appObject.js is executed, the output will be created as `Object with Key-Value Pairs`. Below is the sample output when appObject.js(this is just a sample fromat, to view enitre output run the appArray.js file)

Two files, `appArray.js` and `appObject.js`, generate the same output in different formats:

- **`appArray.js`**: Produces an `Array of Objects`.
- **`appObject.js`**: Generates an `Object with Key-Value Pairs`.

#### Array of Objects

- **Pros**:
  - Structured & Organized.
  - Data Separation & Scalability.
- **Cons**:
  - More Verbose.
  - Indirect Access.
- **Best For**:
  - Complex data processing.
  - Handling datasets with multiple occurrences of the same key.
- **Purpose**:
  - Provides flexibility and scalability.
  - Allows additional attributes associated with each training.

#### Object with Key-Value Pairs

- **Pros**:
  - Compact & Efficient Access.
  - Flexible Structure.
- **Cons**:
  - Less Organized.
  - Complex Nested Data Retrieval.
- **Best For**:
  - Direct access by name.
  - Simple applications with limited requirements.
- **Purpose**:
  - Efficient direct access to data based on named keys.
  - Assumes unique training names without additional attributes.

### Summary

- **`appArray.js`**: Preferred for complex data processing and handling multiple occurrences of keys.
- **`appObject.js`**: Suitable for direct access by name and simple applications with less complex requirements.

Choose the appropriate file based on the specific context and requirements of your use case.

## Requirements

To run this application, ensure you have the following:

- node.js installed.

## Installation

1. Clone this repository to your local machine.
2. Ensure you have Node JS installed.
3. Make sure the `trainings.txt` file in the root directory of the project (it must be in root by default).

## Usage

Navigate to the root directory of the project.

- Run the application using the following command: `node appArray`
- Run the application using the following command: `node appObject`

## Output Files

The application generates three output files:

1. `countOfPeopleCompletedTrainings.json`: Lists each completed training with a count of how many people completed that training.
2. `peopleCompletedTrainingsGivenYear.json`: Lists people who completed specified trainings in a given fiscal year.
3. `peopleCompletedExpiredTrainings.json`: Lists people with completed trainings that have expired or will
