const inquirer = require("inquirer");
const fs = require('fs');
const axios = require("axios");
const generate = require('./utils/generateMarkdown');

const questions = [{
        type: "input",
        name: "title",
        message: "What is your project title?"
    },
    {
        type: "input",
        name: "badge",
        message: "Please provide the badges links "
    },
    {
        type: "input",
        name: "description",
        message: "Please provide your project's description"
    },
    {
        type: "input",
        name: "installation",
        message: "Please provide the installation instructions"
    },
    {
        type: "input",
        name: "usage",
        message: "Please provide the project usage"
    },
    {
        type: "input",
        name: "license",
        message: "Please provide the project license"
    },
    {
        type: "input",
        name: "contributing",
        message: "Please provide the contributing parties"
    },
    {
        type: "input",
        name: "test",
        message: "Please provide the project tests"
    },
    {
        type: "input",
        name: "username",
        message: "What is your github user name?"
    },
    {
        type: "input",
        name: "repo",
        message: "What is your repo link?"
    },
];

inquirer
    .prompt(questions)
    .then(function(data) {
        const queryUrl = `https://api.github.com/users/${data.username}`;

        axios.get(queryUrl).then(function(res) {

            const githubInfo = {

                email: res.data.email,
                profile: res.data.html_url,
                name: res.data.name
            };

            fs.writeFile("README.md", generate(data, githubInfo), function(err) {
                if (err) {
                    throw err;
                };

                console.log("New README file created with success!");
            });
        });

    });