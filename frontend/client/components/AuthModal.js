export class AuthModal {
    async render(parent) {
        parent.innerHTML = `
            <div class="auth-modal">
                <h2>Auth Modal</h2>
                <button id="close-btn">Close</button>
            </div>
        `;
        document.getElementById('close-btn').addEventListener('click', () => {
            this.unmount();
        });
    }

    unmount() {
        const modal = document.querySelector('.auth-modal');
        if (modal) modal.remove();
    }
}
