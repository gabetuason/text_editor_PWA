const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
// Added an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  
  // Saving the event in deferredPrompt var
  deferredPrompt = event;

  // Updates UI notifying the user they can add to home screen
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  butInstall.style.display = 'none'; // Hide the button, as it will no longer be needed
  deferredPrompt.prompt();

  // Wait for the user to respond to the prompt
  const userChoiceResult = await deferredPrompt.userChoice;

  if (userChoiceResult.outcome === 'accepted') {
    console.log('User has added the app to home screen');
  } else {
    console.log('User has declined the prompt to add the app to home screen');
  }

  // Clear the deferredPrompt variable, as it can only be used once
  deferredPrompt = null;
});

// Add an event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('The Jate App text editor was installed.', event);
});

// if the app is already installed and hide the installation button
if (window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: minimal-ui)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches) {
  butInstall.style.display = 'none';
}
