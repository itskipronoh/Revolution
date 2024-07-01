const steps = [
  'Getting required dependencies',
  'Preparing packages',
  'Installing packages',
  'Getting things ready'
  // Add more steps as needed
];

function handleAnswer() {
  const answer = document.getElementById('answer').value.toLowerCase();
  const messageDiv = document.getElementById('message');
  const progressEl = document.getElementById('progress');

  if (answer === 'y' || answer === 'yes') {
      messageDiv.textContent = 'Thank you for joining the revolution.';
      runSteps(steps, () => {
          messageDiv.textContent += '\nCompleted successfully.';
      });
  } else {
      messageDiv.textContent = 'Failure, traitor, imbecile, nothing for people like you.';
  }
}

function runSteps(steps, callback) {
  let currentStep = 0;

  function runNextStep() {
      const step = steps[currentStep];
      simulateLoading(step, () => {
          currentStep++;
          if (currentStep < steps.length) {
              runNextStep();
          } else {
              callback();
          }
      });
  }

  runNextStep();
}

function simulateLoading(step, callback) {
  let progress = 0;
  const progressEl = document.getElementById('progress');
  progressEl.textContent = `${step}... [${'#'.repeat(progress / 5)}${'.'.repeat(20 - progress / 5)}] ${progress}%`;

  const interval = setInterval(() => {
      progress += 5;
      progressEl.textContent = `${step}... [${'#'.repeat(progress / 5)}${'.'.repeat(20 - progress / 5)}] ${progress}%`;

      if (progress > 100) {
          clearInterval(interval);
          setTimeout(callback, 500); // Pause for a moment before moving to the next step
      }
  }, 250);
}
