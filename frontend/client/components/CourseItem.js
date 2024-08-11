export class CourseItem {
    constructor(course) {
        this.course = course;
    }

    async render(parent) {
        const courseItem = document.createElement('div');
        courseItem.classList.add('course-item');
        courseItem.innerHTML = `
            <h3>${this.course.title}</h3>
            <p>${this.course.description}</p>
        `;
        parent.appendChild(courseItem);
    }
}
