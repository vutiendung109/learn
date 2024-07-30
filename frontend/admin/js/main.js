async function includeHTML() {
    const elements = ['header', 'sidebar', 'footer'];
    for (const element of elements) {
        const file = `/admin/templates/${element}.html`;
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const content = await response.text();
            document.getElementById(element).innerHTML = content;
        } catch (error) {
            console.error(`Lỗi khi tải ${element}:`, error);
        }
    }
}

document.addEventListener('DOMContentLoaded', includeHTML);