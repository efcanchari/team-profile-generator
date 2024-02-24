
# Team Profile Generator

This Node.js command-line application takes in information about employees on a software engineering team and generates an HTML webpage that displays summaries for each person.

## Usage

There are two modes of operation for this application:

1. **Interactive Mode:** If you run the application without any parameters, it will interactively prompt you for information about the team members.

    ```bash
    node index.js
    ```

   You will be guided through a series of prompts to enter the details of each team member, such as their name, ID, email, and specific information based on their role (Manager, Engineer, or Intern).

2. **Sample Mode:** If you run the application with `-s` or `--sample` parameters, it will use a predefined set of sample team members to generate the HTML.

    ```bash
    node index.js -s
    # or
    node index.js --sample
    ```

## Project Structure

The project has the following directory structure:

- `__tests__/`: Contains unit tests for the various employee types.
- `lib/`: Contains classes for employee types (`Employee.js`, `Manager.js`, `Engineer.js`, `Intern.js`).
- `src/`: Contains the `page-template.js` file responsible for generating the HTML structure.
- `output/`: This directory will be created if it doesn't exist when you run the application. It is where the generated `team.html` file will be placed.
- `assets/`: (Assumed to contain static assets like images or additional CSS if not specified)
- `node_modules/`: Contains npm dependencies.

## Running Tests

To run the tests for this application, use the following command:

```bash
npm run test
```

## Contributing

To contribute to this project, please create a branch and submit a pull request for review.

## License

This project is licensed under the [MIT License](LICENSE).
