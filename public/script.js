const form = document.getElementById('password-form');
const providerInput = document.getElementById('provider');
const passwordInput = document.getElementById('password');
const passwordsList = document.getElementById('passwords-list');
const lockButton = document.getElementById('lock');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    const provider = providerInput.value;
    const password = passwordInput.value;

    savePassword(provider, password);
    providerInput.value = '';
    passwordInput.value = '';
});

lockButton.addEventListener('click', () => {
    passwordsList.classList.toggle('locked');
});

async function savePassword(provider, password) {
    const response = await fetch('/passwords', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ provider, password })
    });

    if (response.ok) {
        fetchPasswords();
    }
}

async function fetchPasswords() {
    const response = await fetch('/passwords');
    const passwords = await response.json();

    passwordsList.innerHTML = '';
    passwords.forEach(password => {
        const passwordDiv = document.createElement('div');
        passwordDiv.textContent = `${password.id} : ${password.provider}`;
        passwordsList.appendChild(passwordDiv);
    });
}

fetchPasswords();
