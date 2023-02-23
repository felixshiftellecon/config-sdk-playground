const CircleCI = require("@circleci/circleci-config-sdk");
const fs = require('fs');

const basicConfig= new CircleCI.Config();

// Define base executor
const dockerBase = new CircleCI.executors.DockerExecutor(
  "cimg/base:2023.02",
  "small"
);

// Define hello job
const helloJob = new CircleCI.Job("hello", dockerBase);
helloJob.addStep(new CircleCI.commands.Run({command: "echo hello John"}));

// Define workflow
const helloWorkflow = new CircleCI.Workflow("hello-workflow");
helloWorkflow.addJob(helloJob);

// Add workflow to config
basicConfig.addWorkflow(helloWorkflow)

// Export a config
export default function writeBasicConfig(configPath) {
  fs.writeFile(configPath, basicConfig.generate(), (err) => {
    if (err) {
      console.error(err);
      return
    }
  });
}