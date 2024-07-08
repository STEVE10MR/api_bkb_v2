document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signup-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await axios.post('http://127.0.0.1:3000/api/v1/auth/login', {
                email: email,
                password: password
            });

            if (response.status === 200) {
                // Redirigir a otra vista
                window.location.href = '/message.html';
            } else {
                console.error('Error en la solicitud:', response.status, response.statusText);
            }
        } catch (error) {
            if (error.response) {
                // La solicitud se completó y el servidor respondió con un estado de error
                const errorMessage = error.response.data.message || 'Error desconocido';
                mostrarMensajeError(errorMessage);
            } else {
                console.error('Error:', error.message);
                mostrarMensajeError('Error al conectar con el servidor. Por favor, inténtelo de nuevo más tarde.');
            }
        }
    });

    document.getElementById('reset-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        console.log(email);
        try {
            const response = await axios.post('http://127.0.0.1:3000/api/v1/auth/forgotpassword', {
                email: email
            });

            if (response.status === 200) {
                mostrarMensajeError('Correo enviado para restablecer la contraseña.');
            } else {
                console.error('Error en la solicitud:', response.status, response.statusText);
            }
        } catch (error) {
            if (error.response) {
                // La solicitud se completó y el servidor respondió con un estado de error
                const errorMessage = error.response.data.message || 'Error desconocido';
                mostrarMensajeError(errorMessage);
            } else {
                console.error('Error:', error.message);
                mostrarMensajeError('Error al conectar con el servidor. Por favor, inténtelo de nuevo más tarde.');
            }
        }
    });

    function mostrarMensajeError(mensaje) {
        const modal = document.getElementById('message-modal');
        const modalMessage = document.getElementById('modal-message');
        modalMessage.textContent = mensaje;
        modal.classList.remove('modal-hidden');
    }

    function closeModal() {
        const modal = document.getElementById('message-modal');
        modal.classList.add('modal-hidden');
    }
});
