const API_BASE_URL = 'http://localhost:5000/api';

async function fetchData(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const token = localStorage.getItem('token');
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (data) {
        options.body = JSON.stringify(data);
    }
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`Fetching URL: ${url}`);  // Log URL để kiểm tra

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

        if (!response.ok) {
            const contentType = response.headers.get('content-type');
            const responseText = await response.text();
            console.error('Response text:', responseText);
        
            if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            } else {
                throw new Error(`Unexpected response format! status: ${response.status} - ${responseText}`);
            }
        }
        

        const responseText = await response.text();
        return responseText ? JSON.parse(responseText) : {};
    } catch (error) {
        console.error(`Lỗi khi gọi API ${endpoint}:`, error);
        throw error;
    }
}


export const api = {
    // User authentication
    login: (data) => fetchData('/auth/login', 'POST', data),
    register: (data) => fetchData('/auth/register', 'POST', data),

    // User-related API methods
    getUsers: () => fetchData('/users'),
    getUser: (userId) => fetchData(`/users/${userId}`),
    createUser: (data) => fetchData('/users', 'POST', data),
    updateUser: (userId, data) => fetchData(`/users/${userId}`, 'PUT', data),
    deleteUser: (userId) => fetchData(`/users/${userId}`, 'DELETE'),
    updateUserPermissions: (userId, data) => fetchData(`/users/${userId}/permissions`, 'PUT', data),

    // Course-related API methods
    getCourses: () => fetchData('/courses'),
    getCourse: (courseId) => fetchData(`/courses/${courseId}`),
    createCourse: (data) => fetchData('/courses', 'POST', data),
    updateCourse: (courseId, data) => fetchData(`/courses/${courseId}`, 'PUT', data),
    deleteCourse: (courseId) => fetchData(`/courses/${courseId}`, 'DELETE'),
    searchCourses: (query) => fetchData(`/courses/search?${new URLSearchParams(query)}`),

    // Section-related API methods
    getSections: (courseId) => fetchData(`/sections?courseId=${courseId}`),
    getSection: (sectionId) => fetchData(`/sections/${sectionId}`),
    createSection: (data) => fetchData('/sections', 'POST', data),
    updateSection: (sectionId, data) => fetchData(`/sections/${sectionId}`, 'PUT', data),
    deleteSection: (sectionId) => fetchData(`/sections/${sectionId}`, 'DELETE'),

    // Lesson-related API methods
    getLessons: (sectionId) => fetchData(`/lessons?sectionId=${sectionId}`),
    getLesson: (lessonId) => fetchData(`/lessons/${lessonId}`),
    createLesson: (data) => fetchData('/lessons', 'POST', data),
    updateLesson: (lessonId, data) => fetchData(`/lessons/${lessonId}`, 'PUT', data),
    deleteLesson: (lessonId) => fetchData(`/lessons/${lessonId}`, 'DELETE'),

    // quyền khoá học 
    hasPermission: async (userId, courseId) => {
        return await fetchData(`/courses/${courseId}/permission?userId=${userId}`, 'GET');
    },

    getCourseContent: (courseId) => fetchData(`/courses/${courseId}/content`, 'GET'),

};
