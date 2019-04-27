const https = require('https');
const readline = require('readline');
const { execSync } = require('child_process');

const baseUrl = "https://todoist.com/api/v8/sync";
const textStrings = {
  inputToken: `What is your TODOist API Token?
(https://github.com/Cosmitar/todoist-js/wiki/Getting-access-token):\n`,
  whichProjects: `Please enter the ID(s) of the project(s) you want to import on one line, separated by a comma (',')
(Ex. 123456789, 234567890, 345678901):\n`,
  activeProjectsListing: "Here are your active projects and their IDs:",
  welcome: `Welcome. Make sure you have downloaded the DayOne CLI
before you begin: http://dayoneapp.com/support/CLI\n`,
  noToken: `No token found`,
  exiting: "Finished! Exiting..."

};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const handleData = (projects, items) => {
  // `projects` is an array of {name, is_deleted, is_archived, id}
  // `items` is an array of {content, date_added, project_id}
  const activeProjects = projects.filter(project => project.is_deleted == 0 && project.is_archived == 0);
  console.log(textStrings.activeProjectsListing);
  for (var i = 0; i < activeProjects.length; i++) {
    console.log(`\t${activeProjects[i].id}\t${activeProjects[i].name}`);
  }

  rl.question(textStrings.whichProjects, (idString) => {
    const projectIds = idString.replace(/\s/g, '').split(',').map(idStr => parseInt(idStr));
    const itemsToImport = items.filter(item => projectIds.includes(item.project_id));

    console.log(`Importing ${itemsToImport.length} items into DayOne...`);

    for (var i = 0; i < itemsToImport.length; i++) {
      const content = itemsToImport[i].content;
      const date = itemsToImport[i].date_added;
      execSync(`dayone2 new "${content}" --isoDate "${date}" --tags "TODOistImport"`, console.log);
    }

    console.log(textStrings.exiting);
    rl.close();
  });
}

console.log(textStrings.welcome);
rl.question(textStrings.inputToken, (token) => {
  if (!token) {
    console.log(textStrings.noToken);
    process.exit();
  }
  var url = baseUrl + `?token=${token}&sync_token=\*&resource_types=\[\"projects\",\"items\"\]`;

  https.get(url, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      var cleanData = JSON.parse(data);
      if (cleanData.projects && cleanData.items) {
        handleData(cleanData.projects, cleanData.items);
      } else {
        console.error(data);
      }
    });
  }).on("error", (err) => {
    console.error("Error: " + err.message);
  });
});

